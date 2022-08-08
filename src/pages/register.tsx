import { Box, Button, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
        return (
            <Wrapper variant='small'>
                <Text mb={8} textAlign="center" fontSize='20px' color='tomato'>
                   Login Your Account
                </Text>
               <Formik
                initialValues={{ name: '', password: '' }}
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                }}
            >
                {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
                }) => (
                <form onSubmit={handleSubmit}>
                    <InputField
                     name='name'
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
export default Register;