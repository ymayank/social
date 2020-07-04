import React from 'react';
import { TextField } from '@material-ui/core';

function TextInput(props) {
    return (
        <TextField
          {...props}
          id={props.name}
      />)
  }

TextInput.defaultProps = {
    variant:'outlined',
    margin:'normal',
    fullWidth: true,
    type: '',
}

export default TextInput;