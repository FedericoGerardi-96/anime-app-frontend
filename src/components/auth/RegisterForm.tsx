'use client';
import { useState } from 'react';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Chip, Input, Link } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';
import Swal from 'sweetalert2';

import { EyeFilledIcon, EyeSlashFilledIcon } from '../../utils';
import { validations } from '../../utils';
import { register } from '../../services';
import { ImageModalProps } from '../../interface';
import { ImageModal } from '../image/DropZone';

type Inputs = {
  email: string;
  password: string;
  name: string;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const mobileQuery = useMediaQuery('(max-width: 768px)');
  const [imageSelected, setImageSelected] = useState<ImageModalProps>({
    imageBase64: null,
    imageFile: null,
  });

  const initialValues = {
    email: '',
    password: '',
    name: '',
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoadingButton(true);
    const { email, password, name } = data;

    try {
      await register({
        email,
        password,
        name,
        icon: imageSelected.imageFile,
      });
      Swal.fire('Success', 'User create succesfully', 'success');
      router.push('/auth/login');
    } catch (error: any) {
      if (error) {
        const listErrors = error.message.split('-');
        setError(listErrors);
        setIsLoadingButton(false);
        return;
      }
    }
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
                        data-testid='button-eye'
                        id='button-eye'
                        className='focus:outline-none text-[1.5rem]'
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
          <div>
            <Controller
              control={control}
              name='name'
              defaultValue={initialValues.name}
              render={({ field }) => {
                return (
                  <Input
                    data-testid='name-input'
                    label='Name'
                    placeholder='Enter your name'
                    validationState={errors.name ? 'invalid' : 'valid'}
                    variant={`${mobileQuery ? 'flat' : 'bordered'}`}
                    type='text'
                    className='w-full mt-5'
                    autoComplete='current-password'
                    {...field}
                  />
                );
              }}
              rules={{
                required: 'The name is Required',
              }}
            />
            <div className='my-3'>
              {errors.name && (
                <span data-testid='error-name-span' className='text-error'>
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label>Select an Avatar (Optional):</label>
            <ImageModal image={{ imageSelected, setImageSelected }} />
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
            Sign Up
          </Button>
          <div className='mt-4'>
            <NextLink href='/auth/login'>Already have an account?</NextLink>
          </div>
        </form>
      </div>
    </>
  );
};
