# How to Use in a microservice

Add the library to your package json.

create the .env files you need:
- .env.test
- .env.development
- .env.production

the .env. file must be stored in the root folder.
for the test you need to add a .env.test inside the /tests folder as well.

in the root/tests/.env.test folder the directory will be deleted! So you should use a different folder then for the root/.env.test

This .env files are never added to the repostiory. Be aware that they might be deleted on switching branches.
