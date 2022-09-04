import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

export const NavBar: React.FC<{}> = ({}) => {
     const [isServer, setIsServer] = useState(true);
     useEffect(() => setIsServer(false), []);
     
     const[{fetching:logoutFetching},logout] = useLogoutMutation()
      const [{data, fetching}] = useMeQuery({
        pause: isServer
      })
      let body=null; 
      if(fetching){
         body=null;
       } 
      else if(!data?.me){
       body=(
           <>
              <Flex>
                <Box mr={3}>
                    <Link href="/login">
                        Login
                    </Link>
                    </Box>
                <Box>
                    <Link href="/register">
                        Register
                    </Link>
               </Box>
             </Flex>
           </>
       )
      }else{
       body= (
         <Flex>
            <Box mr={5}>{data.me.username}</Box>
            <Button 
             isLoading={logoutFetching} 
             onClick={() => logout()} 
            variant="link">
               Logout
            </Button>
         </Flex>
       )
      }
      return (
         <Flex bg="tomato" p={3}>
            <Box ml="auto">
                {body}
            </Box>
          </Flex>
        );
}