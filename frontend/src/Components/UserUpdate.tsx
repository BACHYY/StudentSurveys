import React from "react";
import UserUpdateFormProvider from "../contexts/UserUpdateFormProvider";
import UserUpdateForm from "./UserUpdateForm";

export default function UserUpdate() {
  return (
    <UserUpdateFormProvider>
      <UserUpdateForm />
    </UserUpdateFormProvider>
  );
}
