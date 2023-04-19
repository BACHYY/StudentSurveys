import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { forgotPass } from "../store/slices/forgot-password-slice";
import { IForgotPassValues } from "../types/form";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const forgotPassFormValidation = yup.object().shape({
  email: yup.string().min(2).max(30).required(),
});

const resolver: Resolver<IForgotPassValues> = yupResolver(
  forgotPassFormValidation
);

export default function ForgotPasswordProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();
  
  const onSubmit = (values: IForgotPassValues) => {
    let payload = {
      ...values,
    };
    dispatch(forgotPass(payload));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
