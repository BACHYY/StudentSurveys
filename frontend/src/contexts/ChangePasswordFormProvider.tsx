import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { IUserPasswordFormValidationValues } from "../types/form";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../store/slices/password-update-slice";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const passUpdateFormValidation = yup.object().shape({
  password: yup.string().min(5).max(30).required(),
});

const resolver: Resolver<IUserPasswordFormValidationValues> = yupResolver(
  passUpdateFormValidation
);

export default function ChangePasswordFormProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (values: IUserPasswordFormValidationValues) => {
    let payload = {
      ...values,
    };
    dispatch(updatePassword(payload));
    setTimeout(() => {
      navigate("/");
    }, 2000);

  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
