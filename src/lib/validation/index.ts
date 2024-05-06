import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  email: z.string().email(),
  name: z.string().min(2, { message: "Name must be at least 2 characters."}),
  voterId: z.string().min(1, { message: "ID should be 10 characters long."}).max(10, {message: "Provide a valid ID."}),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const OnboardingValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  matric_no: z.string().min(8, { message: "Matric No must be at least 8 characters." }),
  level: z.string().min(1, { message: "choose a level." }),
  department: z.string().min(1, { message: "choose a department." }),
  type: z.string().min(1, { message: "You need to select an account type." }),
  bio: z.string(),
});