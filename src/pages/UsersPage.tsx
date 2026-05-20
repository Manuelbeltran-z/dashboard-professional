import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
  });

  const listaFiltrada = useMemo(
    () =>
      data?.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())),
    [search, data],
  );

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error cargando usuarios</p>;

  return (
    <div>
      <h2>Usuarios</h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre..."
        style={{ padding: 8, marginBottom: 16, width: 300 }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {listaFiltrada?.map((u) => (
          <li
            key={u.id}
            style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}
          >
            <Link to={`/dashboard/users/${u.id}`}>
              <strong>{u.name}</strong> — {u.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
