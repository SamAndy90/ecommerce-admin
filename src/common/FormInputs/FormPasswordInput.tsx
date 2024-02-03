import { path } from "ramda";
import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import { PasswordInput, TextInputProps } from "common/ui";

export type FormPasswordInputProps<T> = {
  fieldName: Path<T>;
} & TextInputProps;

export function FormPasswordInput<T extends FieldValues>(
  props: FormPasswordInputProps<T>
) {
  const { fieldName, ...textInputProps } = props;
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, formState: { errors } }) => {
        const error = path<FieldError>(
          fieldName.split("."),
          errors
        ) as FieldError;

        return (
          <PasswordInput
            {...textInputProps}
            {...field}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
}
