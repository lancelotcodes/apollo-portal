import { TbKey } from 'react-icons/tb';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../core/Button';
import Input from '../core/Input';

const ResetPassword: React.FC = () => {
  return (
    <div className="flex flex-col px-4">
      <h1 className="font-bold text-center mb-2">Reset Password</h1>
      <p className="typography-body text-black">We got you fam! Time for a new password.</p>

      <div className="w-full mt-8 space-y-2">
        <Input label="New Password" name="password" />

        <Input label="Confirm Password" name="password" />
      </div>

      <div className="w-full mt-2">
        <Button className="w-full" icon={<TbKey className="inline h-6 w-6" />}>
          UPDATE PASSWORD
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

export default ResetPassword;
