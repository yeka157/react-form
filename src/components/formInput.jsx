import React from 'react';
import { FormControl, Input, FormLabel, FormErrorMessage } from '@chakra-ui/react';

export default function FormInput({label, isValid, errorMsg, onChange, type}) {
  return (
    <FormControl variant='floating' isRequired isInvalid={isValid} className='mb-5'>
        <Input placeholder='' onChange={onChange} type={type ? type : 'text'}/>
        <FormLabel>{label}</FormLabel>
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  );
}
