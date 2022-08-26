import { Box, Button, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
interface props {
    token :string
}

const ChangePassword: NextPage<props> = ({token}) => {
    const [,changePassword] = useChangePasswordMutation()
    const router = useRouter();
    const [tokenError, setTokenError] = useState("");
    
    return (
        <div>
           <Wrapper variant='small'>
                <Text mb={8} textAlign="center" fontSize='20px' color='tomato'>
                   Reset Your Password
                </Text>
               <Formik
                initialValues={{ newPassword: "" }}
                onSubmit= { async (values, { setErrors}) => {

                    const response = await changePassword({newPassword: values.newPassword, token:token})
                    if(response.data?.changePassword.error){
                        const errorMap = toErrorMap(response.data.changePassword.error);
                        if('token' in errorMap){
                          setTokenError(errorMap.token); 
                        }
                        setErrors(errorMap);
                     }
                   else if(response.data?.changePassword.user){
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
                     name='newPassword'
                     placeholder='Enter New Password'
                     label='change password'
                     type='password'
                    />
                      {tokenError?<Box style={{color: "red"}}>Token Expired</Box>:null}
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

export default withUrqlClient(createUrqlClient)(ChangePassword);