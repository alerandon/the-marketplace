import { MAX_PASSWORD_LENGTH } from "@the-marketplace/shared";
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

export const storeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  address: z
    .string()
    .trim()
    .min(5, { message: "La dirección debe tener al menos 5 caracteres" })
    .max(200, { message: "La dirección debe tener menos de 200 caracteres" }),
  city: z
    .string()
    .trim()
    .min(2, { message: "La ciudad debe tener al menos 2 caracteres" })
    .max(100, { message: "La ciudad debe tener menos de 100 caracteres" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "El teléfono debe tener al menos 7 caracteres" })
    .max(20, { message: "El teléfono debe tener menos de 20 caracteres" })
    .regex(/^[0-9+\-\s()]+$/, { message: "El teléfono solo puede contener números, +, -, espacios y paréntesis" }),
});

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  description: z
    .string()
    .trim()
    .max(500, { message: "La descripción debe tener menos de 500 caracteres" })
    .optional()
    .or(z.literal("")),
  price: z
    .number({ message: "El precio debe ser un número" })
    .positive({ message: "El precio debe ser mayor a 0" })
    .max(999999.99, { message: "El precio es demasiado alto" }),
  sku: z
    .string()
    .trim()
    .min(3, { message: "El SKU debe tener al menos 3 caracteres" })
    .max(50, { message: "El SKU debe tener menos de 50 caracteres" })
    .regex(/^[A-Z0-9-]+$/, { message: "El SKU solo puede contener letras mayúsculas, números y guiones" }),
  stock: z
    .number({ message: "El stock debe ser un número" })
    .int({ message: "El stock debe ser un número entero" })
    .nonnegative({ message: "El stock no puede ser negativo" })
    .max(999999, { message: "El stock es demasiado alto" }),
  isAvailable: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type StoreSearchData = z.infer<typeof storeSearchSchema>;
export type StoreFormData = z.infer<typeof storeFormSchema>;
export type ProductFormData = z.infer<typeof productFormSchema>;
