
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variation='primary' size='medium'>add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      {/* <Modal.Open opens="table">
        <Button>add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CreateCabinForm />
      </Modal.Window> */}
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const btnStyle = {
//     width: "100%",

//     marginTop: "10px",
//     marginBottom: "10px",
//   };
//   return (
//     <>
//       <Button
//         style={btnStyle}
//         size="large"
//         variation="primary"
//         onClick={() => setIsOpenModal((prevState) => !prevState)}
//       >
//         {isOpenModal ? "cancel" : "add new cabin"}
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
