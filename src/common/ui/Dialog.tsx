import { Dialog as HuiDialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TbX } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { ButtonBase } from ".";

export type DialogProps = {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: {
    overlay?: string;
    content?: string;
  };
};

export function Dialog(props: DialogProps) {
  const {
    open = false,
    onClose = () => {
      console.warn("Close dialog not implemented");
    },
    children,
    className = {},
  } = props;
  const { overlay: overlayClassName = "", content: contentClassName = "" } =
    className;

  return (
    <Transition appear show={open} as={Fragment}>
      <HuiDialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={"ease-out duration-300"}
          enterFrom={"opacity-0"}
          enterTo={"opacity-100"}
          leave={"ease-in duration-200"}
          leaveFrom={"opacity-100"}
          leaveTo={"opacity-0"}
        >
          <div
            className={twMerge(
              "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm",
              overlayClassName
            )}
            aria-hidden
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter={"ease-out duration-300"}
          enterFrom={"opacity-0 scale-95"}
          enterTo={"opacity-100 scale-100"}
          leave={"ease-in duration-200"}
          leaveFrom={"opacity-100 scale-100"}
          leaveTo={"opacity-0 scale-95"}
        >
          <HuiDialog.Panel
            className={twMerge(
              `fixed left-1/2 top-1/2 z-40 max-h-full w-full max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-visible overflow-x-hidden p-4`,
              contentClassName
            )}
          >
            <div className={"relative rounded-xl bg-white shadow-md"}>
              <ButtonBase
                className={{
                  button: "absolute right-4 top-3 z-50 group",
                }}
                onClick={onClose}
              >
                <TbX
                  className={
                    "text-black group-hover:text-blue-700 transition-colors"
                  }
                />
              </ButtonBase>

              {children}
            </div>
          </HuiDialog.Panel>
        </Transition.Child>
      </HuiDialog>
    </Transition>
  );
}
