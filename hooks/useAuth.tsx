import { createContext, useContext } from "react";
import User from "@/types/User";

interface SessionData {
  user: User;
}
interface AuthContextType {
  sessionData: SessionData | null;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  sessionData: SessionData;
  children: React.ReactNode;
}> = ({ sessionData, children }) => {
  return (
    <AuthContext.Provider value={{ sessionData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
