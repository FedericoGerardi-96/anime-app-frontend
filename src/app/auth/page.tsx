'use client';
import { useState } from 'react';

import { Tabs, Tab } from '@nextui-org/react';

import { LoginForm } from '../../components';
import { RegisterForm } from '../../components';

type tabs = 'login' | 'sign-up';

const AuthPage = () => {
  const [selected, setSelected] = useState<tabs>('login');

  const changeTab = () => {
    if (selected === 'sign-up') setSelected('login');
    else setSelected('sign-up');
  };

  return (
    <div
      data-testid='login-page'
      className='w-full justify-center flex flex-col md:px-8 lg:px-0'>
      <Tabs
        className='mb-4 flex-grow'
        fullWidth
        size='md'
        aria-label='Tabs form'
        selectedKey={selected}
        onSelectionChange={changeTab}>
        <Tab className='login-tab' key='login' title='Login'>
          <LoginForm/>
        </Tab>
        <Tab data-testid='register-tab' key='sign-up' title='Sign up'>
          <RegisterForm/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AuthPage;
