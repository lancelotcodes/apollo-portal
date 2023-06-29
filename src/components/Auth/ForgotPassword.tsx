import React from 'react';
import { TbRecycle } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Button from '../core/Button';
import Input from '../core/Input';

const ForgotPassword = () => {
  return (
    <div className="flex flex-col px-4">
      <h1 className="font-bold text-center mb-2">Forgot Your Password?</h1>
      <p className="typography-body text-black text-center">
        We get it, stuff happens. Just enter your email address below and we&apos;ll send you a link to reset your
        password!
      </p>

      <div className="w-full mt-8 space-y-2">
        <Input label="Email" name="email" type="email" />
      </div>

      <div className="w-full mt-2">
        <Button className="w-full" icon={<TbRecycle className="inline h-6 w-6" />}>
          REQUEST PASSWORD RESET
        </Button>
      </div>

      <div className="mt-10 text-center">
        <span className="font-bold text-xs tracking-[0.04em] text-gray-blue-7">
          <Link to="/auth/login">ALREADY REMEMBER YOUR PASSWORD? TRY TO LOGIN AGAIN</Link>
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
