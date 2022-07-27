import { useState } from "react";
import * as C from "../styles/PhotoItem.styles";

import { CloseItem } from "./CloseItem";

type Props = {
  url: string;
  name: string;
};

export const PhotoItem = ({ url, name }: Props) => {
  return (
    <>
      <C.Container>
        <CloseItem name={name} />
        <img src={url} alt={name} />
        {name}
      </C.Container>
    </>
  );
};
