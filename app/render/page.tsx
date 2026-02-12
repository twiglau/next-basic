import { cookies } from "next/headers";

// export const dynamic = "force-static";
// export const revalidate = 10;

export default async function DynamicPage() {
    // 2. 动态渲染
    // const cookieStore = await cookies();
    // cookieStore.set("name", "feiya");
    return (
        <div>
            <h1>{new Date().toLocaleTimeString()}</h1>
        </div>
    )
}