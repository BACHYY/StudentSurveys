import UnAuthorizedSecurityQuestionProvider from "../contexts/UnAuthorizedSecurityQuestionProvider";
import UnAuthorizedSecurityQuestionForm from "./UnAuthorizedSecurityQuestionForm";

export default function UnAuthorizedSecurityQuestion() {
  return (
    <UnAuthorizedSecurityQuestionProvider>
      <UnAuthorizedSecurityQuestionForm />
    </UnAuthorizedSecurityQuestionProvider>
  );
}
