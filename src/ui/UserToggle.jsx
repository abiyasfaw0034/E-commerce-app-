// import { HiUser } from "react-icons/hi";

import { FaRegUserCircle } from "react-icons/fa";
import Modal from "./Modal";
import ToggleWindow from "./ToggleWindow";
// import { FaCircleUser } from "react-icons/fa6";

function UserToggle() {
  return (
    <>
      <Modal>
        <Modal.Open opens={"user-modal"}>
          <FaRegUserCircle className="w-8 h-8 mb-2   hidden md:block" />
        </Modal.Open>
        <Modal.Window name={"user-modal"}>
          <ToggleWindow />
        </Modal.Window>
      </Modal>
    </>
  );
}
export default UserToggle;
