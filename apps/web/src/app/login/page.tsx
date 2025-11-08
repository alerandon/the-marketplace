import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <Suspense fallback={<div>Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
