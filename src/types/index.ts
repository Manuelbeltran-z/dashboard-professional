export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
