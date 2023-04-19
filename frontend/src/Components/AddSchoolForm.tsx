import { Button, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import HeaderNavbar from "../Components/HeaderNavbar";
import { useAppSelector } from "../Components/useReactRedux";
import ActivityIndicator from "../Components/ActivityIndicator";
import { ISchoolFormValidationValues } from "../types/form";
import { useFormContext } from "react-hook-form";
import CustomTextField from "./CustomTextField";

interface IFormOption {
  title: string;
  fieldName: keyof ISchoolFormValidationValues;
}
const options: IFormOption[] = [
  {
    title: "Name",
    fieldName: "name",
  },
  {
    title: "City",
    fieldName: "city",
  },
  {
    title: "State",
    fieldName: "state",
  },
  {
    title: "Country",
    fieldName: "country",
  },
];

export default function AddProfForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISchoolFormValidationValues>();

  const { loading } = useAppSelector((state) => state.school);

  return (
    <StackStyle2>
      <HeaderNavbar />
      <StackStyle alignItems="center" justifyContent="center">
        <PaperStyle variant="outlined" square>
          <TypographyStyle variant="h4" textAlign="center">
            Add School Form
          </TypographyStyle>
          <ActivityIndicator loading={loading} />

          <StackStyle spacing={2}>
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
              Add School
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
  padding: "40px",
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
