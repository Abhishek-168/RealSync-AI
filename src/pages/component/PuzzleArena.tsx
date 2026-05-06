import { useState, useRef, useEffect } from "react";

type PieceId =
  | "rect1"
  | "rect2"
  | "rect3"
  | "rect4"
  | "rect5"
  | "rect6";

type Position = { x: number; y: number };

export default function PuzzleArena() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [positions, setPositions] = useState<Record<PieceId, Position>>({
    rect1: { x: 120, y: 10 },
    rect3: { x: 300, y: 30 },
    rect2: { x: 480, y: 10 },
    rect4: { x: 200, y: 170 },
    rect5: { x: 380, y: 180 },
    rect6: { x: 300, y: 310 },
  });

  const activeId = useRef<PieceId | null>(null);
  const offset = useRef({ x: 0, y: 0 });


  const handlePointerDown = (e: React.PointerEvent, id: PieceId) => {
    if (!containerRef.current) return;

    activeId.current = id;

    const rect = containerRef.current.getBoundingClientRect();

    offset.current = {
      x: e.clientX - rect.left - positions[id].x,
      y: e.clientY - rect.top - positions[id].y,
    };
  };


  const handlePointerMove = (e: PointerEvent) => {
    if (!activeId.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const id = activeId.current;

    setPositions((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left - offset.current.x,
        y: e.clientY - rect.top - offset.current.y,
      },
    }));
  };


  const handlePointerUp = () => {
    activeId.current = null;
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const pieces: {
    id: PieceId;
    src: string;
    className: string;
  }[] = [
    { id: "rect1", src: "/images/rect1.png", className: "w-50" },
    { id: "rect2", src: "/images/rect2.png", className: "w-50" },
    { id: "rect3", src: "/images/rect3.png", className: "w-50" },
    { id: "rect4", src: "/images/rect4.png", className: "w-50" },
    { id: "rect5", src: "/images/rect5.png", className: "w-50" },
    { id: "rect6", src: "/images/rect6.png", className: "w-50" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-lg touch-none"
    >
      {pieces.map((p) => (
        <img
          key={p.id}
          id={p.id}
          src={p.src}
          alt=""
          draggable={false}
          onPointerDown={(e) => handlePointerDown(e, p.id)}
          className={`absolute cursor-grab active:cursor-grabbing select-none ${
            activeId.current === p.id ? "z-50" : "z-10"
          } ${p.className}`}
          style={{
            transform: `translate(${positions[p.id].x}px, ${positions[p.id].y}px)`,
          }}
        />
      ))}
    </div>
  );
}