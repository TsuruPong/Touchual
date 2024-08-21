import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: "src/libs/graphql/schema.gql",
  generates: {
    "src/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;