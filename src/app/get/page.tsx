import Link from "next/link";

export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        className="max-w-xl w-full rounded-2xl shadow-lg p-8 text-center"
        style={{ backgroundColor: "var(--card)" }}
      >
        <h1 className="text-4xl font-bold mb-4">
          Welcome HR 👋
        </h1>

        <p className="text-lg opacity-80 mb-8">
          All human resources are managed through this system.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/employees"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            👥 Employee Management
          </Link>

          <Link
            href="/"
            className="px-6 py-3 border rounded-lg transition hover:bg-gray-100"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}