import { Input } from "@/components/ui/input";
import { addTodo, getTodo } from "@/utils/actions";
import ClientButton from "@/components/ClientButton";
import SubmitButton from "@/components/SubmitButton";
import SubmitForm from "@/components/SubmitForm";

export default async function ServerActionTodosPage() {
    const todos = await getTodo()
    const userId = "test"

    // 如何传递额外参数

    // 1. 使用自定义的 action
    const addTodoWithUserId = async (formData: FormData) => {
      "use server"
      await addTodo(userId, formData)
    }
    // 2. 使用闭包
    const addTodoWithUserId2 = addTodo.bind(null, userId)

    // 3. 服务端组件中，不能将内联函数作为props传递给客户端组件。
    // 你只能传递序列化的数据或Server Actions.
    // 包裹Server Action的箭头函数，是一个新的函数，不是Server Action或不能被序列化。
    const addTodoWithUserId3 = async () => {
      "use server"
      const form = new FormData()
      form.set("todo", "🐂")
      await addTodoWithUserId(form)
    }
      
    return <div className="container mx-auto p-4">
    <div className="flex items-center">
        <form action={addTodoWithUserId2}>
            <Input type="text" name="todo" />
            <SubmitButton />
        </form>
        {/* 3. 客户端组件下沉：单独封装 */}
        <ClientButton onClick={addTodoWithUserId3}>Client Button</ClientButton>
    </div>
    <ul>
      {todos.map((todo,index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
    <hr className="border" />
    <SubmitForm />
  </div>;
}

