/* eslint-disable react/prop-types */
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Modal } from "flowbite-react";
import { ErrorButton, SecondaryButton } from "./Buttons";

const customTheme = {
  header: {
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-button-default hover:bg-button-hover hover:text-gray-900 ",
      icon: "size-5",
    },
  },
};

function DeleteProfileModal({ openModal, setOpenModal, delFunction }) {
  return (
    <Modal
      theme={customTheme}
      show={openModal}
      onClose={() => setOpenModal(false)}
      position="center"
      popup
    >
      <Modal.Header className=" bg-light-secondaryBackground dark:bg-dark-secondaryBackground rounded-t-[10px]" />

      <Modal.Body className="p-10 bg-light-secondaryBackground text-light-primaryText dark:bg-dark-secondaryBackground dark:text-dark-primaryText rounded-b-[10px]">
        <div className="text-center">
          <ExclamationCircleIcon className="mx-auto mb-4 size-14 fill-button-error dark:fill-dark-primaryText" />
          <h3 className="mb-5 text-lg font-normal ">
            Are you sure you want to delete your account?
          </h3>
          <div className="flex justify-center gap-4">
            <ErrorButton
              label="Yes, I'm sure"
              onClick={async () => {
                setOpenModal(false);
                await delFunction();
              }}
            />

            <SecondaryButton
              label="Cancel"
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteProfileModal;
