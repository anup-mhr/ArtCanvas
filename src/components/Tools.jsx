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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => saveCanvas()}
                >
                  <Download />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setType("select")}
                >
                  <Hand />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Move</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="horizontal" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setType("rectangle")}
                >
                  <RectangleHorizontal />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rectangle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setType("line")}
                >
                  <Minus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Line</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setType("text")}
                >
                  <WholeWord />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Text</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setType("pencil")}
                >
                  <PencilLine />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pencil</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setType("circle")}
                >
                  <Circle />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Circle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="horizontal" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteElement()}
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Selected Element</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => clearCanvas()}
                >
                  <Recycle />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear Canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="text-center bg-gray-100 rounded-lg">
        You are using <span className="font-bold text-purple-500">{type}</span>
      </div>
    </>
  );
}
