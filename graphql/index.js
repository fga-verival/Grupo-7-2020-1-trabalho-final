var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
 
var schema = buildSchema(`
  type Query {
    test1: Int,
  }
`);
 
var root = {
  test1: () =>{
      return 1;
  },
};
 
var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3001);