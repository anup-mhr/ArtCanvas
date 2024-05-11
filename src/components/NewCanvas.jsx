import { addCanvas } from "@/services/canvas.service";
import { addImages } from "@/services/canvasImg.service";
import toastMsg from "@/utils/toastMsg";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NewCanvas() {
  const navigate = useNavigate();
  const createNewCanvas = async () => {
    try {
      const id = uuidv4();
      localStorage.setItem("canvasID", id);
      const data = { id, element: [] };
      addCanvas(data);
      await addImages({ id, img: " " });
      navigate(`/canvas/${id}`);
    } catch (error) {
      toastMsg(error.message, "☠");
    }
  };
  return (
    <div
      className="border-2 min-h-60 min-w-56 rounded-md relative"
      onClick={createNewCanvas}
    >
      <Plus
        size={60}
        strokeWidth={1}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:size-[70px] transition-all"
      />
    </div>
  );
}
