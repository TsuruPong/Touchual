"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: "/api",
    cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
