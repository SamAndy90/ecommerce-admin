import { forwardRef, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";

import { IconButton, TextInput, TextInputProps } from "common/ui";

export const PasswordInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <TextInput
        {...{
          ...props,
          type: isVisible ? "text" : "password",
        }}
        ref={ref}
        endAdornment={
          isVisible ? (
            <IconButton
              onMouseUp={() => setIsVisible(false)}
              colorVariant={"secondary"}
            >
              <TbEyeOff className={"h-5 w-5 text-blue-700"} />
            </IconButton>
          ) : (
            <IconButton
              onMouseDown={() => setIsVisible(true)}
              colorVariant={"secondary"}
            >
              <TbEye className={"h-5 w-5 text-blue-700"} />
            </IconButton>
          )
        }
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
