import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchUsers = async () =>
  (await fetch("https://jsonplaceholder.typicode.com/users")).json();

export default function Users() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  
  return (
    <div className="users-container">
      <h2>Users</h2>
      <button className="refresh-btn" onClick={() => refetch()}>
  Refresh Users
</button>

      <ul>
        {data.map((user: any) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
