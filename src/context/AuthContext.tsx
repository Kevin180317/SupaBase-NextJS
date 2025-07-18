"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User, AuthResponse } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar la sesión activa al iniciar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Suscribirse a cambios en la sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const register = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    return await supabase.auth.signUp({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        login,
        register,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return context;
};
