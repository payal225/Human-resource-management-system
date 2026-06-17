"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  type ColDef,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  baseSalary: number;
  bonus: number;
  totalSalary: number;
};

type DummyUser = {
  id: number;
  firstName: string;
  lastName: string;
  company: {
    title: string;
  };
};

type PayrollAction =
  | {
      type: "LOAD_EMPLOYEES";
      payload: Employee[];
    }
  | {
      type: "ADD_BONUS";
      payload: number;
    }
  | {
      type: "CALCULATE_SALARY";
      payload: number;
    }
  | {
      type: "RESET";
      payload: number;
    };

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
              bonus: emp.bonus + 5000,
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

  const {
    data: employeesFromApi = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async (): Promise<Employee[]> => {
      const response = await fetch("https://dummyjson.com/users");

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();

      return (data.users as DummyUser[]).map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.company.title,
        baseSalary: user.id * 30000,
        bonus: 0,
        totalSalary: user.id * 30000,
      }));
    },
  });

  useEffect(() => {
    if (employeesFromApi.length > 0) {
      dispatch({
        type: "LOAD_EMPLOYEES",
        payload: employeesFromApi,
      });
    }
  }, [employeesFromApi]);

  if (isLoading) {
    return <div className="p-8">Loading employees...</div>;
  }

  if (error) {
    return <div className="p-8">Error loading employees.</div>;
  }

  const columnDefs: ColDef<Employee>[] = [
    {
      headerName: "ID",
      field: "id",
      valueFormatter: (params) => `EMP${params.value}`,
    },
    {
      headerName: "First Name",
      field: "firstName",
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    {
      headerName: "Role",
      field: "role",
    },
    {
      headerName: "Base Salary",
      field: "baseSalary",
      valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      headerName: "Bonus",
      field: "bonus",
      valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      headerName: "Total Salary",
      field: "totalSalary",
      valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      headerName: "Actions",
      sortable: false,
      filter: false,
      cellRenderer: (params: { data: Employee }) => {
        const employee = params.data;

        return (
          <div className="flex gap-2 py-1">
            <button
              className="rounded bg-green-500 px-2 py-1 text-white"
              onClick={() =>
                dispatch({
                  type: "ADD_BONUS",
                  payload: employee.id,
                })
              }
            >
              Bonus
            </button>

            <button
              className="rounded bg-blue-500 px-2 py-1 text-white"
              onClick={() =>
                dispatch({
                  type: "CALCULATE_SALARY",
                  payload: employee.id,
                })
              }
            >
              Calculate
            </button>

            <button
              className="rounded bg-red-500 px-2 py-1 text-white"
              onClick={() =>
                dispatch({
                  type: "RESET",
                  payload: employee.id,
                })
              }
            >
              Reset
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        className="mx-auto max-w-7xl rounded-xl p-6 shadow-lg"
        style={{
          backgroundColor: "var(--card)",
        }}
      >
        <h1 className="mb-2 text-center text-3xl font-bold">
          Payroll Management
        </h1>

        <p className="mb-6 text-center opacity-70">
          Manage employee salaries using useReducer and TanStack Query.
        </p>

        <div
          className="ag-theme-alpine"
          style={{
            width: "100%",
            height: 600,
          }}
        >
          <AgGridReact<Employee>
            theme="legacy"
            rowData={employees}
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

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="rounded-lg bg-gray-800 px-6 py-3 text-white hover:bg-gray-900"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}