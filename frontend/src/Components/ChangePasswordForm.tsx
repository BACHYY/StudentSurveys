import { Button, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import ActivityIndicator from "../Components/ActivityIndicator";
import { IUserPasswordFormValidationValues } from "../types/form";
import { useFormContext } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { useAppSelector } from "./useReactRedux";
import HeaderNavbar from "./HeaderNavbar";

interface IFormOption {
  title: string;
  fieldName: keyof IUserPasswordFormValidationValues;
}
const options: IFormOption[] = [
  {
    title: "New Password",
    fieldName: "password",
  },
];

export default function ChangePasswordForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IUserPasswordFormValidationValues>();

  const { loading } = useAppSelector((state) => state.passupdate);

  return (
    <StackStyle2>
        <HeaderNavbar />
      <StackStyle alignItems="center" justifyContent="center">
        <PaperStyle variant="outlined" square>
          <TypographyStyle variant="h4" textAlign="center">
            Update Password
          </TypographyStyle>
          <ActivityIndicator loading={loading} />

          <StackStyle spacing={3}>
            {options.map((item, index) => (
              <CustomTextField
                key={index}
                label={item.title}
                fieldError={errors?.[item.fieldName]}
                {...register(item.fieldName)}
              />
            ))}
          </StackStyle>

          <Stack>
            <ButtonStyle variant="contained" size="small" type="submit">
              Save Password
            </ButtonStyle>
          </Stack>
        </PaperStyle>
      </StackStyle>
    </StackStyle2>
  );
}

const StackStyle2 = styled(Stack)({
  backgroundColor: "#FCFBF3",
    height: "100vh",
});

const StackStyle = styled(Stack)({
  padding: "25px 40px",
});

const PaperStyle = styled(Paper)({
  width: "400px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  border: "1px solid #FCFBF3",
});

const ButtonStyle = styled(Button)({
  margin: "25px 5px 10px 5px",
});

const TypographyStyle = styled(Typography)({
  backgroundColor: "#9C2789",
  color: "white",
  borderRadius: "9px 9px 0px 0px ",
});
