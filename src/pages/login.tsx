import { Box, Button, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

const Login: React.FC<{}> = ({}) => {
    const [, login] = useLoginMutation();
    const router =  useRouter();
        return (
            <Wrapper variant='small'>
                <Text mb={8} textAlign="center" fontSize='20px' color='tomato'>
                   Login Your Account
                </Text>
               <Formik
                initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit= { async (values, { setErrors}) => {
                   const response = await login({usernameOrEmail: values.usernameOrEmail, password: values.password})
                  if(response.data?.login.error){
                      setErrors(toErrorMap(response.data.login.error))
                    }
                   else if(response.data?.login.user){
                    router.push("/");
                    }   
                  }
                }
            >
                {({
                handleSubmit,
                isSubmitting,
                /* and other goodies */
                }) => (
                <form onSubmit={handleSubmit}>
                    <InputField
                     name='usernameOrEmail'
                     placeholder='username Or Email'
                     label='username or Email:'
                     type='text'
                    />
                    <Box mt={3}>
                    </Box>
                    <InputField
                      type='password'
                      placeholder='password'
                      name='password'
                      label='Enter Your Password:'
                    />
                     <Box mt={3}>
                    </Box>
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
}

export default withUrqlClient(createUrqlClient)(Login);