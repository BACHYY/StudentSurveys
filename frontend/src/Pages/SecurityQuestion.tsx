import SecurityQuestionForm from "../Components/SecurityQuestionForm";
import SecurityQuestionFormProvider from "../contexts/SecurityQuestionFormProvider";

export default function SecurityQuestion() {
 
  return (
    <SecurityQuestionFormProvider>
      <SecurityQuestionForm />
    </SecurityQuestionFormProvider>
  );
}
