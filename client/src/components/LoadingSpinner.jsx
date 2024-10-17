/* eslint-disable react/prop-types */
import { Spinner } from "flowbite-react";
import { spinnerTheme } from "../utils/flowbiteThemes";

export default function LoadingSpinner({ size = "xl" }) {
  return (
    <div className="flex justify-center items-center">
      <Spinner
        theme={spinnerTheme}
        className="text-button-default fill-button-hover dark:text-button-default dark:fill-button-hover"
        size={size}
      />
    </div>
  );
}
