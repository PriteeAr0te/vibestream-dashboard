import React from "react";

export default function Slider({ value, onChange, min = 0, max = 10 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-48"
      />
      <div className="text-sm w-10 text-right">{value}s</div>
    </div>
  );
}
