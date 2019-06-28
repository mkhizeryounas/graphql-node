const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require("graphql");

// dummy data
let books = [
  { name: "Game of thrones", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "Harry Potter", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "Mockeing Bird", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Book of love", genre: "Fantasy", id: "4", authorId: "2" },
  { name: "MJ Hocking", genre: "Fantasy", id: "5", authorId: "3" },
  { name: "Another Book", genre: "Sci-Fi", id: "6", authorId: "3" }
];

let authors = [
  { name: "John Cena", age: 44, id: "1" },
  { name: "Doe Pack", age: 42, id: "2" },
  { name: "Mark Bros", age: 66, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args, context) => {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args, context) => {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args, context) => {
        // code to get data from db / other sources
        return _.find(books, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args, context) => {
        // code to get data from db / other sources
        return books;
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args, context) => {
        // code to get data from db / other sources
        return _.find(authors, { id: args.id });
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args, context) => {
        // code to get data from db / other sources
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
