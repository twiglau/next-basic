import { NextRequest } from "next/server";

const data: string[] = ["打球", "工作", "练习"];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json({
    todos: data,
  });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const todo = formData.get("todo") as string;
  data.push(todo);
  return Response.json({
    todos: data,
  });
}

export async function DELETE(request: NextRequest) {
  const formData = await request.formData();
  const todo = formData.get("todo") as string;
  data.splice(data.indexOf(todo), 1);
  return Response.json({
    todos: data,
  });
}
