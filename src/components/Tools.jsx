/* eslint-disable react/prop-types */
import {
  Circle,
  Download,
  Hand,
  Minus,
  PencilLine,
  RectangleHorizontal,
  Recycle,
  Trash2,
  WholeWord,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";

export default function Tools({
  type,
  setType,
  clearCanvas,
  deleteElement,
  saveCanvas,
}) {
  return (
    <>
      <div className="absolute top-10 left-5">
        <div className="flex  flex-col space-y-4 border-2 p-2 rounded-lg shadow-md">
          <Button variant="outline" size="icon" onClick={() => saveCanvas()}>
            <Download />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setType("select")}
          >
            <Hand />
          </Button>

          <Separator orientation="horizontal" />

          <Button
            variant="outline"
            size="icon"
            onClick={() => setType("rectangle")}
          >
            <RectangleHorizontal />
          </Button>

          <Button variant="outline" size="icon" onClick={() => setType("line")}>
            <Minus />
          </Button>

          <Button variant="outline" size="icon" onClick={() => setType("text")}>
            <WholeWord />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setType("pencil")}
          >
            <PencilLine />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setType("circle")}
          >
            <Circle />
          </Button>

          <Separator orientation="horizontal" />
          <Button variant="outline" size="icon" onClick={() => deleteElement()}>
            <Trash2 />
          </Button>
          <Button variant="outline" size="icon" onClick={() => clearCanvas()}>
            <Recycle />
          </Button>
        </div>
      </div>
      <div className="text-center bg-gray-100 rounded-lg">
        You are using <span className="font-bold text-purple-500">{type}</span>
      </div>
    </>
  );
}
