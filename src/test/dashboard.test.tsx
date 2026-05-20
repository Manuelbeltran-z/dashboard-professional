import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import useAuthStore from "../store/useAuthStore";
import DashboardLayout from "../pages/DashboardLayout";

it("Existe Form con email, password y boton", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
  expect(screen.getByTestId("input-email-test")).toBeInTheDocument();
  expect(screen.getByTestId("input-password-test")).toBeInTheDocument();
  expect(screen.getByTestId("button-enviar-test")).toBeInTheDocument();
});

it("Error con credenciales incorrectas", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
  await userEvent.type(
    screen.getByTestId("input-email-test"),
    "manuel@gmail.com",
  );
  await userEvent.type(screen.getByTestId("input-password-test"), "33123312");
  await userEvent.click(screen.getByTestId("button-enviar-test"));
  expect(screen.getByTestId("p-errormsg-test")).toBeInTheDocument();
});

vi.mock("../store/useAuthStore", () => ({ default: vi.fn() }));

it("Credenciales correctas llaman a login/store", async () => {
  const mockLogin = vi.fn();
  (useAuthStore as any).mockImplementation((selector: any) =>
    selector({ login: mockLogin, user: null }),
  );
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
  await userEvent.type(
    screen.getByTestId("input-email-test"),
    "usertest@admin.com",
  );
  await userEvent.type(screen.getByTestId("input-password-test"), "12345678");
  await userEvent.click(screen.getByTestId("button-enviar-test"));
  expect(mockLogin).toHaveBeenCalled();
});

it("Renderiza users, posts y logout en DashboardLayout", () => {
  (useAuthStore as any).mockImplementation((selector: any) =>
    typeof selector === "function"
      ? selector({ logout: vi.fn(), user: null })
      : { logout: vi.fn(), user: null },
  );
  render(
    <MemoryRouter>
      <DashboardLayout />
    </MemoryRouter>,
  );
  expect(screen.getByTestId("link-users-test")).toBeInTheDocument();
  expect(screen.getByTestId("link-posts-test")).toBeInTheDocument();
  expect(screen.getByTestId("button-logout-test")).toBeInTheDocument();
});

it("Muestra el nombre del usuario en el header", () => {
  render(
    <MemoryRouter>
      <DashboardLayout />
    </MemoryRouter>,
  );
  expect(screen.getByTestId("user-name-test")).toBeInTheDocument();
});
