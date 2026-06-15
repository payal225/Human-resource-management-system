"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  baseSalary: number;
  bonus: number;
  totalSalary: number;
};

type PayrollAction =
  | { type: "LOAD_EMPLOYEES"; payload: Employee[] }
  | { type: "ADD_BONUS"; payload: number }
  | { type: "CALCULATE_SALARY"; payload: number }
  | { type: "RESET"; payload: number };

function payrollReducer(
  state: Employee[],
  action: PayrollAction
): Employee[] {
  switch (action.type) {
    case "LOAD_EMPLOYEES":
      return action.payload;

    case "ADD_BONUS":
      return state.map((emp) =>
        emp.id === action.payload
          ? {
              ...emp,
              bonus: 5000,
            }
          : emp
      );

    case "CALCULATE_SALARY":
      return state.map((emp) =>
        emp.id === action.payload
          ? {
              ...emp,
              totalSalary: emp.baseSalary + emp.bonus,
            }
          : emp
      );

    case "RESET":
      return state.map((emp) =>
        emp.id === action.payload
          ? {
              ...emp,
              bonus: 0,
              totalSalary: emp.baseSalary,
            }
          : emp
      );

    default:
      return state;
  }
}

export default function SalaryPage() {
  const [employees, dispatch] = useReducer(payrollReducer, []);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

        const formattedEmployees: Employee[] = data.users.map(
          (user: any) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.company.title,
            baseSalary: user.id * 10000,
            bonus: 0,
            totalSalary: user.id * 10000,
          })
        );

        dispatch({
          type: "LOAD_EMPLOYEES",
          payload: formattedEmployees,
        });
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Payroll Management
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Manage employee salaries using useReducer
        </p>

        <table className="w-full border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Employee ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Base Salary</th>
              <th className="p-3">Bonus</th>
              <th className="p-3">Total Salary</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="text-center border-b border-gray-200"
              >
                <td className="p-3">EMP{employee.id}</td>

                <td className="p-3">
                  {employee.firstName} {employee.lastName}
                </td>

                <td className="p-3">{employee.role}</td>

                <td className="p-3">
                  ₹{employee.baseSalary.toLocaleString()}
                </td>

                <td className="p-3 text-green-600 font-medium">
                  ₹{employee.bonus.toLocaleString()}
                </td>

                <td className="p-3 font-bold text-blue-700">
                  ₹{employee.totalSalary.toLocaleString()}
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "ADD_BONUS",
                        payload: employee.id,
                      })
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Add Bonus
                  </button>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "CALCULATE_SALARY",
                        payload: employee.id,
                      })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Calculate
                  </button>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "RESET",
                        payload: employee.id,
                      })
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reset
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}