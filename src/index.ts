import { Colors } from "./Colors";
import { addBlock, getAllBlocks } from "./db/db";
import { ListItem } from "./ListItem";
import { setStyle } from "./setStyle";

async function init() {
  let serviceWorkerRegistration: ServiceWorkerRegistration;
  if ("serviceWorker" in navigator) {
    serviceWorkerRegistration = await navigator.serviceWorker.register("serviceworker.js");
  }

  const root = document.createElement("div");
  document.body.append(root);

  setStyle(document.body, {
    backgroundColor: Colors.BG_DARK,
    color: Colors.TEXT,
    margin: "0",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  })

  const list = document.createElement("div");
  setStyle(list, {
    height: "calc(100vh - 46px)",
    overflowY: "scroll",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column-reverse",
    maxWidth: "800px",
    width: "100%",
    margin: "0 auto"
  });
  root.append(list);

  const blocks = await getAllBlocks();
  for (const block of blocks) {
    const listItem = ListItem({ block });
    list.append(listItem);
  }

  const footer = document.createElement("div");
  setStyle(footer, {
    backgroundColor: Colors.BG_LIGHT,
    padding: "8px"
  })
  root.append(footer);

  const input = document.createElement("input");
  setStyle(input, {
    display: "block",
    width: "100%",
    maxWidth: "800px",
    height: "30px",
    margin: "0 auto",
    padding: "0",
    backgroundColor: Colors.BG_LIGHT,
    outline: "none",
    border: "none",
    borderBottom: "1px solid white",
    borderRadius: "0",
    color: Colors.TEXT,
    fontSize: "1em"
  });
  footer.append(input);

  document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      if (!input.value) {
        list.innerHTML = "";
      } else if (!e.shiftKey) {
        const value = input.value;
        input.value = "";

        if (value === "/refresh") {
          await caches.delete("lists-v1");
          if (serviceWorkerRegistration) {
            await serviceWorkerRegistration.unregister();
          }
          window.location.reload();
          return;
        }

        const block = await addBlock({
          body: value,
        });

        const blockListItem = ListItem({ block });
        blockListItem.scrollIntoView();
        list.prepend(blockListItem);
      }
    }
  });
}

init();
