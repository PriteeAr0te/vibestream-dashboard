"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "./sidebarMenu";
import Image from "next/image"
import Favicon from '../../public/img/favicon.png'
import Link from "next/link"

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-3"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        ></div>
      )}

      <aside
        className={`
          fixed md:static top-0 bottom-0 left-0 h-screen overflow-hidden w-64 bg-sidebar border-r border-br
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="text-xl font-semibold text-foreground">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          <div className="flex justify-start items-center gap-2 mb-6">
            <Link href='/' className="flex gap-2 items-center">
              <Image
                src={Favicon}
                alt="Vibestream"
                width={48}
                height={48} />
              <span className="hidden sm:block text-foreground text-lg font-medium">
                Vibestream
              </span>
            </Link>
          </div>
          {sidebarMenu.map(item => (
            <SidebarItem
              key={item.path}
              label={item.label}
              icon={item.icon}
              path={item.path}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
