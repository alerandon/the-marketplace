import { MAX_PASSWORD_LENGTH } from "@food-minimarket/shared";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "El email debe tener menos de 255 caracteres" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(MAX_PASSWORD_LENGTH, { message: `La contraseña debe tener menos de ${MAX_PASSWORD_LENGTH} caracteres` }),
});

export const storeSearchSchema = z.object({
  query: z.string().max(100, { message: "La búsqueda debe tener menos de 100 caracteres" }).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type StoreSearchData = z.infer<typeof storeSearchSchema>;
