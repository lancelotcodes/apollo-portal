import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FCC } from '@/helpers/FCC';
import React, { useEffect } from 'react';

const Index: FCC = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/property');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <div className="h-full flex">
        <Sidebar />

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              {/* Primary column */}
              <section className="bg-gray-blue-1 min-w-0 flex-1 h-full flex flex-col lg:order-last">
                <Outlet />

                {children}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
