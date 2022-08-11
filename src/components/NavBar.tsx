import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { useMeQuery } from '../generated/graphql';

export const NavBar: React.FC<{}> = ({}) => {
      const [{data, fetching}] = useMeQuery()
      
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
            <Button variant="link">Logout</Button>
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