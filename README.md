# Dino marché
Computer science master's degree n-tiers project.
This is a fake e-commerce website where we can buy dinosaurs, eggs and foods for carnivores and herbivores.

The back-end is made with nodejs, MySQL and use TypeScript.
The front is made with angular.

## Generate a SSL certificate
```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
Source: [letsencrypt.org](https://letsencrypt.org/docs/certificates-for-localhost#making-and-trusting-your-own-certificates)

## TODO

- [x] Login / signup routes
- [ ] Create / List / find (by name, species?) products routes
