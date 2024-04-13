import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
  photo: z.string().url("L'URL de la photo doit être valide")
});