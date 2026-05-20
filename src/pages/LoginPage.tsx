import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email("Formato inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export default function LoginPage() {
  const [errormsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const testUser = { email: "usertest@admin.com", password: "12345678" };

  const login = useAuthStore((state) => state.login);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 24 }}>
      <h2>Dashboard Login</h2>
      <form
        onSubmit={handleSubmit((data) => {
          if (
            data.email === testUser.email &&
            data.password === testUser.password
          ) {
            const mockUser = {
              id: 1,
              name: "Admin",
              username: "admin",
              email: data.email,
            };
            login(mockUser);
            navigate("/dashboard/users");
            setErrorMsg("");
            reset();
          } else {
            setErrorMsg("Usuario no registrado");
          }
        })}
      >
        <div style={{ marginBottom: 12 }}>
          <input
            data-testid="input-email-test"
            {...register("email")}
            placeholder="Email"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            data-testid="input-password-test"
            {...register("password")}
            type="password"
            placeholder="Password"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button
          data-testid="button-enviar-test"
          disabled={!isValid}
          style={{ padding: "8px 16px" }}
        >
          Entrar
        </button>
        <p data-testid="p-errormsg-test" style={{ color: "red" }}>
          {errormsg}
        </p>
      </form>
      <p style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
        Demo: usertest@admin.com / 12345678
      </p>
    </div>
  );
}
