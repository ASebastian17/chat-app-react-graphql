import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const resolverArray = loadFilesSync(path.join(__dirname, "./**/*.resolvers.*"));
const typesArray = loadFilesSync(path.join(__dirname, "./typedefs/**/*.graphql"));

const resolvers = mergeResolvers(resolverArray);
const typeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
