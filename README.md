# Setup

Run `npm install` to install all dependencies.

Run `npx ts-node server.ts` to start the server.

From `library-ui/` also run `npm install` to install client program, which will send REST requests to the server. We will use this client to test our server. You can run `npm start` from `library-ui/` to start the client after installing the dependencies.

## Install MongoDB Locally

Follow the instructions in the official [MongoDB documentation](https://www.mongodb.com/docs/manual/administration/install-community/) to install the free community edition. Select the installation for your operating system. When you install MongoDB, the Mongo Shell (mongosh) should also have been installed. If it wasn’t then follow the instructions [here](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-mdb-shell-install). The Mongo Shell provides a command line interface that is used to interact with the databases in MongoDB. If mongosh is successfully installed then the command `mongosh` should connect to the local instance MongoDB on your machine and open an interpreter where we can type commands to interact with MongoDB. Try the command `show dbs` and you should see a list of existing databases in your local instance. Note that by default, the MongoDB service will run on 127.0.0.1 (localhost), port 27017. It is recommended that you do not change these settings convenience.

## Verifying Mongoose Schema and Test Data

First we need to define the schemas for the MongoDB collections **models/**. We will discuss the schema structure in class. Once the schemas have been defined, we can populate the collections with test data with the following command:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

At any point, we can delete all data in the database and start afresh by using the following command:

`$ npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`.

## Retrieve Details of a book

Extend the server with a route `/book_dtls` to retrieve the details
of a specific book. Assume that the ID of an existing book in the database will be passed as a query parameter (`req.query.id`). The route
must respond with 200 status and an object with properties -- book title,
book author's name, and the book instances for the book. Every book instance must have the properties imprint and status. 

Verify the behavior by clicking on the book details button for a book in
`library_ui`.

You can access the relevant queries documentation from [here](https://mongoosejs.com/docs/queries.html) and [here](https://mongoosejs.com/docs/populate.html)

# References

1. https://mongoosejs.com/docs/index.html
2. https://mongoosejs.com/docs/guides.html
3. https://www.mongodb.com/basics