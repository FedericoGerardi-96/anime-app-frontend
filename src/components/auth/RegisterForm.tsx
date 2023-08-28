'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Chip, Divider, Input } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

import { EyeFilledIcon, EyeSlashFilledIcon } from '../../utils';
import { validations } from '../../utils';
import { GoogleIcon } from '../../utils/icon/GoogleIcon';
import { FacebookIcon } from '../../utils/icon/FacebookIcon';

type Inputs = {
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      callbackUrl: '/',
      redirect: false,
    });

    if (!response) {
      setError('Unexpected error, please try again later.');
      return;
    }

    const { error } = response;

    if (error) {
      setError(error);
      setIsLoadingButton(false);
      return;
    }
    router.push('/');
    setIsLoadingButton(false);
  };

  return (
    <>
      <div data-testid='register-form' className='flex gap-6 flex-col w-full '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='mb-6 lg:text-8xl md:text-6xl text-5xl '>Sign Up</h1>
          <div>
            <Controller
              control={control}
              name='email'
              defaultValue={initialValues.email}
              render={({ field }) => {
                return (
                  <Input
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
                required: 'This field is Required',
                validate: validations.isEmail,
              }}
            />
            <div className='my-3'>
              {errors.email && (
                <span className='text-error'>{errors.email.message}</span>
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
                    label='Password'
                    placeholder='Enter your password'
                    validationState={errors.password ? 'invalid' : 'valid'}
                    variant={`${mobileQuery ? 'flat' : 'bordered'}`}
                    endContent={
                      <button
                        id='button-eye'
                        className='focus:outline-none'
                        type='button'
                        onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
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
                required: 'This field is Required',
                minLength: {
                  value: 8,
                  message:
                    'Password must be longer than or equal to 8 characters',
                },
              }}
            />
            <div className='my-3'>
              {errors.password && (
                <span className='text-error'>{errors.password.message}</span>
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
                    label='Password'
                    placeholder='Enter your password'
                    validationState={errors.password ? 'invalid' : 'valid'}
                    variant={`${mobileQuery ? 'flat' : 'bordered'}`}
                    endContent={
                      <button
                        className='focus:outline-none'
                        type='button'
                        onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
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
                required: 'This field is Required',
                minLength: {
                  value: 8,
                  message:
                    'Password must be longer than or equal to 8 characters',
                },
              }}
            />
            <div className='my-3'>
              {errors.password && (
                <span className='text-error'>{errors.password.message}</span>
              )}
            </div>
          </div>
          {error && <Chip color='danger'>{error}</Chip>}
          <Button
            isLoading={isLoadingButton}
            type='submit'
            color='primary'
            size='lg'
            fullWidth
            className='mt-6 md:text-2xl text-[1rem]'>
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};
