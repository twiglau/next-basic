import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";


const fetchDetail = async (id:string) => {
    const res = await fetch(`http://localhost:3002/employees/${id}`);
    if(!res.ok){
        throw notFound();
    }
    const data = await res.json();
    return data;
}
const EmployeeDetailsPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const data = await fetchDetail(id);
    return (
        <div>
            <div>{data.fullname}</div>
            <div>{data.position}</div>
            <div>{data.age}</div>
            <Button asChild>
                <Link href={`/form/edit/${id}`}>Edit</Link>
            </Button>
        </div>
    );
};

export default EmployeeDetailsPage;