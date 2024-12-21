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
  getApproxSentence?: Maybe<SentenceIndicators>;
};


export type QueryGetApproxSentenceArgs = {
  difficulty: Scalars['Float']['input'];
  level: Scalars['Int']['input'];
};

export type Sentence = {
  __typename?: 'Sentence';
  id: Scalars['Int']['output'];
  ruby: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type SentenceIndicators = {
  __typename?: 'SentenceIndicators';
  difficulty: Scalars['Float']['output'];
  level: Scalars['Int']['output'];
  ruby: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type GetApproxSentenceQueryVariables = Exact<{
  level: Scalars['Int']['input'];
  difficulty: Scalars['Float']['input'];
}>;


export type GetApproxSentenceQuery = { __typename?: 'Query', getApproxSentence?: { __typename?: 'SentenceIndicators', text: string, ruby: string } | null };


export const GetApproxSentenceDocument = gql`
    query getApproxSentence($level: Int!, $difficulty: Float!) {
  getApproxSentence(level: $level, difficulty: $difficulty) {
    text
    ruby
  }
}
    `;

/**
 * __useGetApproxSentenceQuery__
 *
 * To run a query within a React component, call `useGetApproxSentenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApproxSentenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApproxSentenceQuery({
 *   variables: {
 *      level: // value for 'level'
 *      difficulty: // value for 'difficulty'
 *   },
 * });
 */
export function useGetApproxSentenceQuery(baseOptions: Apollo.QueryHookOptions<GetApproxSentenceQuery, GetApproxSentenceQueryVariables> & ({ variables: GetApproxSentenceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApproxSentenceQuery, GetApproxSentenceQueryVariables>(GetApproxSentenceDocument, options);
      }
export function useGetApproxSentenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApproxSentenceQuery, GetApproxSentenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApproxSentenceQuery, GetApproxSentenceQueryVariables>(GetApproxSentenceDocument, options);
        }
export function useGetApproxSentenceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetApproxSentenceQuery, GetApproxSentenceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApproxSentenceQuery, GetApproxSentenceQueryVariables>(GetApproxSentenceDocument, options);
        }
export type GetApproxSentenceQueryHookResult = ReturnType<typeof useGetApproxSentenceQuery>;
export type GetApproxSentenceLazyQueryHookResult = ReturnType<typeof useGetApproxSentenceLazyQuery>;
export type GetApproxSentenceSuspenseQueryHookResult = ReturnType<typeof useGetApproxSentenceSuspenseQuery>;
export type GetApproxSentenceQueryResult = Apollo.QueryResult<GetApproxSentenceQuery, GetApproxSentenceQueryVariables>;