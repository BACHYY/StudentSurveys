import { Button, Paper, Stack, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ActivityIndicator from "../Components/ActivityIndicator";
import { IUserSecurityAnswerFormValidationValues } from "../types/form";
import { useFormContext } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { useAppDispatch, useAppSelector } from "./useReactRedux";
import HeaderNavbar from "./HeaderNavbar";
import { useNavigate } from "react-router-dom";
import { setSecurityAnswer } from "../store/slices/security-answer-slice";

interface IFormOption {
  title: string;
  fieldName: keyof IUserSecurityAnswerFormValidationValues;
}
const options: IFormOption[] = [
  {
    title: "Answer",
    fieldName: "securityAnswer",
  },
];

export default function UnAuthorizedSecurityQuestionForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IUserSecurityAnswerFormValidationValues>();

  const { data } = useAppSelector((state) => state.forgotPass);
  const { Answer, loading } = useAppSelector((state) => state.securityAnswer);
  const navigate  = useNavigate();
  const dispatch = useAppDispatch();






  useEffect(() => {
    if (Answer) navigate("/usersettings/securityquestion/changepassword");
    dispatch(setSecurityAnswer());

  }, [Answer]);

  return (
    <StackStyle2>
      <HeaderNavbar />
      <StackStyle alignItems="center" justifyContent="center">
        <PaperStyle variant="outlined" square>
          <TypographyStyle variant="h4" textAlign="center">
            Security Question
          </TypographyStyle>
          <ActivityIndicator loading={loading} />
          <TypographyStyle1 variant="h5" align="center" color="secondary">
            {data.securityQuestion}
          </TypographyStyle1>

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
              Next
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

const TypographyStyle1 = styled(Typography)({
  color: "#9C2789",
  marginTop: "20px",
});
