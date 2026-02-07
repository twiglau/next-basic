"use server";

import { Employee } from "@/types/Employees";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addEmployee(formData: Employee) {
  const fullname = formData.fullname;
  const position = formData.position;
  const age = formData.age;

  const res = await fetch(`http://localhost:3002/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname,
      position,
      age,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add employee");
  }

  revalidatePath("/employees");
  redirect("/employees");
}
