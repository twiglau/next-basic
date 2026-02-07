import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default async function Home() {
  const employees = await fetch("http://localhost:3002/employees").then((res) => res.json());
  return (
    <div className="container mx-auto my-5 grid grid-cols-2 md:grid-cols-4 gap-8">
      {employees.map((employee) => (
        <Card key={employee.id} className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>{employee.fullname}</CardTitle>
            <CardDescription>{employee.position}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{employee.age}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/employees/${employee.id}`}>Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
