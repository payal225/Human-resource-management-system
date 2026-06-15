'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  company: {
    title: string;
  };
};

export default function SalaryPage() {
  const [salaryData, setSalaryData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        setSalaryData(data.users);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="rounded-2xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: "var(--card)" }}
        >
          <h1 className="text-4xl font-bold text-center">
            Payroll Management
          </h1>

          <p className="text-center mt-2 opacity-70">
            View and manage employee salary information
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <div
            className="rounded-2xl shadow-lg overflow-hidden"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-4 text-left">Employee ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Salary</th>
                </tr>
              </thead>

              <tbody>
                {salaryData.map((employee) => (
                  <tr
                    key={employee.id}
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <td className="p-4">EMP{employee.id}</td>
                    <td className="p-4">{employee.firstName}</td>
                    <td className="p-4">{employee.company.title}</td>
                    <td className="p-4 font-semibold text-green-600">
                      ₹{employee.id * 10000}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}