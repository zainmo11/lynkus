export const modalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-80 ",
      off: "hidden",
    },
    sizes: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
    },
    positions: {
      center: "items-center justify-center",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
  body: {
    base: "flex-1 overflow-auto p-6",
    popup: "pt-0",
  },
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    popup: "border-b-0 p-2",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-button-default hover:bg-button-hover hover:text-gray-900 ",
      icon: "size-5",
    },
  },
  footer: {
    base: "flex items-center space-x-2 rounded-b border-light-secondaryText p-6 dark:border-dark-secondaryText",
    popup: "border-t",
  },
};

export const textInputTheme = {
  field: {
    input: {
      colors: {
        gray: "border-button-default bg-light-secondaryBackground text-light-primaryText focus:border-button-default focus:ring-light-secondaryText dark:border-button-default dark:bg-dark-secondaryBackground dark:text-dark-primaryText dark:placeholder-gray-400 dark:focus:border-button-default dark:focus:ring-dark-secondaryText",
      },
    },
  },
};

export const textAreaTheme = {
  colors: {
    gray: "border-button-default bg-light-secondaryBackground text-light-primaryText focus:border-button-default focus:ring-light-secondaryText dark:border-button-default dark:bg-dark-secondaryBackground dark:text-dark-primaryText dark:placeholder-gray-400 dark:focus:border-button-default dark:focus:ring-dark-secondaryText",
  },
};
