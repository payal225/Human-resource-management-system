"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  type ColDef,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

type LeaveData = {
  id: number;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
};

const columnDefs: ColDef<LeaveData>[] = [
  {
    headerName: "Employee ID",
    field: "id",
    valueFormatter: (params) => `EMP${params.value}`,
  },
  {
    headerName: "Employee Name",
    field: "employeeName",
  },
  {
    headerName: "Department",
    field: "department",
  },
  {
    headerName: "Leave Type",
    field: "leaveType",
  },
  {
    headerName: "Start Date",
    field: "startDate",
  },
  {
    headerName: "End Date",
    field: "endDate",
  },
  {
    headerName: "Status",
    field: "status",
  },
];

export default function LeavePage() {
  const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaveData() {
      try {
        const response = await fetch("/leaves.json");

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: LeaveData[] = await response.json();
        setLeaveData(data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaveData();
  }, []);

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="rounded-xl border shadow-sm p-6 mb-8"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <h1 className="text-3xl font-bold">Leave Management</h1>
          <p className="mt-2 opacity-70">
            Manage employee leave requests and approvals.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <p className="text-sm opacity-70">Total Leave Records</p>
            <h2 className="text-3xl font-bold mt-2">{leaveData.length}</h2>
          </div>

          <div
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <p className="text-sm opacity-70">Current Status</p>
            <h2 className="text-3xl font-bold mt-2">
              {loading ? "Loading..." : "Ready"}
            </h2>
          </div>
        </div>

        {/* AG Grid */}
        <div
          className="ag-theme-quartz rounded-xl overflow-hidden"
          style={{ width: "100%", height: "500px" }}
        >
          <AgGridReact<LeaveData>
            theme="legacy"
            rowData={leaveData}
            columnDefs={columnDefs}
            loading={loading}
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
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}