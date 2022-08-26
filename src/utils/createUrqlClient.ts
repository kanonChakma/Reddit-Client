import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient =(ssrExchange: any) =>({
    url: 'http://localhost:4000/graphql',
    fetchOptions:{
      credentials:"include" as const  //it will send cookie
    },
    exchanges: [dedupExchange, cacheExchange({
        updates: {
          Mutation: {
            logout:(result, _args, cache,_info) =>{
                betterUpdateQuery<LogoutMutation, MeQuery>(
                  cache,
                  {query: MeDocument},
                  result,
                  () => ({ me: null as any})
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
      }), fetchExchange, ssrExchange],
})