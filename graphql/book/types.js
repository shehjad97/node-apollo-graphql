const bookType = `
  type Book {
    id: ID
    title: String
    author: String
    price: String
  }

  type Query {
    books: [Book]
    hello: String
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

module.exports = bookType;