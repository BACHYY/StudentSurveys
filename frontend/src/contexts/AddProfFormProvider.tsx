import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { postProf } from "../store/slices/professor-slice";
import { IProfFormValidationValues } from "../types/form";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const profFormValidation = yup.object().shape({
  school: yup.string().min(2).max(30).required(),
  name: yup.string().min(2).max(30).required(),
  department: yup.string().min(2).max(30).required(),
});

const resolver: Resolver<IProfFormValidationValues> =
  yupResolver(profFormValidation);

export default function AddProfFormProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();

  const onSubmit = (values: IProfFormValidationValues) => {
    let payload = {
      ...values,
    };
    dispatch(postProf(payload));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

