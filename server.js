const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql')

/* authors and books represent database for this application */
const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' }
]

const books = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

/* first test */
/* const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Hello_World",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "Hello World"
      }
    })
  })
})
 */
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent a author of a book',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represent a book written by an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.id)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: 'list of books',
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'list of all authors',
      resolve: () => authors  
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(5000, (err) => {
  if (err) throw error;
  console.log(`> Ready on ${'http://localhost:5000/'}`)
})