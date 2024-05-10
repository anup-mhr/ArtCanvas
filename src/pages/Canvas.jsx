import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Tools from "@/components/Tools";

export default function Canvas() {
  const [type, setType] = useState("line");
  const [element, setElement] = useState(
    JSON.parse(localStorage.getItem("elements")) || []
  );
  const [selectedElement, setSelectedElement] = useState(null);
  const [shapesInitialPosition, setShapesInitialPosition] = useState(null);

  const [draw, setDraw] = useState(false);
  const [move, setMove] = useState(false);

  const [showTextarea, setShowTextarea] = useState(false);
  const [textareaPosition, setTextareaPosition] = useState({ x: 0, y: 0 });
  const textAreaRef = useRef(null);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctxRef.current = ctx;
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("elements", JSON.stringify(element));
  }, [element]);

  useEffect(() => {
    if (ctxRef.current) {
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      element.forEach((el) => {
        if (selectedElement && el === selectedElement && move) {
          ctx.beginPath();
          ctx.lineWidth = 4;
          ctx.strokeStyle = "blue";
        } else {
          ctx.beginPath();
          ctx.lineWidth = 3;
          ctx.moveTo(el.offsetX, el.offsetY);
          ctx.strokeStyle = el.stroke || "black";
        }
        if (el.type === "line" || el.type === "pencil") {
          el.path.forEach((point) => {
            ctx.lineTo(point[0], point[1]);
          });
          ctx.stroke();
        } else if (el.type === "rectangle") {
          const lastPoint = el.path[el.path.length - 1];
          ctx.rect(
            el.offsetX,
            el.offsetY,
            lastPoint[0] - el.offsetX,
            lastPoint[1] - el.offsetY
          );
          ctx.stroke();
        } else if (el.type === "circle") {
          const lastPoint = el.path[el.path.length - 1];
          const radius = Math.sqrt(
            Math.pow(lastPoint[0] - el.offsetX, 2) +
              Math.pow(lastPoint[1] - el.offsetY, 2)
          );
          ctx.beginPath();
          ctx.arc(el.offsetX, el.offsetY, radius, 0, 2 * Math.PI);
          ctx.stroke();
        } else if (el.type === "text") {
          ctx.font = "16px Arial";
          ctx.fillText(el.text, el.offsetX, el.offsetY);
        }
      });
    }
  }, [element, move, selectedElement]);

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (type === "text") {
      if (!showTextarea) {
        setShowTextarea(true);
        setTextareaPosition({ x: offsetX, y: offsetY });
      }
    }
    if (type === "select") {
      const clickedElement = element.find((el) => {
        if (el.type === "line" || el.type === "pencil") {
          return el.path.some(
            ([x, y]) => Math.abs(x - offsetX) <= 5 && Math.abs(y - offsetY) <= 5
          );
        }
        if (el.type === "rectangle") {
          const [x, y] = el.path[el.path.length - 1];
          return (
            offsetX >= el.offsetX &&
            offsetX <= x &&
            offsetY >= el.offsetY &&
            offsetY <= y
          );
        }
        if (el.type === "circle") {
          const [x, y] = el.path[el.path.length - 1];
          const radius = Math.sqrt(
            Math.pow(x - el.offsetX, 2) + Math.pow(y - el.offsetY, 2)
          );
          return (
            Math.sqrt(
              Math.pow(offsetX - el.offsetX, 2) +
                Math.pow(offsetY - el.offsetY, 2)
            ) <= radius
          );
        }
        if (el.type === "text") {
          return (
            offsetX >= el.offsetX &&
            offsetX <= el.offsetX + 100 &&
            offsetY >= el.offsetY &&
            offsetY <= el.offsetY + 20
          );
        }
        return false;
      });

      if (clickedElement) {
        setMove(true);
        setSelectedElement(clickedElement);
        setShapesInitialPosition({ x: offsetX, y: offsetY }); // Set initial position here
      } else {
        setMove(false);
        setSelectedElement(null);
      }
    }

    if (type !== "select" && type !== "text") {
      setElement((prev) => [
        ...prev,
        { type: type, offsetX, offsetY, path: [[offsetX, offsetY]], text: "" },
      ]);
      setDraw(true);
    }
  };

  const handleMouseUp = () => {
    setDraw(false);
    setMove(false);
  };

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    // while  drawing
    if (draw) {
      setElement((prev) => {
        const newElements = [...prev];
        const lastElement = newElements[newElements.length - 1];
        let newPath;
        if (type === "line") {
          newPath = [
            [lastElement.offsetX, lastElement.offsetY],
            [offsetX, offsetY],
          ];
        } else {
          newPath = [...lastElement.path, [offsetX, offsetY]];
        }
        newElements[newElements.length - 1] = { ...lastElement, path: newPath };
        return newElements;
      });
    }
    // while moving
    if (move) {
      let movingElement = element.find((el) => el === selectedElement);
      const deltaX = offsetX - shapesInitialPosition.x;
      const deltaY = offsetY - shapesInitialPosition.y;

      movingElement = {
        ...movingElement,
        offsetX: movingElement.offsetX + deltaX,
        offsetY: movingElement.offsetY + deltaY,
        path: movingElement.path.map(([x, y]) => [x + deltaX, y + deltaY]),
      };

      const updatedElements = element.map((el) =>
        el === selectedElement ? movingElement : el
      );

      // Update state with the new array of elements
      setElement(updatedElements);
      setSelectedElement(movingElement);
      setShapesInitialPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleClearCanvas = () => {
    setElement([]);
    localStorage.removeItem("elements");
  };

  const handleTextareaBlur = () => {
    if (type === "text") {
      const text = textAreaRef.current?.value;
      if (text) {
        setElement((prev) => [
          ...prev,
          {
            type: "text",
            offsetX: textareaPosition.x,
            offsetY: textareaPosition.y,
            path: [[textareaPosition.x, textareaPosition.y]],
            text,
          },
        ]);
      }
    }
    setShowTextarea(false);
  };

  const deleteElement = () => {
    if (!selectedElement) return;
    setElement((prev) => prev.filter((el) => el !== selectedElement));
  };

  function saveCanvas() {
    const date = new Date();
    const canvasSave = canvasRef.current.toDataURL("image/png");
    // const canvasSave = canvasRef.current.toDataURL("image/webp", 0.2);   USE THIS FOR PREVIEW iMG
    var a = document.createElement("a");
    console.log("dataurl", canvasSave);
    a.href = canvasSave;
    a.download = `image-${date.getTime()}.png`;
    a.click();
  }

  return (
    <>
      <Tools
        type={type}
        setType={setType}
        clearCanvas={handleClearCanvas}
        deleteElement={deleteElement}
        saveCanvas={saveCanvas}
      />
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {showTextarea && (
        <div
          className="textarea-container"
          style={{
            position: "absolute",
            left: textareaPosition.x,
            top: textareaPosition.y,
          }}
        >
          <Textarea
            className="border-none"
            ref={textAreaRef}
            placeholder="Type your text here..."
            onBlur={handleTextareaBlur}
          />
        </div>
      )}
    </>
  );
}
