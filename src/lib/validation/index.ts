import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const OnboardingValidation = z.object({
  file: z.custom<File[]>(),
  penname: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string(),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const QuoteValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  tags: z.string(),
  type: z.string(),
});

export const PoemValidation = z.object({
  title: z.string().min(3, { message: "Minimum 3 characters." }).max(200, { message: "Maximum 200 caracters" }),
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  tags: z.string(),
  type: z.string(),
});

// ============================================================
// COMMUNITY
// ============================================================
export const CommunityValidation = z.object({
  name: z.string().min(2, { message: "Community's name must be at least 2 characters." }),
  bio: z.string(),
});
