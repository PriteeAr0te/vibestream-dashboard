import React from "react";

export default function SettingsRow({ children, title, subtitle }: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-br">
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{title}</div>
        {subtitle && <div className="text-xs text-para mt-1">{subtitle}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
