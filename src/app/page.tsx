'use client';

import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeProvider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const menuItems = [
    {
      href: "/employees",
      icon: "👥",
      title: "Employees",
      desc: "Manage employee records",
    },
    {
      href: "/leaves",
      icon: "🏖️",
      title: "Leave",
      desc: "Track leave requests",
    },
    {
      href: "/salary",
      icon: "💰",
      title: "Payroll",
      desc: "Salary management",
    },
    {
      href: "/attendance",
      icon: "🕒",
      title: "Attendance",
      desc: "Daily attendance tracking",
    },
  ];

  const stats = [
    {
      value: "104",
      label: "Employees",
    },
    {
      value: "12",
      label: "Departments",
    },
    {
      value: "08",
      label: "Pending Leaves",
    },
    {
      value: "₹12L",
      label: "Monthly Payroll",
    },
  ];

  return (
    <main className="min-h-screen bg-background p-6">
      {/* Theme Toggle */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={toggleTheme}>
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Button>
      </div>

      {/* Header */}
      <section className="mt-6 text-center">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Dashboard
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          HR Management System
        </h1>

        <p className="mt-4 text-muted-foreground">
          Manage employees, payroll, attendance, documents and leave requests
          from one place.
        </p>
      </section>

      {/* Stats */}
      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick Access */}
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Quick Access
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardHeader>
                  <div className="text-4xl">{item.icon}</div>

                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">
              Welcome to your HR Dashboard
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Access employee information, monitor attendance, manage payroll,
              review leave requests, and organize company documents from a
              single place.
            </p>

            <Link href="/blog">
              <Button size="lg">
                Explore Features →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}