"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    if (!email || !password || !username) {
      return { error: "Please fill in all fields" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long" };
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return { error: "User with this email already exists" };
      }
      return { error: "Username is already taken" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to register:", error);
    return { error: "Failed to create account. Please try again." };
  }
}

export async function loginUser(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }
    
    throw error;
  }
}
