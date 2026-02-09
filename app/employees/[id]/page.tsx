import { Button } from "@/components/ui/button";
import { deleteEmployee } from "@/utils/actions";
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
    
    const handleDelete = deleteEmployee.bind(null, id);
    return (
        <div>
            <div>{data.fullname}</div>
            <div>{data.position}</div>
            <div>{data.age}</div>
            <div className="flex items-center gap-2">
                <Button asChild>
                    <Link href={`/form/edit/${id}`}>Edit</Link>
                </Button>
                <form action={handleDelete}>
                    <Button type='submit'>
                        Delete
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeDetailsPage;


export async function generateStaticParams() {
    const res = await fetch("http://localhost:3002/employees");
    const data = await res.json();
    return data.map((employee:{id: string}) => ({
        id: employee.id,
    }));
}

export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const data = await fetchDetail(id);
    return {
        title: data.fullname,
        description: `Details of ${data.fullname}`,
    }
}   