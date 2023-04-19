import { Button, Paper, Stack, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import HeaderNavbar from "../Components/HeaderNavbar";
import { ISigninFormValidationValues } from "../types/form";
import ActivityIndicator from "./ActivityIndicator";
import CustomTextField from "./CustomTextField";
import { useAppSelector } from "./useReactRedux";

interface IFormOption {
  title: string;
  fieldName: keyof ISigninFormValidationValues;
}
const options: IFormOption[] = [
  {
    title: "Email",
    fieldName: "email",
  },
  {
    title: "Password",
    fieldName: "password",
  },
];

export default function SigninForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISigninFormValidationValues>();

  const { loading } = useAppSelector((state) => state.login);

  const navigate = useNavigate();
  const navigateToForgotPass = () => {
    navigate("/forgotpassword");
  };

  const user_id = useAppSelector((state) => state.login.data._id);
  const { pathname } = useLocation();

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!user_id) return;
    setSearchParams({ userid: user_id });
  }, [user_id, pathname]);
  return (
    <StackStyle2>
      <HeaderNavbar />
      <StackStyle alignItems="center" justifyContent="center">
        <PaperStyle variant="outlined" square>
          <TypographyStyle variant="h4" textAlign="center">
            Sign in Form
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
            <Button onClick={navigateToForgotPass}>Forgot Password? </Button>
          </Stack>
          <Stack>
            <ButtonStyle variant="contained" size="small" type="submit">
              Sign in{" "}
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
