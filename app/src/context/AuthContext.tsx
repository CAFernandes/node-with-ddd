import { createContext } from "react";

export type User = {
  id: number;
  name?: string;
  username: string;
  password: string;
};

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
});
