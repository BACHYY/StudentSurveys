import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { ISigninFormValidationValues } from "../types/form";
import { loginUser } from "../store/slices/login-slice";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const signinFormValidation = yup.object().shape({
  email: yup.string().min(2).max(30).required(),
  password: yup.string().min(2).max(30).required() ,
});

const resolver: Resolver<ISigninFormValidationValues> =
  yupResolver(signinFormValidation);

export default function SigninFormProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();

  const onSubmit = (values: ISigninFormValidationValues) => {
    let payload = {
      ...values,
    };
    dispatch(loginUser
    (payload));
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

