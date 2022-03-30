const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const { GraphQLSchema, GraphQLObjectType, GraphQLString, UserType } = require('graphql')


const schema = new GraphQLSchema({

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

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(5000, (err) => {
  if (err) throw error;
  console.log(`> Ready on ${'http://localhost:5000/'}`)
})