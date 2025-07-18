"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const { error } = await register(email, password);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Error al crear la cuenta");
    } else {
      toast.success("✅ Revisa tu correo para confirmar la cuenta.");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Crear cuenta</h2>
      <Input
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <Button onClick={handleRegister} disabled={loading}>
        {loading ? "Cargando..." : "Registrarse"}
      </Button>
    </div>
  );
}
