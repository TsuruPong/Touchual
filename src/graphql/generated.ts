import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  sentence?: Maybe<Sentence>;
};

export type Sentence = {
  __typename?: 'Sentence';
  ruby?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type GetSentenceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSentenceQuery = { __typename?: 'Query', sentence?: { __typename?: 'Sentence', text?: string | null, ruby?: string | null } | null };


export const GetSentenceDocument = gql`
    query GetSentence {
  sentence {
    text
    ruby
  }
}
    `;

/**
 * __useGetSentenceQuery__
 *
 * To run a query within a React component, call `useGetSentenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSentenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSentenceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSentenceQuery(baseOptions?: Apollo.QueryHookOptions<GetSentenceQuery, GetSentenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSentenceQuery, GetSentenceQueryVariables>(GetSentenceDocument, options);
      }
export function useGetSentenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSentenceQuery, GetSentenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSentenceQuery, GetSentenceQueryVariables>(GetSentenceDocument, options);
        }
export function useGetSentenceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSentenceQuery, GetSentenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSentenceQuery, GetSentenceQueryVariables>(GetSentenceDocument, options);
        }
export type GetSentenceQueryHookResult = ReturnType<typeof useGetSentenceQuery>;
export type GetSentenceLazyQueryHookResult = ReturnType<typeof useGetSentenceLazyQuery>;
export type GetSentenceSuspenseQueryHookResult = ReturnType<typeof useGetSentenceSuspenseQuery>;
export type GetSentenceQueryResult = Apollo.QueryResult<GetSentenceQuery, GetSentenceQueryVariables>;