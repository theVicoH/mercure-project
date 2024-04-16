import LoginForm from "@/features/forms/loginForm.";

const LoginPage = () => {
  return <div className="w-screen h-screen flex flex-col justify-center items-center">
    <div className="w-full max-w-sm">
      <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mb-10">Login</h2>
      <LoginForm/>
    </div>

  </div>;
};

export default LoginPage;
