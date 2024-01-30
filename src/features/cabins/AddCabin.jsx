import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const btnStyle = {
    width: "100%",

    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <>
      <Button
        style={btnStyle}
        size="large"
        variation="primary"
        onClick={() => setIsOpenModal((prevState) => !prevState)}
      >
        {isOpenModal ? "cancel" : "add new cabin"}
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
