let books = [{
    id: '1',
    title: 'J K    3',
    author: 'Ender W. P.OO',
    price: "4"
}];

const bookResolvers = {
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

module.exports = bookResolvers;