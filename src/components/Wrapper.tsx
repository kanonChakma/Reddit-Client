import { Box } from '@chakra-ui/react';
import React from 'react';

export type WrapperVariant = "small"|"regular";
export type ChildrenTypes = JSX.Element | JSX.Element[];
interface WrapperProps {
 children?:ChildrenTypes;
 variant?:WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant="regular"}) => {
        return <Box
            mt={8}
            maxW={variant=="regular" ? "800px":"400px"}
            w="100%"
            mx="auto"
            >
            {children}
        </Box>;
}
