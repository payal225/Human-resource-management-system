"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Sidebar() {
  const isOpen = useSelector(
    (state: RootState) => state.sidebar.isOpen
  );

  if (!isOpen) return null;

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-slate-900 p-5 text-white shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        HR Dashboard
      </h2>

      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/">🏠 Dashboard</Link>
          </li>

          <li>
            <Link href="/employees">👥 Employees</Link>
          </li>

          <li>
            <Link href="/leaves">🏖️ Leave</Link>
          </li>

          <li>
            <Link href="/salary">💰 Payroll</Link>
          </li>

          <li>
            <Link href="/attendance">🕒 Attendance</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}