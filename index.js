require("dotenv").config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');

require("./config/mongoose");

const typeDefs = require('./graphql/combinedTypes');
const resolvers = require('./graphql/combinedResolvers');

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // introspection: false,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
    await server.start();
    
    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );

    await new Promise((resolve) => httpServer.listen({ port: process.env.HOST_PORT }, resolve));
    console.log(`🚀 Server ready at http://${process.env.HOST_NAME}:${process.env.HOST_PORT}/graphql`);
}

startServer().catch((err) => {
    console.error('Error starting server:', err);
});