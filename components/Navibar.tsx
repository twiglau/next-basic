import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


const NaviBar = () => {
    return (
        <div className="container py-5 border-b border-gray-200 mx-auto flex items-center justify-between">
            <div className="font-anton">Admin</div>

            <div className="shrink-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="bottom">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>账户</DropdownMenuLabel>
                            <DropdownMenuItem>登录</DropdownMenuItem>
                            <DropdownMenuItem>注册</DropdownMenuItem>
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