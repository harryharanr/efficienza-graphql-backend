const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    if(req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use('/graphql',
 graphqlHTTP({
     schema: graphQLSchema,
     rootValue: graphQLResolvers,
     graphiql: true
 }));

mongoose
    .connect("mongodb://127.0.0.1:27017/efficienza", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(3000, () => console.log("Database Connection successful!!"))
    })
    .catch(err => {
        console.log(err);
    });