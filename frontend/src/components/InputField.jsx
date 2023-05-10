import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
    />
  );
};

export default InputField;
