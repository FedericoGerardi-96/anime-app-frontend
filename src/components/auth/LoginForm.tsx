'use client';
import { useState } from 'react';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Chip, Divider, Input, Link } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  validations,
  GoogleIcon,
  FacebookIcon,
} from '../../utils';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const mobileQuery = useMediaQuery('(max-width: 768px)');

  const initialValues = {
    email: '',
    password: '',
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoadingButton(true);
    const { email, password } = data;
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (!response) {
      setError(['Unexpected error, please try again later.']);
      return;
    }
    const { error } = response;
    if (error) {
      const listErrors = error.split('-');
      setError(listErrors);
      setIsLoadingButton(false);
      return;
    }

    router.push('/');
    setIsLoadingButton(false);
  };

  const signInWithProvider = async (provider: string) => {
    setIsLoadingButton(true);
    signIn(provider);
    setIsLoadingButton(false);
  };

  const Errors = () => {
    return error?.map((err, i) => {
      if (err === '') return;
      return (
        <Chip key={i} data-testid='error-chip' color='danger'>
          {err}
        </Chip>
      );
    });
  };

  return (
    <>
      <div data-testid='login-form' className='flex gap-6 flex-col w-full '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='mb-6 lg:text-8xl md:text-6xl text-5xl '>Sign In</h1>
          <div>
            <Controller
              control={control}
              name='email'
              defaultValue={initialValues.email}
              render={({ field }) => {
                return (
                  <Input
                    data-testid='email-input'
                    label='Email'
                    placeholder='Enter your email'
                    validationState={errors.email ? 'invalid' : 'valid'}
                    variant={`${mobileQuery ? 'flat' : 'bordered'}`}
                    className='w-full mt-5'
                    autoComplete='username'
                    {...field}
                  />
                );
              }}
              rules={{
                required: 'The Email is Required',
                validate: validations.isEmail,
              }}
            />
            <div className='my-3'>
              {errors.email && (
                <span data-testid='error-email-span' className='text-error'>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <Controller
              control={control}
              name='password'
              defaultValue={initialValues.password}
              render={({ field }) => {
                return (
                  <Input
                    data-testid='password-input'
                    label='Password'
                    placeholder='Enter your password'
                    validationState={errors.password ? 'invalid' : 'valid'}
                    variant={`${mobileQuery ? 'flat' : 'bordered'}`}
                    endContent={
                      <button
                        className='focus:outline-none text-[1.5rem]'
                        type='button'
                        data-testid='button-eye'
                        onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                    className='w-full mt-5'
                    autoComplete='current-password'
                    {...field}
                  />
                );
              }}
              rules={{
                required: 'The password is Required',
                minLength: {
                  value: 8,
                  message:
                    'Password must be longer than or equal to 8 characters',
                },
              }}
            />
            <div className='my-3'>
              {errors.password && (
                <span data-testid='error-password-span' className='text-error'>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-4 justify-between'>{Errors()}</div>

          <Button
            data-testid='button-submit'
            isLoading={isLoadingButton}
            type='submit'
            color='primary'
            size='lg'
            fullWidth
            className='mt-6 md:text-2xl text-[1rem]'>
            Sign In
          </Button>
          <div className='mt-4'>
            <NextLink href='/auth/register' passHref legacyBehavior>
              <Link>Don't have an account?</Link>
            </NextLink>
          </div>
        </form>
        <Divider className='my-4' />
        <p className='text-white'>Or continue with open acount</p>
        <div className='flex lg:flex-col md:flex-row flex-col w-full justify-between gap-4'>
          <Button
            data-testid='google-button'
            fullWidth
            endContent={<GoogleIcon />}
            onClick={() => signInWithProvider('google')}
            type='button'>
            Sign In with Google
          </Button>
          <Button
            data-testid='facebook-button'
            fullWidth
            type='button'
            onClick={() => signInWithProvider('facebook')}
            className='text-white bg-[#3b5998] 
          hover:bg-[#3b5998]/90 focus:ring-4 
          focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm 
          px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55'>
            <FacebookIcon />
            Sign in with Facebook
          </Button>
        </div>
      </div>
    </>
  );
};
