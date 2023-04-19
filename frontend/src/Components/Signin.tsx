import React from "react";
import SigninForm from "./SigninForm";
import SigninFormProvider from "../contexts/SigninFormProvider";

export default function Signin() {
  return (
    <SigninFormProvider>
      <SigninForm />
    </SigninFormProvider>
  );
}
