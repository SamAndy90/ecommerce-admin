import { clsx } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ButtonBase, ButtonBaseProps } from ".";

export type LinkButtonProps = {
  size?: "small" | "large";
  colorVariant?: "primary" | "secondary" | "danger";
} & ButtonBaseProps;

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  (props, ref) => {
    const {
      size = "small",
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
              "inline-block transition-colors ease-linear rounded-lg text-white",
              {
                "bg-blue-300": colorVariant === "primary" && loading,
                "bg-blue-900 hover:bg-blue-700":
                  colorVariant === "primary" && !loading,
                "bg-gray-300": colorVariant === "secondary" && loading,
                "bg-gray-500 hover:bg-gray-700":
                  colorVariant === "secondary" && !loading,
                "bg-red-300": colorVariant === "danger" && loading,
                "bg-red-500 hover:bg-red-700":
                  colorVariant === "danger" && !loading,
              },
              {
                "text-sm px-4 py-2": size === "small",
                "text-lg px-8 py-3": size === "large",
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

LinkButton.displayName = "LinkButton";
