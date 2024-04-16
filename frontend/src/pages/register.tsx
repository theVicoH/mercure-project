import RegisterForm from "@/features/forms/registerForm";

const RegisterPage = () => {
  return <div className="w-screen h-screen flex flex-col justify-center items-center">
  <div className="w-full max-w-sm">
    <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mb-10">Register</h2>
    <RegisterForm/>
  </div>

</div>;
};

export default RegisterPage;
