import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { setLogout } from "../store/slices/login-slice";
import { updateUser } from "../store/slices/user-update-slice";
import { IUserUpdateFormValidationValues } from "../types/form";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const userUpdateFormValidation = yup.object().shape({
  name: yup.string().min(2).max(30).required(),
  email: yup.string().min(8).max(30).required(),
});

const resolver: Resolver<IUserUpdateFormValidationValues> = yupResolver(
  userUpdateFormValidation
);

export default function UserUpdateFormProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (values: IUserUpdateFormValidationValues) => {
    let payload = {
      ...values,
    };
    dispatch(updateUser(payload));
    setTimeout(() => {
      dispatch(setLogout());
      navigate("/signin");
    }, 2000);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
