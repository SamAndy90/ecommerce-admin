import { path } from "ramda";
import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import { NumberInput, NumberInputProps } from "common/ui";

export type FormNumberInputProps<T> = {
  fieldName: Path<T>;
} & NumberInputProps;

export function FormNumberInput<T extends FieldValues>(
  props: FormNumberInputProps<T>
) {
  const { fieldName, ...numberInputProps } = props;
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
          <NumberInput
            {...numberInputProps}
            {...field}
            onChange={(value) => field.onChange(value.target.valueAsNumber)}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
}
