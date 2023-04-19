import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../Components/useReactRedux";
import { ISchoolFormValidationValues } from "../types/form";
import { postSchool } from "../store/slices/school-slice";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const schoolFormValidation = yup.object().shape({
  name: yup.string().min(2).max(30).required(),
  city: yup.string().min(2).max(30).required(),
  state: yup.string().min(2).max(30).required(),
  country: yup.string().min(2).max(30).required(),

});

const resolver: Resolver<ISchoolFormValidationValues> =
  yupResolver(schoolFormValidation);

export default function AddSchoolFormProvider({ children }: IProps) {
  const methods = useForm({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();

  const onSubmit = (values: ISchoolFormValidationValues) => {
    let payload = {
      ...values,
    };
    dispatch(postSchool
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

