import React from "react";
import ChangePasswordForm from "../Components/ChangePasswordForm";
import ChangePasswordFormProvider from "../contexts/ChangePasswordFormProvider";

export default function ChangePassword() {
  return (
    <ChangePasswordFormProvider>
      <ChangePasswordForm />
    </ChangePasswordFormProvider>
  );
}
