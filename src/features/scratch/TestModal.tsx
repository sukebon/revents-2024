import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { useAppSelector } from "../../app/store/store";
export default function TestModal() {
  const { data } = useAppSelector(state => state.modal);
  return (
    <ModalWrapper header={'Test in 1234'}>
      <div>Test data is {data}</div>
    </ModalWrapper>
  );
}