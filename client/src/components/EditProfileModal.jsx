/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { Modal, Label, TextInput, Textarea } from "flowbite-react";
import { DefaultButton, SecondaryButton } from "./Buttons";

// Dummy data (replace with actual data fetching logic later)
const dummyProfileData = {
  name: "Sam Guy",
  username: "@samguy",
  bio: "Lorem ipsum odor amet, consectetuer adipiscing elit. Congue lectus fermentum nisl accumsan ut fames amet justo.",
  avatarImage: "https://via.placeholder.com/150",
  headerImage: "https://via.placeholder.com/700x280",
};

const modalTheme = {
  footer: {
    base: "flex items-center space-x-2 rounded-b border-light-secondaryText p-6 dark:border-dark-secondaryText",
  },
};

const textInputTheme = {
  field: {
    input: {
      colors: {
        gray: "border-button-default bg-light-secondaryBackground text-light-primaryText focus:border-button-default focus:ring-light-secondaryText dark:border-button-default dark:bg-dark-secondaryBackground dark:text-dark-primaryText dark:placeholder-gray-400 dark:focus:border-button-default dark:focus:ring-dark-secondaryText",
      },
    },
  },
};

const textAreaTheme = {
  colors: {
    gray: "border-button-default bg-light-secondaryBackground text-light-primaryText focus:border-button-default focus:ring-light-secondaryText dark:border-button-default dark:bg-dark-secondaryBackground dark:text-dark-primaryText dark:placeholder-gray-400 dark:focus:border-button-default dark:focus:ring-dark-secondaryText",
  },
};

const EditProfileModal = ({ openModal, setOpenModal, onSave }) => {
  const [avatarPreview, setAvatarPreview] = useState(
    dummyProfileData.avatarImage
  );
  const [headerPreview, setHeaderPreview] = useState(
    dummyProfileData.headerImage
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: dummyProfileData,
  });

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "avatarImage" || key === "headerImage") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    console.log("Profile data to be saved:", formData);
    onSave(formData);
    setOpenModal(false);
  };

  return (
    <Modal
      theme={modalTheme}
      show={openModal}
      onClose={() => setOpenModal(false)}
      size="lg"
      //   className="bg-light-secondaryBackground dark:bg-dark-secondaryBackground"
    >
      <Modal.Header className="border-b border-light-secondaryText bg-light-secondaryBackground dark:border-dark-secondaryText dark:bg-dark-secondaryBackground">
        <div className="flex items-center">
          <PencilSquareIcon className="mr-2 h-6 w-6 text-button-default" />
          <h3 className="text-xl font-medium text-light-primaryText dark:text-dark-primaryText">
            Edit Profile
          </h3>
        </div>
      </Modal.Header>
      <Modal.Body className="p-10 bg-light-background text-light-primaryText dark:bg-dark-background dark:text-dark-primaryText">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div>
            <Label
              htmlFor="headerImage"
              value="Header Image"
              className="mb-2 block text-light-primaryText dark:text-dark-primaryText"
            />
            <div className="mb-2 flex items-center justify-center">
              <img
                src={headerPreview}
                alt="Header preview"
                className="w-full h-[125px] md:h-[280px] object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="headerImage"
                className="flex cursor-pointer items-center justify-center rounded-lg border border-button-default bg-transparent px-4 py-2 text-sm font-medium text-light-primaryText shadow-sm  dark:text-dark-primaryText"
              >
                {/* <SecondaryButton label="Change Header" Icon={PhotoIcon} /> */}
                <PhotoIcon
                  className="mr-2 h-5 w-5 text-light-primaryText dark:text-dark-primaryText"
                  aria-hidden="true"
                />
                Change Header
              </label>
              <input
                id="headerImage"
                type="file"
                accept="image/*"
                className="sr-only"
                {...register("headerImage")}
                onChange={(e) => handleImageChange(e, setHeaderPreview)}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="avatarImage"
              value="Profile Picture"
              className="mb-2 block text-light-primaryText dark:text-dark-primaryText"
            />
            <div className="mb-2 flex items-center justify-center">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="size-[150px] rounded-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="avatarImage"
                className="flex cursor-pointer items-center justify-center rounded-lg border border-button-default bg-transparent px-4 py-2 text-sm font-medium text-light-primaryText shadow-sm  dark:text-dark-primaryText"
              >
                {/* <SecondaryButton label="Change Header" Icon={PhotoIcon} /> */}
                <PhotoIcon
                  className="mr-2 h-5 w-5 text-light-primaryText dark:text-dark-primaryText"
                  aria-hidden="true"
                />
                Change Avatar
              </label>
              <input
                id="avatarImage"
                type="file"
                accept="image/*"
                className="sr-only"
                {...register("avatarImage")}
                onChange={(e) => handleImageChange(e, setAvatarPreview)}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="name"
              value="Name"
              className="text-light-primaryText dark:text-dark-primaryText"
            />
            <TextInput
              theme={textInputTheme}
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1"
              placeholder="Name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="username"
              value="Username"
              className="text-light-primaryText dark:text-dark-primaryText"
            />
            <TextInput
              theme={textInputTheme}
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className="mt-1"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="bio"
              value="Bio"
              className="text-light-primaryText dark:text-dark-primaryText"
            />
            <Textarea
              theme={textAreaTheme}
              id="bio"
              rows={4}
              {...register("bio", {
                maxLength: {
                  value: 160,
                  message: "Bio must be less than 160 characters",
                },
              })}
              className="mt-1"
            />
            {errors.bio && (
              <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex justify-center space-x-5 bg-light-background dark:bg-dark-background rounded-b-[10px]">
        <DefaultButton label="Save Changes" onClick={handleSubmit(onSubmit)} />
        <SecondaryButton label="Cancel" onClick={() => setOpenModal(false)} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
