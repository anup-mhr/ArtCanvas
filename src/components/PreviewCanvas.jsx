/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteImages } from "@/services/canvasImg.service";
import { deleteCanvas } from "@/services/canvas.service";
import toastMsg from "@/utils/toastMsg";

export default function PreviewCanvas({ canvasData, setData }) {
  const { id, img } = canvasData;
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
      <Link to={`/canvas/${id}`}>
        <img
          src={img}
          alt="canvas"
          className="h-full w-full object-cover cursor-pointer"
        />
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild className="absolute bottom-5 right-5">
          <Button variant="outline" size="icon" className="text-red-700">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              canvas and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
