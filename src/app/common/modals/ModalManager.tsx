import { useAppSelector } from "../../store/store";
import TestModal from "../../../features/scratch/TestModal";
import LoginForm from "../../../features/auth/LoginForm";

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm
  };

  const { type, data, open } = useAppSelector(state => state.modal);

  let renderModal;

  if (open && type) {
    const ModalComponent = (modalLookup as any)[type];
    renderModal = <ModalComponent data={data} />;
  }

  return (
    <span>{renderModal}</span>
  );
}