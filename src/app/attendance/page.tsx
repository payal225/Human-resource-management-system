import Link from "next/link";
import { attendanceData, type AttendanceRecord } from "@/app/data/attendance";


export default function AttendancePage() {
  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-6xl mx-auto">
      
        <div
          className="rounded-2xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: "var(--card)" }}
        >
          <h1 className="text-4xl font-bold text-center">
            Attendance Management
          </h1>

          <p className="text-center mt-2 opacity-70">
            Track employee attendance and working hours
          </p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Present Today</h2>
            <p className="text-3xl font-bold">3</p>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Absent Today</h2>
            <p className="text-3xl font-bold">1</p>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Attendance Rate</h2>
            <p className="text-3xl font-bold">75%</p>
          </div>
        </div>

       
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
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Check In</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((employee: AttendanceRecord) => (
                <tr
                  key={employee.id}
                  style={{
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <td className="p-4">EMP{employee.id}</td>
                  <td className="p-4">{employee.employeeName}</td>
                  <td className="p-4">{employee.department}</td>
                  <td className="p-4">{employee.CheckIn}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        employee.status === "Present"
                          ? "bg-green-100 text-green-700"
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
        </div>

        <div className="mt-8 flex justify-center gap-4">
          

          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}