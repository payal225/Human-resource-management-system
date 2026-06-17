"use client";

import Link from "next/link";
import {
  attendanceData,
  type AttendanceRecord,
} from "@/app/data/attendance";

import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  type ColDef,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const columnDefs: ColDef<AttendanceRecord>[] = [
  {
    headerName: "Employee ID",
    field: "id",
    valueFormatter: (params) => `EMP${params.value}`,
  },
  {
    headerName: "Employee",
    field: "employeeName",
  },
  {
    headerName: "Department",
    field: "department",
  },
  {
    headerName: "Check In",
    field: "CheckIn",
  },
  {
    headerName: "Status",
    field: "status",
    cellRenderer: (params: { value: string }) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          params.value === "Present"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {params.value}
      </span>
    ),
  },
];

export default function AttendancePage() {
  const presentCount = attendanceData.filter(
    (emp) => emp.status === "Present"
  ).length;

  const absentCount = attendanceData.filter(
    (emp) => emp.status === "Absent"
  ).length;

  const attendanceRate = Math.round(
    (presentCount / attendanceData.length) * 100
  );

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="rounded-2xl shadow-lg p-6 mb-8"
          style={{
            backgroundColor: "var(--card)",
          }}
        >
          <h1 className="text-4xl font-bold text-center">
            Attendance Management
          </h1>

          <p className="text-center mt-2 opacity-70">
            Track employee attendance and working hours
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg">Present Today</h2>
            <p className="text-3xl font-bold">{presentCount}</p>
          </div>

          <div className="bg-red-500 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg">Absent Today</h2>
            <p className="text-3xl font-bold">{absentCount}</p>
          </div>

          <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg">Attendance Rate</h2>
            <p className="text-3xl font-bold">{attendanceRate}%</p>
          </div>
        </div>

        {/* AG Grid */}
        <div
          className="ag-theme-alpine rounded-xl overflow-hidden shadow-lg"
          style={{
            height: 500,
            width: "100%",
          }}
        >
          <AgGridReact<AttendanceRecord>
            theme="legacy"
            rowData={attendanceData}
            columnDefs={columnDefs}
            pagination
            paginationPageSize={10}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
              flex: 1,
            }}
          />
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}