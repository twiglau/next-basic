import EditForm from "@/components/EditForm";
import { notFound } from "next/navigation";



const fetchDetail = async (id:string) => {
    const res = await fetch(`http://localhost:3002/employees/${id}`);
    if(!res.ok){
        throw notFound();
    }
    const data = await res.json();
    return data;
}
const EditFormPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const employee = await fetchDetail(id);
    return (
        <div className="flex items-center justify-center h-screen">
            <EditForm employee={employee} />
        </div>
    );
};

export default EditFormPage;
