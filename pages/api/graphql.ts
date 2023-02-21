import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getAnimalById, getAnimals } from '../../database/animals';

type Args = {
  id: string;
};

const typeDefs = gql`
  type Animal {
    id: ID!
    firstName: String
    type: String
    accessory: String
  }

  type Query {
    animals: [Animal]
    animal(id: ID!): Animal
  }
`;

const resolvers = {
  Query: {
    animals: async () => {
      return await getAnimals();
    },

    animal: (parent: string, args: Args) => {
      return getAnimalById(parseInt(args.id));
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
