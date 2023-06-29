import React, { lazy, Suspense } from 'react';
import PropertyListPage from '@/components/Property/PropertyListPage';
import Layout from '../layout';
import AuthLayout from '@/components/Auth/AuthLayout';
import Login from '@/components/Auth/Login';
import PropertyDetailsOutlet from '@/components/Property/PropertyDetails';

const MarketResearch = lazy(() => import('@/components/Market-Research'));
const CreatePropertyPage = lazy(() => import('@/components/Property/CreatePropertyPage/CreatePropertyPage'));
const PropertyDetailsPage = lazy(() => import('@/components/Property/PropertyDetails/DetailsPropertyPage'));
const ForgotPassword = lazy(() => import('@/components/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/components/Auth/ResetPassword'));
const UnitDetails = lazy(() => import('@/components/Property/PropertyDetails/DetailsUnit'));
const NotFound = lazy(() => import('@/components/ErrorPage/NotFound'));
const UserList = lazy(() => import('@/components/User-List'));
const PersonalProfile = lazy(() => import('@/components/Personal-Profile/PersonalProfile'));
const OfferGeneration = lazy(() => import('@/components/Offer-Generation/OfferGeneration'));
const CreateUnitPage = lazy(() => import('@/components/Property/PropertyDetails/CreateUnitPage'));

export interface RoutePathDefinition {
  title?: string;
  nav?: boolean;
  children?: RoutePathDefinition[];
  path: string;
  element?: React.ReactNode | null;
}

export const routes: RoutePathDefinition[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        title: 'HOME',
        element: <Layout />,
        children: [
          {
            path: 'create-property',
            title: 'CREATE PROPERTY',
            element: (
              <Suspense>
                <CreatePropertyPage />
              </Suspense>
            ),
          },
          {
            path: 'create-property/:id',
            title: 'CREATE PROPERTY',
            element: (
              <Suspense>
                <CreatePropertyPage />
              </Suspense>
            ),
          },
          {
            path: 'property',
            title: 'PROPERTY LIST',
            element: <PropertyListPage />,
          },

          {
            path: 'property/:propertyId',
            title: 'PROPERTY',
            element: <PropertyDetailsOutlet />,
            children: [
              {
                path: '',
                title: 'PROPERTY DETAILS',
                element: (
                  <Suspense>
                    <PropertyDetailsPage />
                  </Suspense>
                ),
              },
              {
                path: 'unit/create',
                title: 'CREATE UNIT',
                element: (
                  <Suspense>
                    <CreateUnitPage />
                  </Suspense>
                ),
              },
              {
                path: 'unit/create/:id',
                title: 'CREATE UNIT',
                element: (
                  <Suspense>
                    <CreateUnitPage />
                  </Suspense>
                ),
              },
              {
                path: 'unit/:unitId',
                title: 'UNIT DETAILS',
                element: (
                  <Suspense>
                    <UnitDetails />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: 'profile',
            title: 'PROFILE',
            element: (
              <Suspense>
                <PersonalProfile />
              </Suspense>
            ),
          },
          {
            path: 'market-research',
            title: 'MARKET RESEARCH',
            element: (
              <Suspense>
                <MarketResearch />
              </Suspense>
            ),
          },
          {
            path: 'offer-generation',
            title: 'OFFER GENERATION',
            element: (
              <Suspense>
                <OfferGeneration />
              </Suspense>
            ),
          },
          {
            path: 'user-list',
            title: 'USERS LIST',
            element: (
              <Suspense>
                <UserList />
              </Suspense>
            ),
          },
          {
            path: '*',
            title: 'NOT_FOUND',
            element: (
              <Suspense>
                <NotFound />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'forgot-password',
            element: (
              <Suspense>
                <ForgotPassword />
              </Suspense>
            ),
          },
          {
            path: 'reset-password',
            element: (
              <Suspense>
                <ResetPassword />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];
