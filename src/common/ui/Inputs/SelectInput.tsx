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
    <div className={"flex flex-col gap-y-1"}>
      {label && (
        <label
          className={twMerge(
            "text-sm font-medium text-gray-500",
            className?.label,
          )}
        >
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} multiple={multiple}>
        <div className={"relative min-w-[160px]"}>
          <Listbox.Button
            className={
              "flex w-full items-center rounded border border-gray-200 bg-white"
            }
          >
            <span className={"flex-1 px-4 py-3"}>{displayValue}</span>

            <div className={"px-4"}>
              <TbChevronDown
                aria-hidden
                className={"h-4 w-4 select-none text-gray-400"}
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
                          "bg-gray-25": active,
                          "!bg-mediumBlue-50 !text-mediumBlue-900": selected,
                          "text-gray-900": !active,
                        },
                      )}
                    >
                      {i.label}

                      {selected && multiple && (
                        <TbCheck
                          className={
                            "h-4 w-4 flex-shrink-0 text-mediumBlue-500"
                          }
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
