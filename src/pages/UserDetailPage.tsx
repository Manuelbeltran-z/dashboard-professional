import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types";

export default function UserDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useQuery<User>({
    queryKey: ["userDetail", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((r) =>
        r.json(),
      ),
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        ← Volver
      </button>
      <h2>{data?.name}</h2>
      <p>
        <strong>Username:</strong> {data?.username}
      </p>
      <p>
        <strong>Email:</strong> {data?.email}
      </p>
    </div>
  );
}
