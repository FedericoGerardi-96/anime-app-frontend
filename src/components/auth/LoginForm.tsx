"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";

import { EyeSlashFilledIcon } from "../../utils/icon/EyeFilledIcon";
import { EyeFilledIcon } from "../../utils/icon/EyeSlashFilledIcon";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mobileQuery = useMediaQuery("(max-width: 768px)");

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className='flex gap-6 flex-col w-full '>
        <h1 className='mb-4 text-8xl'>Login</h1>
        <Input
          type='email'
          label='Email'
          placeholder='Enter your email'
          isRequired
          variant={`${mobileQuery ? "flat" : "bordered"}`}
          defaultValue='junior2nextui.org'
          validationState={true ? "valid" : "invalid"}
          errorMessage='Please enter a valid email'
          className='w-full'
        />
        <Input
          label='Password'
          variant={`${mobileQuery ? "flat" : "bordered"}`}
          placeholder='Enter your password'
          endContent={
            <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className='w-full'
        />
        <Button color='primary' size='lg' fullWidth className='mt-6'>
          Click me
        </Button>
      </div>
    </>
  );
};
