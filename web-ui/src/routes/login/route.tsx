import { useNavigate } from "react-router";
import { LoginForm } from "./login-form";
import { login } from "@/utils/api";
import { toast } from "sonner";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LoginForm
      handleSubmit={async (f) => {
        const token = await login(f);
        if (token) {
          localStorage.setItem("token", token.access_token);
          navigate("/");
        } else {
          toast.error("Error. Bad Credentials");
        }
      }}
    />
  );
};
