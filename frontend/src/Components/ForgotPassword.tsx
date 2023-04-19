import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordProvider from "../contexts/ForgotPasswordProvider";


export default function ForgotPassword() {
 
  return (
    <ForgotPasswordProvider>
      <ForgotPasswordForm />
    </ForgotPasswordProvider>
  );
}
