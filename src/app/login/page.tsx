"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Error al iniciar sesión");
    } else {
      toast.success("¡Has iniciado sesión con éxito!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Iniciar sesión</h2>
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
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Cargando..." : "Entrar"}
      </Button>
    </div>
  );
}
