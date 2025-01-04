"use server";
import { db } from "@/common/utils/db";

export async function fetchModels() {
  try {
    const users = await db.model.findMany();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    console.log("herikooo");
    const users = await db.worker.findMany();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
