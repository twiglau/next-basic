"use server";

import { connectionDb, Venus, States } from "@/server/db";
import { Employee } from "@/types/Employees";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { schemeValidate } from "@/app/dashboard/venue/validate";

export async function getStates() {
  try {
    await connectionDb();
    const states = await States.find({}).select("_id name code").lean();
    return states.map((state) => ({
      id: state._id.toString(),
      name: state.name,
      code: state.code,
    }));
  } catch (error) {
    console.error("Failed to fetch states:", error);
    return [];
  }
}

export async function addVenus(state: unknown, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const stateId = formData.get("stateId") as string;

    // 1. 校验
    const validateResult = await schemeValidate({ name, address, stateId });
    if (!validateResult.success) {
      return validateResult;
    }

    // 2. 连接数据库
    await connectionDb();

    // 3. 创建场馆
    const newVenus = new Venus({
      name,
      address,
      stateId,
    });
    await newVenus.save();

    return {
      success: true,
      message: "Venue added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to add venue",
    };
  }
}

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
