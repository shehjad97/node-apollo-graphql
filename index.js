// npm install @apollo/server express graphql cors body-parser
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
// const { typeDefs, resolvers } = require('./schema');

// Define your GraphQL schema
const typeDefs = `
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
    hello: String
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

// Store book data in memory for simplicity
let books = [];

// Provide resolver functions for the defined schema
const resolvers = {
    Query: {
        books: () => books,
        hello: () => "Hello, World!",
    },
    Mutation: {
        addBook: (_, { title, author }) => {
            const newBook = { id: books.length + 1, title, author };
            books.push(newBook);
            return newBook;
        },
    },
};

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
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

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startServer().catch((err) => {
    console.error('Error starting server:', err);
});