import { Button, Dialog } from "common/ui";

type ModalDeleteCategoryProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function ModalDeleteCategory({
  onDelete,
  onClose,
  open,
}: ModalDeleteCategoryProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={"p-6"}>
        <p className={"py-6 text-center text-2xl"}>
          Do you really want to delete this category?
        </p>
        <div className={"flex justify-center items-center gap-4 md:gap-6"}>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorVariant={"danger"} onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
