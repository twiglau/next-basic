export const GET = async (request: Request) => {
  console.log(request);
  return Response.json({ message: "Hello from GET API route!" });
};
