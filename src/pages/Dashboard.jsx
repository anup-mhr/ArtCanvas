import NewCanvas from "@/components/NewCanvas";
import PreviewCanvas from "@/components/PreviewCanvas";
import { getAllImagesByUser } from "@/services/canvasImg.service";
import toastMsg from "@/utils/toastMsg";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getAllImagesByUser(userId)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        toastMsg(error.message, "☠");
      });
  }, []);

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <NewCanvas />
        {data.map((canvas) => (
          <PreviewCanvas
            key={canvas.id}
            canvasData={canvas}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
}
