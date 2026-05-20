import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Post } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormData {
  title: string;
  body: string;
}

const schema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  body: z.string().min(3, "Mínimo 3 caracteres"),
});

export default function PostsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
  });

  const sliced = data?.slice(0, 10);

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const postMutation = useMutation({
    mutationFn: (data: FormData) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  if (isLoading) return <p>Cargando posts...</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
        {sliced?.map((p) => (
          <li
            key={p.id}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{p.title}</span>
            <button
              onClick={() => deleteMutation.mutate(p.id)}
              style={{ color: "red", cursor: "pointer" }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h3>Agregar Post</h3>
      <form
        onSubmit={handleSubmit((data) => {
          postMutation.mutate(data);
          reset();
        })}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 400,
        }}
      >
        <div>
          <input
            {...register("title")}
            placeholder="Título"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("body")}
            placeholder="Contenido"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.body && <p style={{ color: "red" }}>{errors.body.message}</p>}
        </div>
        <button
          disabled={!isValid}
          type="submit"
          style={{ padding: "8px 16px", width: "fit-content" }}
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
