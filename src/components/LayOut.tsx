import React from 'react';
import { NavBar } from './NavBar';
import { ChildrenTypes, Wrapper, WrapperVariant } from './Wrapper';

interface LayOutProps {
  variant: WrapperVariant;
  children: ChildrenTypes;
}

export const LayOut: React.FC<LayOutProps> = ({children, variant}) => {
        return (
           <>
            <NavBar/>
             <Wrapper variant={variant}>
               {
                 children
               }
            </Wrapper> 
           </>
        );
}