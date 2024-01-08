import { clsx } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonBase, ButtonBaseProps } from ".";

export type ButtonProps = {
  size?: "small" | "normal" | "large";
  colorVariant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
} & ButtonBaseProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      size = "normal",
      colorVariant = "primary",
      fullWidth = false,
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
              "flex items-center justify-center rounded-md font-semibold transition-colors ease-linear text-white",
              {
                // Primary
                "bg-blue-300": colorVariant === "primary" && loading,
                "bg-blue-900 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-700":
                  colorVariant === "primary" && !loading,
                // Danger
                "bg-red-300": colorVariant === "danger" && loading,
                "bg-red-500 hover:bg-red-700 active:bg-red-600 disabled:bg-red-100":
                  colorVariant === "danger" && !loading,
              },
              {
                "w-full": fullWidth,
                "text-sm px-4 py-2": size === "small",
                "text-sm px-6 py-3": size === "normal",
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

Button.displayName = "Button";
