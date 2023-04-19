import React from "react";
import AddSchoolForm from "./AddSchoolForm";
import AddSchoolFormProvider from "../contexts/AddSchoolFormProvider";

export default function AddSchools() {
  return (
    <AddSchoolFormProvider>
      <AddSchoolForm />
    </AddSchoolFormProvider>
  );
}
