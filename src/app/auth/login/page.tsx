import { LoginForm } from '../../../components';

const Login = () => {
  return (
    <section data-testid='login-page' id="login-page" className='w-full justify-center flex flex-col md:px-8 lg:px-0'>
      <LoginForm />
    </section>
  );
};
export default Login;
