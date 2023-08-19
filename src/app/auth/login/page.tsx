import { LoginForm } from "../../../components/auth/LoginForm";

const Login = () => {
  return (
    <section data-testid="login-page" className=' w-screen h-screen overflow-hidden lg:grid lg:grid-cols-2 md:flex md:flex-col block'>
      <div
        className='md:bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.6)),url("/YukinoLogin.png")] 
                    bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,1)),url("/YukinoLogin.png")] 
                    bg-no-repeat bg-top-center bg-cover h-screen w-full'>
        <div className='w-screen h-screen flex justify-center items-center container px-10 mx-auto md:hidden'>
          <LoginForm />
        </div>
      </div>
      <div className='container mx-auto md:flex hidden items-center flex-col justify-center md:p-10 lg:p-0 lg:px-16'>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
