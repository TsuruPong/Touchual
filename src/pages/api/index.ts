import { resolvers } from '@/libs/graphql/resolver';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import path from 'path';

const schemaPath = path.join(process.cwd(), "src/libs/graphql/schema.gql");
const typeDefs = readFileSync(schemaPath, 'utf8');
const server = new ApolloServer({
    typeDefs,
    resolvers
});

export default startServerAndCreateNextHandler(server);