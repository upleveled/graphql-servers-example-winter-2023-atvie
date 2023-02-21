import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

type Args = {
  id: string;
};

const typeDefs = `#graphql
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

// Hardcoded data source
const animals = [
  {
    id: 1,
    firstName: 'Ralph',
    type: 'Tiger',
    accessory: 'Gold',
  },
  {
    id: 2,
    firstName: 'Evelina',
    type: 'Dog',
    accessory: 'Chain',
  },
  {
    id: 3,
    firstName: 'Otto',
    type: 'Otter',
    accessory: 'Stone',
  },
];

const resolvers = {
  Query: {
    animals: () => {
      return animals;
    },

    animal: (parent: string, args: Args) => {
      return animals.find((animal) => animal.id === parseInt(args.id));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 8000,
    },
  });
  console.log(`Server is running at: ${url} `);
}

startApolloServer().catch((error) => {
  console.log(error);
});
