import { RegisterForm } from '../../../components';

const Register = () => {
  return (
    <section data-testid='register-page' id="register-page" className='w-full justify-center flex flex-col md:px-8 lg:px-0'>
      <RegisterForm />
    </section>
  );
};

export default Register;