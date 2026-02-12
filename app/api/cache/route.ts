export async function GET() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();
  return Response.json(data);
}
