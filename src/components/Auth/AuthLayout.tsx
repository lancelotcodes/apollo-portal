import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  //
  return (
    <div className="flex min-h-screen relative">
      <section className="w-full md:w-1/2 md:relative absolute -z-10 bg-gay-5">
        <img src="/auth-image.png" alt="building-auth" className="object-cover h-full w-full min-h-screen" />
      </section>

      <section className="w-full md:w-1/2 flex justify-center px-2">
        <div className="px-10 w-full max-w-md py-6 rounded-lg bg-white md:bg-transparent mt-20 md:mt-40 mb-auto">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
