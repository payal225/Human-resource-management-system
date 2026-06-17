"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { useTheme } from "next-themes";
import {
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type User = {
  id: number;
  firstName: string;
  email: string;
};

type ApiResponse = {
  users: User[];
};

export default function EmployeesPage() {
  const { resolvedTheme } = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://dummyjson.com/users"
        );

        const data: ApiResponse = await response.json();

        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.firstName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const addEmployee = () => {
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser: User = {
      id: Date.now(),
      firstName: newName,
      email: newEmail,
    };

    setUsers((prev) => [...prev, newUser]);

    setNewName("");
    setNewEmail("");
  };

  const deleteEmployee = (id: number) => {
    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  const columnDefs: ColDef<User>[] = useMemo(
    () => [
      {
        headerName: "ID",
        field: "id",
        width: 100,
      },
      {
        headerName: "Name",
        field: "firstName",
        flex: 1,
      },
      {
        headerName: "Email",
        field: "email",
        flex: 1.5,
      },
      {
        headerName: "Actions",
        sortable: false,
        filter: false,
        flex: 2,

        cellRenderer: (
          params: ICellRendererParams<User>
        ) => {
          const user = params.data;

          if (!user) return null;

          return (
            <div className="flex gap-2 items-center h-full">
              <Link
                href={`/employee/${user.id}`}
                className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
              >
                View
              </Link>

              <button
                onClick={() =>
                  deleteEmployee(user.id)
                }
                className="px-3 py-1 rounded bg-red-600 text-white text-sm"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setEditingUser(user);
                  setEditName(user.firstName);
                  setEditEmail(user.email);
                }}
                className="px-3 py-1 rounded bg-yellow-500 text-white text-sm"
              >
                Update
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-xl border bg-card p-6 mb-6">
          <h1 className="text-4xl font-bold">
            Employees Directory
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage employee information
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-lg p-3 bg-background"
          />
        </div>

        {/* Add Employee */}
        <div className="mb-6 rounded-xl border bg-card p-4 space-y-3">
          <input
            type="text"
            placeholder="Employee Name"
            value={newName}
            onChange={(e) =>
              setNewName(e.target.value)
            }
            className="w-full border rounded-lg p-3 bg-background"
          />

          <input
            type="email"
            placeholder="Employee Email"
            value={newEmail}
            onChange={(e) =>
              setNewEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3 bg-background"
          />

          <button
            onClick={addEmployee}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Employee
          </button>
        </div>

        {/* AG Grid */}
        {loading ? (
          <p className="text-center text-lg">
            Loading employees...
          </p>
        ) : (
          <div
            className={
              resolvedTheme === "dark"
                ? "ag-theme-quartz-dark"
                : "ag-theme-quartz"
            }
            style={{
              width: "100%",
              height: 600,
            }}
          >
            <AgGridReact<User>
  theme="legacy"
  rowData={filteredUsers}
  columnDefs={columnDefs}
  defaultColDef={defaultColDef}
  pagination
  paginationPageSize={10}
  animateRows
/>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/"
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Update Dialog */}
        <Dialog
          open={!!editingUser}
          onOpenChange={(open) => {
            if (!open) {
              setEditingUser(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Update Employee
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <input
                value={editName}
                onChange={(e) =>
                  setEditName(e.target.value)
                }
                className="w-full border rounded-md p-2"
                placeholder="Employee Name"
              />

              <input
                value={editEmail}
                onChange={(e) =>
                  setEditEmail(e.target.value)
                }
                className="w-full border rounded-md p-2"
                placeholder="Employee Email"
              />

              <button
                onClick={() => {
                  if (!editingUser) return;

                  setUsers((prev) =>
                    prev.map((user) =>
                      user.id === editingUser.id
                        ? {
                            ...user,
                            firstName: editName,
                            email: editEmail,
                          }
                        : user
                    )
                  );

                  setEditingUser(null);
                }}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}