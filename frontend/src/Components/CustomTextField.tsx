import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { forwardRef } from "react";
import { TFieldError } from "../types";

type IProps = {
  fieldError: TFieldError;
} & TextFieldProps;


const CustomTextField = forwardRef<HTMLInputElement, IProps>(
  ({ fieldError, label, ...rest }, ref) => {
    return (
      <Stack spacing={0.5}>
        <Typography variant="body2" color="GrayText">
          {label}
        </Typography>
        <TextField
          ref={ref}
          size="small"
          {...rest}
          {...(Boolean(label === "Password" || label==="New Password") && {
            type: "password",
          })}
          {...(Boolean(label === "Email") && {
            type: "email",
          })}
          error={Boolean(fieldError)}
          helperText={fieldError?.message as string}
        />
      </Stack>
    );
  }
);

CustomTextField.displayName = "CustomTextField";
export default CustomTextField;
