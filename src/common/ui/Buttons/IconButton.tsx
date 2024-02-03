import { clsx } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ButtonBase, ButtonBaseProps } from "common/ui";

export type IconButtonProps = {
  size?: "small" | "normal" | "large";
  colorVariant?: "primary" | "secondary";
} & ButtonBaseProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      size = "normal",
      colorVariant = "primary",
      children,
      className = {},
      loading = false,
      ...baseButtonProps
    } = props;

    const { button: buttonClassName, loadingIcon: loadingIconClassName } =
      className;

    return (
      <ButtonBase
        ref={ref}
        loading={loading}
        className={{
          button: twMerge(
            clsx(
              "flex items-center justify-center rounded-full transition-colors ease-linear",
              {
                "bg-blue-300": colorVariant === "primary" && loading,
                "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 disabled:bg-blue-100":
                  colorVariant === "primary" && !loading,
                "bg-gray-100": colorVariant === "secondary" && loading,
                "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-100":
                  colorVariant === "secondary" && !loading,
              },
              {
                "h-6 w-6 p-1": size === "small",
                "h-8 w-8 p-1": size === "normal",
                "h-10 w-10 p-1": size === "large",
              },
              buttonClassName
            )
          ),
          loadingIcon: loadingIconClassName,
        }}
        {...baseButtonProps}
      >
        {children}
      </ButtonBase>
    );
  }
);

IconButton.displayName = "IconButton";
