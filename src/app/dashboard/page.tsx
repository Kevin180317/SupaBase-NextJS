"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    toast.success("Sesión cerrada");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Bienvenido {user?.email}</h1>
      <Button onClick={handleLogout} disabled={loading} className="mt-4">
        {loading ? "Cerrando..." : "Cerrar sesión"}
      </Button>
    </div>
  );
}
