"use client";
import { Button, Dialog } from "common/ui";
import { AdminForm } from "components/Settings/AdminForm";
import { useState } from "react";

export function AddNewAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button colorVariant={"danger"} onClick={() => setIsOpen(true)}>
        Add new admin
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <AdminForm close={() => setIsOpen(false)} />
      </Dialog>
    </>
  );
}
