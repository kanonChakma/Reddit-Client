import { Box, Button, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation();
    const router =  useRouter();
        return (
            <Wrapper variant='small'>
                <Text mb={8} textAlign="center" fontSize='20px' color='tomato'>
                   Register Your Account
                </Text>
               <Formik
                initialValues={{ username: "",email: "", password: "" }}
               
                onSubmit= { async (values, { setErrors}) => {
                   const response = await register({options: values})
                  if(response.data?.register.error){
                      setErrors(toErrorMap(response.data.register.error))
                    }
                   else if(response.data?.register.user){
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
                     name='username'
                     placeholder='username'
                     label='Enter Your First Name:'
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
                    <InputField
                      type='email'
                      placeholder='email'
                      name='email'
                      label='Enter Your email:'
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

export default withUrqlClient(createUrqlClient)(Register);