"use server";
import { db } from "@/common/utils/db";

export async function fetchModels() {
  try {
    const users = await db.model.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const users = await db.worker.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
