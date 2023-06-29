import { Link, useNavigate } from 'react-router-dom';
import Button from '../core/Button';
import { FCC } from '@/helpers/FCC';
import Form from '../core/Form';
import { LoginPayload } from '@/infrastructure/store/api/auth/auth-types';
import React from 'react';
import { SiMicrosoftoffice } from 'react-icons/si';
import { loginSchema } from '@/form-resolvers/auth/auth-resolver';
import { setAuth } from '@/infrastructure/store/features/auth/auth-slice';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/infrastructure/store/api/auth/auth-api';
import { yupResolver } from '@hookform/resolvers/yup';

const Login: FCC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const useFormReturn = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const { setError } = useFormReturn;

  const [login, state] = useLoginMutation({});

  const onSubmit = async (e: LoginPayload) => {
    if (state.isLoading) return;

    const res = await login(e);

    if ('error' in res && 'data' in res.error) {
      const errorData = res.error.data;

      setError('username', { message: errorData?.message ?? 'Username or Password is incorrect!' });
      setError('password', { message: errorData?.message ?? 'Username or password is incorrect!' });
      return;
    }

    if (!('error' in res)) {
      dispatch(setAuth(res.data.data));
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="flex flex-col px-4">
      <h1 className="font-bold text-center mb-2">Portal</h1>
      <p className="typography-body text-black">Log in with username and password</p>

      <Form onSubmit={onSubmit} useFormReturn={useFormReturn}>
        <div className="w-full mt-8 space-y-2">
          <Form.Input label="Username" name="username" autoComplete="userName" inputClassName="!py-2" />

          <Form.InputPassword label="Password" name="password" autoComplete="password" inputClassName="!py-2" />
        </div>

        <div className="w-full mt-2">
          <Button type="submit" className="w-full" isLoading={state.isLoading}>
            LOGIN
          </Button>
        </div>
      </Form>

      <div className="mt-10 text-center">
        <span className="font-bold text-xs tracking-[0.04em] text-gray-blue-7">
          <Link to="/auth/forgot-password">FORGOT PASSWORD?</Link>
        </span>
      </div>

      <div className="w-full mt-40">
        <Button btnType="primary-black" className="w-full" icon={<SiMicrosoftoffice className="inline h-6 w-6" />}>
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default Login;
