const FormData = require("form-data");
const http2 = require("http2");
const { feedback, products } = require("./data.json");
const path = require("path");
const fs = require("fs");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_METHOD,
  NGHTTP2_SESSION_CLIENT,
  HTTP2_HEADER_CONTENT_TYPE,
  HTTP2_HEADER_CONTENT_LENGTH,
  HTTP2_HEADER_AUTHORIZATION,
} = http2.constants;
const AUTHORITY = new URL("https://localhost:3000");
const PATHNAME_PRODUCT = "/api/product";
const PATHNAME_CUSTOMER = "/api/customer"
const BOOT_DIR = path.join(process.cwd(), "boot");
const DINOSAURES_DIR = path.join(BOOT_DIR, "Dinosaures");

function getFormData(p) {
  const formData = new FormData();
  formData.append("name", p.name);
  if (p.alias) {
    formData.append("alias", p.alias);
  }
  formData.append("description", p.description);
  formData.append("rate", p.rate.toString());
  formData.append("price", p.price.toString());
  formData.append("type", p.type);
  if (p.image !== undefined) {
    const pathname = path.join(DINOSAURES_DIR, p.image);
    formData.append("image", fs.createReadStream(pathname), {
      contentType: "image/jpeg",
    });
  } else {
    const name = p.name.replace(/\s/g, "_");
    const pathname = path.join(DINOSAURES_DIR, name, name + ".png");
    formData.append("image", fs.createReadStream(pathname), {
      contentType: "image/png",
    });
  }
  return formData;
}

function getFormLenght(formData) {
  return new Promise((resolve, reject) => {
    formData.getLength((err, len) => {
      if (err !== null) {
        return reject(err);
      }
      resolve(len);
    });
  });
}

async function request(client, formData, options) {
  return new Promise((resolve, reject) => {
    const req = client.request(options);
    let result = "";
    formData.pipe(req)
      .on("data", (chunk) => result += chunk.toString())
      .on("end", () => {
        console.log(result);
        resolve(JSON.parse(result));
      })
      .on("error", reject);
  });
}

async function sendProduct(client, product) {
  const formData = getFormData(product);
  return request(client, formData, {
    [HTTP2_HEADER_METHOD]: "POST",
    [HTTP2_HEADER_PATH]: PATHNAME_PRODUCT,
    [HTTP2_HEADER_CONTENT_TYPE]: "multipart/form-data;boundary=" + formData.getBoundary(),
    [HTTP2_HEADER_CONTENT_LENGTH]: await getFormLenght(formData),
  });
}

async function createUser(client) {
  const signupForm = new FormData();
  signupForm.append("lastName", "Dujardin");
  signupForm.append("name", "Jean");
  signupForm.append("phoneNumber", "0123456789");
  signupForm.append("email", "jean@dujardin.com");
  signupForm.append("login", "jean");
  signupForm.append("password", "password");
  await request(client, signupForm, {
    [HTTP2_HEADER_METHOD]: "POST",
    [HTTP2_HEADER_PATH]: `${PATHNAME_CUSTOMER}/create`,
    [HTTP2_HEADER_CONTENT_TYPE]: "multipart/form-data;boundary=" + signupForm.getBoundary(),
    [HTTP2_HEADER_CONTENT_LENGTH]: await getFormLenght(signupForm),
  });
  const loginForm = new FormData();
  loginForm.append("login", "jean");
  loginForm.append("password", "password");
  const res = await request(client, loginForm, {
    [HTTP2_HEADER_METHOD]: "POST",
    [HTTP2_HEADER_PATH]: PATHNAME_CUSTOMER,
    [HTTP2_HEADER_CONTENT_TYPE]: "multipart/form-data;boundary=" + loginForm.getBoundary(),
    [HTTP2_HEADER_CONTENT_LENGTH]: await getFormLenght(loginForm),
  });
  return res.token;
}

async function main() {
  const client = http2.connect(AUTHORITY);
  if (client.type !== NGHTTP2_SESSION_CLIENT) {
    console.error("aie!");
  }
  console.log("Add products");
  const productsAdded = [];
  for (const product of products) {
    productsAdded.push((await sendProduct(client, product)));
  }
  console.log("SignUp / Login Jean");
  const token = await createUser(client);
  for (let i = 0; i < feedback.length; i++) {
    const product = productsAdded[i];
    const review = feedback[i];
    const formData = new FormData();
    formData.append("rate", review.rate.toString());
    formData.append("text", review.text);
    formData.append("title", review.title);
    console.log(`Add reviews to ${product.name}`);
    await request(client, formData, {
      [HTTP2_HEADER_METHOD]: "POST",
      [HTTP2_HEADER_PATH]: `${PATHNAME_PRODUCT}/${product.id}/feedback`,
      [HTTP2_HEADER_CONTENT_TYPE]: "multipart/form-data;boundary=" + formData.getBoundary(),
      [HTTP2_HEADER_CONTENT_LENGTH]: await getFormLenght(formData),
      [HTTP2_HEADER_AUTHORIZATION]: token,
    });
  }
  return new Promise(resolve => client.close(resolve));
}

main().then(() => console.log("Finished!")).catch(err => {
  console.error("Error");
  console.error(err);
});
