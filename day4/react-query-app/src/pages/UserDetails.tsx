import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function UserDetails() {
  const { id } = useParams();

  const userQuery = useQuery({
    queryKey: ["user", id],
    queryFn: async () =>
      (await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)).json(),
  });

  const postsQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: async () =>
      (await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)).json(),
  });

  if (userQuery.isLoading || postsQuery.isLoading) return <p>Loading...</p>;
  if (userQuery.error || postsQuery.error) return <p>Error loading data.</p>;

  const user = userQuery.data;
  const posts = postsQuery.data;


  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>Posts:</h3>
      <ul>
        {posts.map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
  
}
