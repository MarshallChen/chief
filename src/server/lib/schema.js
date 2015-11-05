import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      yo: {
        type: GraphQLString,
        resolve() {
          return 'man';
        }
      }
    }
  })
});

export default schema;