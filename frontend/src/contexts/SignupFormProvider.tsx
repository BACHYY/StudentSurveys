import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { ISignupFormValidationValues } from "../types/form";
import { postUser } from "../store/slices/user-slice";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const signupFormValidation = yup.object().shape({
  name: yup.string().min(2).max(30).required(),
  email: yup.string().min(8).max(30).required(),
  password: yup.string().min(8).max(30).required() ,
  securityQuestion: yup.string().min(8).max(30).required(),
  securityAnswer: yup.string().min(2).max(30).required(),
});

const resolver: Resolver<ISignupFormValidationValues> =
  yupResolver(signupFormValidation);

export default function SignupFormProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (values: ISignupFormValidationValues) => {
    let payload = {
      ...values,
        
    };
    dispatch(postUser
    (payload));
    navigate("/signin");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

