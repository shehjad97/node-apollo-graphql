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

let books = [];

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

module.exports = { typeDefs, resolvers };
