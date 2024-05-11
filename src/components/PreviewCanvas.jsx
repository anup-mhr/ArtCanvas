/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function PreviewCanvas({ canvas_id, imgData }) {
  return (
    <Link to={`/canvas/${canvas_id}`}>
      <div className="border-2 min-h-60 h-full w-full min-w-56 rounded-md relative">
        <img
          src={imgData}
          alt="canvas"
          className="h-full w-full object-cover cursor-pointer"
        />
        <Trash2 className="absolute bottom-5 right-5 text-red-700" />
      </div>
    </Link>
  );
}
