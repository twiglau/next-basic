"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const PostsPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to login page or show an error message
      redirect("/api/auth/signin?callbackUrl=/dashboard"); // Redirect to the sign-in page
    }
  }); 
  return (
    <div>
      <h1>Posts Page</h1>
      <p>This is the posts page.</p>
    </div>
  );
};

export default PostsPage;