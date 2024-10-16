import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import Link from "next/link";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockDemo() {
  return (
    <div className="relative">
      <Dock direction="middle">
        <DockIcon>
          <Link href="/">
            <Icons.home className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href="/dashboard">
            <Icons.dashboard className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href="/dashboard/history">
            <Icons.history className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href="/dashboard/settings">
            <Icons.settings className="size-6" />
          </Link>
        </DockIcon>
      </Dock>
    </div>
  );
}

const Icons = {
  home: (props: IconProps) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M32 12L2 34h7v22h18V44h10v12h18V34h7L32 12z"
      />
    </svg>
  ),
  dashboard: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M3 13h8V3H3v10zm10 8h8v-6h-8v6zm0-8h8V3h-8v10zm-10 8h8v-4H3v4z"
      />
    </svg>
  ),
  history: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M13 3a9 9 0 00-9 9H1l3.89 3.89.08.14L9 12H5a7 7 0 117 7c-2.78 0-5.15-1.64-6.24-4h-2.2c1.24 3.5 4.53 6 8.44 6a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
      />
    </svg>
  ),
  settings: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6a2 2 0 012 2v.81c.41.15.81.34 1.18.57l.58-.58a2 2 0 112.83 2.83l-.58.58c.23.37.42.77.57 1.18H20a2 2 0 110 4h-.81c-.15.41-.34.81-.57 1.18l.58.58a2 2 0 11-2.83 2.83l-.58-.58c-.37.23-.77.42-1.18.57V20a2 2 0 11-4 0v-.81a6.016 6.016 0 01-1.18-.57l-.58.58a2 2 0 11-2.83-2.83l.58-.58c-.23-.37-.42-.77-.57-1.18H4a2 2 0 110-4h.81c.15-.41.34-.81.57-1.18l-.58-.58a2 2 0 112.83-2.83l.58.58c.37-.23.77-.42 1.18-.57V4a2 2 0 012-2z"
      />
    </svg>
  ),
};
