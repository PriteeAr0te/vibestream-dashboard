import React from "react";

export default function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void; }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
        checked ? "bg-emerald-400" : "bg-emerald-800"
      }`}
    >
      <span className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}
