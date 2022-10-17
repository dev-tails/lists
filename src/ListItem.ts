import { Colors } from "./Colors";
import { Block, updateBlock } from "./db/db";
import { setStyle } from "./setStyle";

type ListItemProps = {
  block: Block;
};

export const ListItem = ({ block }: ListItemProps) => {
  let checked = block.data?.checked;

  const el = document.createElement("div");
  setStyle(el, {
    display: "flex",
    borderTop: `1px solid ${Colors.BG_LIGHT}`,
    padding: "8px",
    userSelect: "none"
  });

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  setStyle(checkbox, {});
  el.append(checkbox);

  el.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    checked = !checked;
    checkbox.checked = checked;
    updateBlock({
      ...block,
      data: {
        checked
      }
    })
  })

  const bodyText = document.createElement("div");
  setStyle(bodyText, {
    marginLeft: "8px"
  });
  bodyText.innerText = block.body;
  el.append(bodyText);

  return el;
};
