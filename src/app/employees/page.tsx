"use client";
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef, useMemo,useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type User = {
  id: number;
  firstName: string;
  email: string;
};

export default function EmployeesPage() {
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
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();        setUsers(data.users);
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
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );
}, [users, search]);

  function addEmployee() {
  if (!newName || !newEmail) return;

  const newUser: User = {
    id: Date.now(),
    firstName: newName,
    email: newEmail,
  };

  setUsers((prev) => [...prev, newUser]);

  setNewName("");
  setNewEmail("");
}


function deleteEmployee(id: number) {
  setUsers((prev) => prev.filter((user) => user.id !== id));
}
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
          className="rounded-2xl shadow-lg p-6 mb-8 text-center"
          style={{ backgroundColor: "var(--card)" }}
        >
          <h1 className="text-4xl font-bold">Employees Directory</h1>
          <p className="mt-2 opacity-70">
            View all employees and their basic information.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search employee by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading employees...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="rounded-xl shadow-md p-6 flex flex-col justify-between min-h-260px]"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h2 className="text-xl font-semibold">
                  {user.firstName}
                </h2>

                <p className="mt-2 opacity-75 break-all">
                  {user.email}
                </p>

                <Link
                  href={`/employee/${user.id}`}
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick = {()=> deleteEmployee(user.id)}
                    className="ml-2 mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button onClick={() => {
                                          setEditingUser(user);
                                          setEditName(user.firstName);
                                          setEditEmail(user.email);
                                   }}
                    className="ml-2 mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"  >
                    Update
                  </button>
                  <Dialog
  open={editingUser?.id === user.id}
  onOpenChange={(open) => {
    if (!open) {
      setEditingUser(null);
    }
  }}
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update Employee</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Employee Name"
        className="w-full border rounded-md p-2"
      />

      <input
        type="email"
        value={editEmail}
        onChange={(e) => setEditEmail(e.target.value)}
        placeholder="Employee Email"
        className="w-full border rounded-md p-2"
      />

      <button
        onClick={() => {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === editingUser?.id
                ? {
                    ...u,
                    firstName: editName,
                    email: editEmail,
                  }
                : u
            )
          );

          setEditingUser(null);
        }}
        className="w-full bg-green-600 text-white rounded-md py-2"
      >
        Save Changes
      </button>
    </div>
  </DialogContent>
</Dialog>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
        <div className="mb-6 space-y-2">
          <input
            type="text"
            placeholder="New employee name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          
          <input
            type="email"
            placeholder="New employee email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={addEmployee} className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}