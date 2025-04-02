import { login, signup } from "@/utils/api";
import { SignupForm } from "./signup-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SignupForm
      handleSubmit={async (f) => {
        const user = await signup(f);
        if (user) {
          const token = await login(f);

          if (token) {
            localStorage.setItem("token", token.access_token);
            navigate("/");
          } else {
            toast.error("Error. Bad Credentials");
          }
        } else {
          toast.error("Error. Failed to sign up new user.");
        }
      }}
    />
  );
};
