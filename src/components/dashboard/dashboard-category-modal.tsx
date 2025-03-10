import { Modal } from "../modal/modal";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export type DashboardCategoryModalProps = {
  open: boolean;
  CloseModal: () => void;
  categoryId: string;
  isEditMode: boolean;
};
