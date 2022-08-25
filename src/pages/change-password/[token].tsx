import { Box, Button, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
interface props {
    token :string
}

const ChangePassword: NextPage<props> = ({token}) => {
    return (
        <div>
           <Wrapper variant='small'>
                <Text mb={8} textAlign="center" fontSize='20px' color='tomato'>
                   Reset Your Password
                </Text>
               <Formik
                initialValues={{ newPassword: "" }}
                onSubmit= { async (values, { setErrors}) => {
                //    const response = await login({usernameOrEmail: values.usernameOrEmail, password: values.password})
                //   if(response.data?.login.error){
                //       setErrors(toErrorMap(response.data.login.error))
                //     }
                //    else if(response.data?.login.user){
                //     router.push("/");
                //     }   
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
                     name='newPassoword'
                     placeholder='Enter New Password'
                     label='change password'
                     type='password'
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
        </div>
    )
 }

ChangePassword.getInitialProps = ({query}) => {
 return {
     token: query.token as string,
  };
};

export default ChangePassword;