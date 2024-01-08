"use client";

import { clsx } from "clsx";
import { forwardRef, useId, useState } from "react";
import { twMerge } from "tailwind-merge";

type BaseProps = {
  label?: string;
  className?: {
    label?: string;
    inputWrapper?: string;
    input?: string;
    container?: string;
  };
  helperText?: string;
  error?: boolean;
  endAdornment?: React.ReactNode;
};

export type TextInputProps =
  | ({
      multiline?: false;
    } & BaseProps &
      Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">)
  | ({
      multiline: true;
    } & BaseProps &
      Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className">);

export const TextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextInputProps
>((props, ref) => {
  const {
    label,
    className = {},
    helperText,
    error,
    endAdornment,
    multiline = false,
    ...inputProps
  } = props;
  const {
    label: labelClassName = "",
    inputWrapper: inputWrapperClassName = "",
    input: inputClassName = "",
    container: containerClassName = "",
  } = className;
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const Component = multiline ? "textarea" : "input";

  return (
    <div className={twMerge("flex flex-col gap-y-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className={twMerge("font-medium", labelClassName)}>
          {label}
        </label>
      )}

      <div
        className={twMerge(
          clsx(
            "flex flex-nowrap items-center overflow-hidden rounded-md border",
            {
              "border-blue-900": isFocused && !error,
              "border-red-500": error,
              "border-gray-200": !error,
            },
            inputWrapperClassName
          )
        )}
      >
        <Component
          id={id}
          className={twMerge(
            "block flex-1 px-2 py-2 outline-0",
            inputClassName
          )}
          // @ts-expect-error ref discrimination error
          ref={ref}
          // @ts-expect-error ref discrimination error
          type={multiline ? undefined : inputProps.type ?? "text"}
          {...{
            ...inputProps,
            onFocus: (e) => {
              // @ts-expect-error ref discrimination error
              inputProps?.onFocus?.(e);
              setIsFocused(true);
            },
            onBlur: (e) => {
              // @ts-expect-error ref discrimination error
              inputProps?.onBlur?.(e);
              setIsFocused(false);
            },
          }}
        />

        {endAdornment && <div className={"px-2"}>{endAdornment}</div>}
      </div>

      {helperText && (
        <p
          className={clsx("text-sm", {
            "text-red-400": error,
            "text-gray-500": !error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

TextInput.displayName = "TextInput";
