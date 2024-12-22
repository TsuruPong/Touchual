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
  getTypingTheme?: Maybe<TypingTheme>;
};


export type QueryGetTypingThemeArgs = {
  difficulty: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  level: Scalars['Int']['input'];
};

export type TypingTheme = {
  __typename?: 'TypingTheme';
  id: Scalars['Int']['output'];
  moras: Scalars['String']['output'];
  ruby: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type GetTypingThemeQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  level: Scalars['Int']['input'];
  difficulty: Scalars['Float']['input'];
}>;


export type GetTypingThemeQuery = { __typename?: 'Query', getTypingTheme?: { __typename?: 'TypingTheme', id: number, text: string, ruby: string, moras: string } | null };


export const GetTypingThemeDocument = gql`
    query getTypingTheme($id: Int, $level: Int!, $difficulty: Float!) {
  getTypingTheme(id: $id, level: $level, difficulty: $difficulty) {
    id
    text
    ruby
    moras
  }
}
    `;

/**
 * __useGetTypingThemeQuery__
 *
 * To run a query within a React component, call `useGetTypingThemeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypingThemeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypingThemeQuery({
 *   variables: {
 *      id: // value for 'id'
 *      level: // value for 'level'
 *      difficulty: // value for 'difficulty'
 *   },
 * });
 */
export function useGetTypingThemeQuery(baseOptions: Apollo.QueryHookOptions<GetTypingThemeQuery, GetTypingThemeQueryVariables> & ({ variables: GetTypingThemeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTypingThemeQuery, GetTypingThemeQueryVariables>(GetTypingThemeDocument, options);
      }
export function useGetTypingThemeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTypingThemeQuery, GetTypingThemeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTypingThemeQuery, GetTypingThemeQueryVariables>(GetTypingThemeDocument, options);
        }
export function useGetTypingThemeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTypingThemeQuery, GetTypingThemeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTypingThemeQuery, GetTypingThemeQueryVariables>(GetTypingThemeDocument, options);
        }
export type GetTypingThemeQueryHookResult = ReturnType<typeof useGetTypingThemeQuery>;
export type GetTypingThemeLazyQueryHookResult = ReturnType<typeof useGetTypingThemeLazyQuery>;
export type GetTypingThemeSuspenseQueryHookResult = ReturnType<typeof useGetTypingThemeSuspenseQuery>;
export type GetTypingThemeQueryResult = Apollo.QueryResult<GetTypingThemeQuery, GetTypingThemeQueryVariables>;