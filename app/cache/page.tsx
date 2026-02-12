import Image from "next/image";
import { cookies } from "next/headers";

const fetchImg = async () => {
    // 如何退出 请求记忆
    const { signal } = new AbortController()
    const res = await fetch("https://dog.ceo/api/breeds/image/random", { signal })
    
    return res.json();
}

const CachePage = async () => {

    // const cookieStore = await cookies();
    // cookieStore.get("name");
    const img1 = await fetchImg()
    const img2 = await fetchImg()
    const img3 = await fetchImg()
    const cookieStore = await cookies();
    cookieStore.get("name");
    return (
        <div className="w-full">
            <h1>Cache</h1>
            <div className="container mx-auto grid grid-cols-3 gap-3 h-[500px]">
                <div className="relative">
                    <Image fill src={img1.message} alt="" className="object-contain" />
                </div>
                <div className="relative">
                    <Image fill src={img2.message} alt="" className="object-contain" />
                </div>
                <div className="relative">
                    <Image fill src={img3.message} alt="" className="object-contain" />
                </div>
            </div>
        </div>
    )
}

export default CachePage
