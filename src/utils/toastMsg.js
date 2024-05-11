import { toast } from "sonner";
import getDateTime from "./getDateTime";

export default function toastMsg(msg, icon = "👏") {
  return toast(msg, {
    icon,
    description: getDateTime(),
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
}
