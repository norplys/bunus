import { useState } from "react";

type Modal = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export function useModal(): Modal {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { open, openModal, closeModal };
}
