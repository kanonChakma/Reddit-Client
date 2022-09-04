import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
    textarea?:boolean
}

export const InputField: React.FC<InputFieldProps> = ({textarea,label,size:_,...props}) => {
     const [field, {error}] = useField(props);
     let InputOrTextarea = Input as any;    
     if(textarea) {
        InputOrTextarea = Textarea
         }         
        return (
            <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <InputOrTextarea 
                   {...field} 
                   {...props}
                   id={field.name} />
               {error?<FormErrorMessage>{error}</FormErrorMessage>:null}
           </FormControl>
        )
}