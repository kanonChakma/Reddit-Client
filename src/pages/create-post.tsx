import { Box, Button, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { InputField } from '../components/InputField';
import { LayOut } from '../components/LayOut';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
export const CreatePost: React.FC<{}> = ({}) => {
    const [{data, fetching}] = useMeQuery()
    const router = useRouter();
    useEffect(() => {
        if(!fetching && !data?.me) {
            router.replace("/login");
        }
    }, [data, fetching,router]);

    const [,createPost] = useCreatePostMutation()
        return (
            <LayOut variant='small'>
            <Text mb={8} textAlign="center" fontSize='20px' color='tomato'>
               Create a Post
            </Text>
           <Formik
            initialValues={{ text: "", title: "" }}
            onSubmit= { async (values) => {
               await createPost({title: values.title, text: values.text})
               router.push("/");        
              }
            }
        >
            {({
            handleSubmit,
            isSubmitting,
            /* and other goodies */
            }) => (
            <form onSubmit={handleSubmit}>
                <Box mt={3}>
                    <InputField
                    name='title'
                    placeholder='title'
                    label='Enter Post Title'
                    type='text'
                    />
                    </Box>
                 <Box mt={3}>
                    <InputField
                    textarea
                    type='body'
                    placeholder='text......'
                    name='text'
                    label='Enter Text'
                    />
                </Box>
                <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={isSubmitting}
                    type='submit'
                >
                   create
                </Button>
            </form>
            )}
        </Formik> 
        </LayOut>
        );
}

export default withUrqlClient(createUrqlClient)(CreatePost);