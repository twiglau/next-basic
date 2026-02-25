
"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";

export default function TodosPage() {

  const [todos, setTodos] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    fetch("/api/todos", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
        inputRef.current!.value = "";
      });
  };
  return <div className="container mx-auto p-4">
    <div className="flex items-center">
        <form onSubmit={handleSubmit}>
            <Input ref={inputRef} type="text" name="todo" />
            <Button type="submit" className="ml-2">Add</Button>
        </form>
    </div>
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  </div>;
}