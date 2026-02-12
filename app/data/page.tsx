

import Image from "next/image";


const fetchImg = async () => {
    //  {  cache: "force-cache"  }
    //  { next: { revalidate: 60 } }
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    return data;
}


export default async function DataPage() {
    const img = await fetchImg();
    return (
        <div className="relative">
            <h1>Data Page</h1>
            <div className="size-60 relative mx-auto">
                <Image src={img.message} alt="" fill className="object-contain" /> 
            </div>
        </div>
    )
}