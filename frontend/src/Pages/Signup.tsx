import React from "react";
import SignupForm from "../Components/SignupForm";
import SignupFormProvider from "../contexts/SignupFormProvider";

export default function Signup() {
  return (
    <SignupFormProvider>
      <SignupForm />
    </SignupFormProvider>
  );
}
