import { Listbox, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import { Fragment } from "react";
import { TbCheck, TbChevronDown } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

type Option = {
  value: string;
  label: string;
};

type BaseProps = {
  options: Option[];
  className?: {
    label?: string;
  };
  label?: string;
  helperText?: string;
  error?: boolean;
};

export type SelectInputProps =
  | ({
      value: string;
      onChange: (value: string) => void;
      multiple?: false;
    } & BaseProps)
  | ({
      value: string[];
      onChange: (value: string[]) => void;
      multiple: true;
    } & BaseProps);

export function SelectInput(props: SelectInputProps) {
  const {
    value,
    onChange,
    options,
    multiple,
    label,
    helperText,
    error,
    className,
  } = props;

  let displayValue = "-";
  if (multiple) {
    const activeOptionsLabel = options
      .filter((i) => value.includes(i.value))
      .map((i) => i.label)
      .join(", ");
    if (activeOptionsLabel) displayValue = activeOptionsLabel;
  } else {
    const activeOptionLabel = options.find((i) => i.value === value)?.label;
    if (activeOptionLabel) displayValue = activeOptionLabel;
  }

  return (
    <div className={"flex flex-col gap-y-2 min-w-[160px]"}>
      {label && (
        <label
          className={twMerge(
            "font-medium text-blue-900 text-md",
            className?.label
          )}
        >
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} multiple={multiple}>
        <div className={"relative min-w-[100px]"}>
          <Listbox.Button
            className={
              "flex w-full items-center rounded border border-gray-200 bg-white"
            }
          >
            <span className={"flex-1 px-4 py-2"}>{displayValue}</span>

            <div className={"px-3"}>
              <TbChevronDown
                aria-hidden
                className={"h-4 w-4 select-none text-blue-700"}
              />
            </div>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter={"transition ease-in duration-100"}
            enterFrom={"opacity-0"}
            enterTo={"opacity-100"}
            leave={"transition ease-in duration-100"}
            leaveFrom={"opacity-100"}
            leaveTo={"opacity-0"}
          >
            <Listbox.Options
              className={
                "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
              }
            >
              {options.map((i) => (
                <Listbox.Option key={i.value} value={i.value}>
                  {({ active, selected }) => (
                    <li
                      className={clsx(
                        "flex cursor-pointer select-none items-center justify-between px-4 py-2",
                        {
                          "bg-blue-50": active,
                          "!bg-blue-100 !text-blue-900": selected,
                          "text-gray-700": !active,
                        }
                      )}
                    >
                      {i.label}

                      {selected && multiple && (
                        <TbCheck
                          className={"h-4 w-4 flex-shrink-0 text-blue-500"}
                        />
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

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
}
