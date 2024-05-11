/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PreviewImg({ canvasData }) {
  const { id, img } = canvasData;
  return (
    <Link to={`/canvas/${id}`}>
      <img
        src={img}
        alt="canvas"
        className="h-full w-full object-cover cursor-pointer"
      />
    </Link>
  );
}
