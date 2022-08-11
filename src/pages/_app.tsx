import { ChakraProvider } from '@chakra-ui/react';
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { AppProps } from 'next/app';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
import theme from '../theme';

function betterUpdateQuery<Result, Query>(
 cache: Cache,
 qi: QueryInput,
 result: any,
 fn: (r: Result, q:Query) => Query
){
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}
const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions:{
    credentials:"include"  //it will send cookie
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout:(result, _args, cache,_info) =>{
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {query: MeDocument},
              result,
              (_result, _query) => ({ me: null})
            )
        },
        login: (_result, _args, cache, _info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              if(result.login.error){
                return query as any;
              }else{
                return {
                  me: result.login.user
                }
              }
            }
          )
        },
        register: (_result, _args, cache, _info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              if(result.register.error){
                return query as any;
              }else{
                return {
                  me: result.register.user
                }
              }
            }
          )
        },
      },
    }
  }), fetchExchange],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
       <ChakraProvider theme={theme}>
        <Component {...pageProps} />
     </ChakraProvider>
    </Provider>
  )
}

export default MyApp
