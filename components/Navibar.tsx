import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getServerSession } from "@/server/auth"


const NaviBar = async () => {
    const session = await getServerSession()
    return (
        <div className="container py-5 border-b border-gray-200 mx-auto flex items-center justify-between">
            <div className="font-anton">Admin</div>

            <div className="shrink-0 flex gap-2 justify-end items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Test</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="bottom">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href="/render">静态，动态渲染</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/data">数据获取</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/cache">四种缓存</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/news">客户端路由缓存</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="bottom">
                        <DropdownMenuGroup>
                            {session ? (
                                <>
                                    <DropdownMenuItem>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/dashboard/event">活动管理</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/dashboard/venue">场地管理</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/api/auth/signout">退出登录</Link>
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <DropdownMenuItem>
                                    <Link href="/login?type=login">登录/注册</Link>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>测试</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href="/form/add">添加表单</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/stream">Stream测试</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default NaviBar