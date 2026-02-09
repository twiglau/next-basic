"use server";

import { Employee } from "@/types/Employees";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editEmployee(id: string, formData: Employee) {
  const fullname = formData.fullname;
  const position = formData.position;
  const age = formData.age;

  try {
    if (Number(age) < 18) {
      throw new Error("Age must be at least 18");
    }
    const res = await fetch(`http://localhost:3002/employees/${id}`, {
      method: "PATCH",
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
      throw new Error("Failed to edit employee");
    }
  } catch (error) {
    return Promise.reject(error);
  }

  revalidatePath("/"); // Revalidate the home page to reflect changes
  revalidatePath(`/employees/${id}`); // Revalidate the employee detail page
  redirect("/");
}

export async function addEmployee(state: unknown, formData: FormData) {
  const fullname = formData.get("fullname") as string;
  const position = formData.get("position") as string;
  const age = formData.get("age") as string;

  try {
    if (fullname.trim() === "" || position.trim() === "" || age.trim() === "") {
      throw new Error("All fields are required");
    }
    if (Number(age) < 18) {
      throw new Error("Age must be at least 18");
    }
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
    revalidatePath("/"); // Revalidate the home page to reflect new employee
    return {
      success: res.ok,
      message: res.ok
        ? "Employee added successfully"
        : "Failed to add employee",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to add employee",
    };
  }
}

export async function deleteEmployee(id: string) {
  try {
    const res = await fetch(`http://localhost:3002/employees/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete employee");
    }
  } catch (error) {
    return Promise.reject(error);
  }
  revalidatePath("/"); // Revalidate the home page to reflect deleted employee
  redirect("/");
}
