import Link from "next/link"


const NaviBar = () => {
    return (
        <div className="container py-5 border-b border-gray-200 mx-auto flex items-center justify-between">
            <div>Admin</div>
            <div className="flex items-center justify-end gap-2">
                <Link href="/">Home</Link>
                <Link href="/form">Forms</Link>
            </div>
        </div>
    )
}

export default NaviBar