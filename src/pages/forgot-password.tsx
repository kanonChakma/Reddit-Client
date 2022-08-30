
import { Box, Button, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

export const ForgotPassword: React.FC<{}> = ({}) => {
         const[complete, setComplete] = useState(false);
         const[,forgotPassword] = useForgotPasswordMutation();
        return (
            <Wrapper variant='small'>
            <Text mb={8} textAlign="center" fontSize='20px' color='tomato'>
                Reset Your Password
            </Text>
           <Formik
            initialValues={{ email: ""}}
            onSubmit= { async (values) => {
                 await forgotPassword({email: values.email})
                 setComplete(true);
              }
            }
          >
            {({
            handleSubmit,
            isSubmitting,
            /* and other goodies */
            }) => 
            complete?(
              <Box>
                Plesase Check Your email that your provide
              </Box>
            ):(
            <form onSubmit={handleSubmit}>
                <InputField
                 name='email'
                 placeholder='Enter Your Email'
                 label='email:'
                 type='email'
                />
                <Box mt={3}></Box>
                <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={isSubmitting}
                    type='submit'
                >
                   Submit
                </Button>
            </form>
            )}
        </Formik> 
        </Wrapper>
        );
};

export default  withUrqlClient(createUrqlClient)(ForgotPassword);