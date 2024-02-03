import { CategoryType } from "data-fetchers/categories";
import { Fragment } from "react";
import EditCategoryForm from "./EditCategoryForm";
import { Transition, Dialog } from "@headlessui/react";

type ModalEditCategoryProps = {
  isOpen: boolean;
  onClose: () => void;
  data: CategoryType;
};
export default function ModalEditCategory({
  data,
  isOpen,
  onClose,
}: ModalEditCategoryProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="min-w-full sm:min-w-[580px] transform rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                <EditCategoryForm categoryEdit={data} onClose={onClose} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
