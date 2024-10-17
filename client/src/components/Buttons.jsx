/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";

export const DefaultButton = ({ type, Icon, label, onClick }) => {
  return (
    <Button
      className="bg-button-default hover:bg-button-hover border-button-default hover:border-button-hover border-[2px] xl:px-2 rounded-[10px] focus:ring-0"
      onClick={onClick}
      type={type}
    >
      <div className="flex items-center font-medium text-sm xl:text-lg text-dark-primaryText">
        {Icon && <Icon className="size-4 xl:size-5 mr-2" />}
        {label}
      </div>
    </Button>
  );
};

export const SecondaryButton = ({ Icon, label, onClick }) => {
  return (
    <Button
      className="bg-transparent hover:bg-button-hover text-light-primaryText dark:text-dark-primaryText hover:text-dark-primaryText border-button-default border-[2px] xl:px-2 rounded-[10px] focus:ring-0"
      onClick={onClick}
    >
      <div className="flex items-center font-medium text-sm xl:text-lg">
        {Icon && <Icon className="size-4 xl:size-5 mr-2" />}
        {label}
      </div>
    </Button>
  );
};

export const ErrorButton = ({ Icon, label, onClick }) => {
  return (
    <Button
      className="bg-button-error hover:bg-opacity-80 border-button-error border-[2px] xl:px-2 rounded-[10px] focus:ring-0"
      onClick={onClick}
    >
      <div className="flex items-center font-medium text-sm xl:text-lg text-dark-primaryText">
        {Icon && <Icon className="size-4 xl:size-5 mr-2" />}
        {label}
      </div>
    </Button>
  );
};
