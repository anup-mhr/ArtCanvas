/* eslint-disable react/prop-types */
import { deleteImages } from "@/services/canvasImg.service";
import { deleteCanvas } from "@/services/canvas.service";
import toastMsg from "@/utils/toastMsg";
import DeleteButton from "./DeleteButton";
import PreviewImg from "./PreviewImg";

export default function PreviewCanvas({ canvasData, setData }) {
  const handleDelete = (canvas_id) => {
    try {
      deleteCanvas(canvas_id);
      deleteImages(canvas_id);
      setData((prev) => prev.filter((canvas) => canvas.id !== canvas_id));
      toastMsg("Canvas deleted successfully", "✅");
    } catch (error) {
      toastMsg(error.message, "☠");
    }
  };

  return (
    <div className="border-2 min-h-60 h-full w-full min-w-56 rounded-md relative">
      <PreviewImg canvasData={canvasData} />
      <DeleteButton id={canvasData.id} handleDelete={handleDelete} />
    </div>
  );
}
