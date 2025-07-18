"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    toast.success("Sesión cerrada");
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Ingresa un correo válido");
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✅ Gracias por suscribirte");
      } else {
        toast.error("❌ No se pudo enviar el correo");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Bienvenido {user?.email}</h1>

      <div className="max-w-sm space-y-2">
        <h2 className="text-xl font-semibold">Suscribirse al Newsletter</h2>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubscribe}>Suscribirme</Button>
      </div>

      <Button onClick={handleLogout} disabled={loading} className="mt-6">
        {loading ? "Cerrando..." : "Cerrar sesión"}
      </Button>
    </div>
  );
}
