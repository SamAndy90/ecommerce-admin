import { path } from "ramda";
import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import { SelectInput, SelectInputProps } from "common/ui";

export type FormSelectInputProps<T> = {
  fieldName: Path<T>;
} & Omit<SelectInputProps, "value" | "onChange">;

export function FormSelectInput<T extends FieldValues>(
  props: FormSelectInputProps<T>
) {
  const { fieldName, multiple, ...selectInputProps } = props;
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, formState: { errors } }) => {
        const { value, onChange } = field;
        const error = path<FieldError>(
          fieldName.split("."),
          errors
        ) as FieldError;

        return (
          <SelectInput
            {...(multiple
              ? {
                  value: value ?? [],
                  multiple: true,
                }
              : {
                  value: value ?? "",
                })}
            {...selectInputProps}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
}
