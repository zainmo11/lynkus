/* eslint-disable react/prop-types */
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Alert } from "flowbite-react";
import { alertTheme } from "../utils/flowbiteThemes";

function AlertComponent({ type, content, toggleFunction }) {
  return (
    <Alert
      theme={alertTheme}
      color="success"
      onDismiss={toggleFunction}
      icon={InformationCircleIcon}
      className="px-10 py-5 bg-light-secondaryBackground dark:bg-dark-secondaryBackground rounded-none border-b-2 border-light-secondaryText dark:border-dark-secondaryText"
    >
      <p className="text-light-primaryText dark:text-dark-primaryText">
        <span className="font-bold text-light-secondaryText dark:text-dark-secondaryText">
          {type}
        </span>{" "}
        {content}
      </p>
    </Alert>
  );
}

export default AlertComponent;
