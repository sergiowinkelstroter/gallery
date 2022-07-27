import { X } from "phosphor-react";
import * as C from "../styles/CloseItem.styles";
import * as Photos from "../services/photos";

type Props = {
  name: string;
};

export const CloseItem = ({ name }: Props) => {
  const onClose = async () => {
    await Photos.deleteFile(name);
    window.location.reload();
  };
  return (
    <C.Close>
      <a onClick={onClose}>
        <X size={20} />
      </a>
    </C.Close>
  );
};
