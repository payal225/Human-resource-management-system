'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type LeaveData = {
  id: number;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
};

export default function LeavePage() {
  const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaveData() {
      try {
        const response = await fetch("/leaves.json");

        if (!response.ok) {
        throw  new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
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

      {/* Stats */}
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
          <p className="text-sm opacity-70">Current Month</p>
          <h2 className="text-3xl font-bold mt-2">June</h2>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-xl border shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {loading ? (
          <div className="p-8 text-center">Loading leave records...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Employee</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Leave Type</th>
                <th className="text-left p-4">Duration</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {leaveData.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-4">EMP{employee.id}</td>

                  <td className="p-4 font-medium">
                    {employee.employeeName}
                  </td>

                  <td className="p-4">{employee.department}</td>

                  <td className="p-4">{employee.leaveType}</td>

                  <td className="p-4">
                    {employee.startDate} → {employee.endDate}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : employee.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
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