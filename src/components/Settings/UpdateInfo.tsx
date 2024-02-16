"use client";
import { Button, Dialog } from "common/ui";
import { useState } from "react";
import { UpdateInfoForm } from "./UpdateInfoForm";

export function UpdateInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Update Info</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <UpdateInfoForm close={() => setIsOpen(false)} />
      </Dialog>
    </>
  );
}
