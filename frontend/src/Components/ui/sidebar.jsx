import React from "react";

export function Sidebar({ children }) {
  return <div className="w-64 bg-gray-100">{children}</div>;
}
export function SidebarContent({ children }) {
  return <div>{children}</div>;
}
export function SidebarGroup({ children }) {
  return <div>{children}</div>;
}
export function SidebarGroupContent({ children }) {
  return <div>{children}</div>;
}
export function SidebarMenu({ children }) {
  return <ul>{children}</ul>;
}
export function SidebarMenuItem({ children }) {
  return <li className="p-2">{children}</li>;
}
