import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { IUserSecurityAnswerFormValidationValues } from "../types/form";
import { securityAnswer } from "../store/slices/security-answer-slice";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const securityQuestionFormValidation = yup.object().shape({
  securityAnswer: yup.string().min(2).max(30).required(),
});

const resolver: Resolver<IUserSecurityAnswerFormValidationValues> = yupResolver(
  securityQuestionFormValidation
);

export default function UnAuthorizedSecurityQuestionProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();

  const onSubmit = (values: IUserSecurityAnswerFormValidationValues) => {
    let payload = {
      ...values,
    };
    dispatch(securityAnswer(payload));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
