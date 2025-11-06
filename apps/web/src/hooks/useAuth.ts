"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { LoginRequest, ApiError } from "@/lib/api-types";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      toast({
        title: "¡Bienvenido!",
        description: `Hola ${data.user.email}, sesión iniciada correctamente.`,
      });
      router.push("/stores");
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales inválidas. Por favor, intenta de nuevo.",
      });
    },
  });
}

export function useLogout() {
  const { toast } = useToast();
  const router = useRouter();

  const logout = () => {
    authService.logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    router.push("/login");
  };

  return { logout };
}
