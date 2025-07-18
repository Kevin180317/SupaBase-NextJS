"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard"); // mejor usar replace para no dejar / en el history
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  if (user) {
    // Mientras hace redirect, no renderices nada para evitar parpadeo
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-md w-full"
      >
        <Card className="bg-zinc-800 shadow-xl border-zinc-700">
          <CardContent className="p-8 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Bienvenido a tu Panel
            </h1>
            <p className="text-zinc-300 text-sm">
              Gestiona tu cuenta, revisa tu dashboard y mucho más. Si ya tienes
              cuenta, inicia sesión. Si no, crea una nueva en segundos.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full"
                variant="default"
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => router.push("/register")}
              >
                Crear cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
