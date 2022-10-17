import { Colors } from "./Colors";
import { Block } from "./db/db";
import { setStyle } from "./setStyle";

type ListItemProps = {
  block: Block;
};

export const ListItem = ({ block }: ListItemProps) => {
  const el = document.createElement("div");

  setStyle(el, {
    borderTop: `1px solid ${Colors.BG_LIGHT}`,
    padding: "8px"
  })

  el.innerText = block.body;

  return el;
};
