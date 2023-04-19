import AddProfForm from "./AddProfForm";
import AddProfFormProvider from "../contexts/AddProfFormProvider";

export default function AddProfessors() {
  return (
    <AddProfFormProvider>
      <AddProfForm />
    </AddProfFormProvider>
  );
}
