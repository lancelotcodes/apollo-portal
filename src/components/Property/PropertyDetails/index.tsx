import { Outlet, useLocation, useParams } from 'react-router-dom';
import Header from './Header';
import React from 'react';
import { useSelectedProperty } from '@/hooks/useSelectedProperty';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import {
  propertyTabChanged,
  PropertyTabType,
} from '@/infrastructure/store/features/property-details/property-details.slice';
import { useSelectedPropertyUnit } from '@/hooks/useSelectedPropertyUnit';

const PropertyDetailsOutlet: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  useSelectedProperty(params?.propertyId ? parseInt(params.propertyId) : null);
  useSelectedPropertyUnit(params?.unitId ? parseInt(params.unitId) : null);
  dispatch(propertyTabChanged({ tab: (location?.state?.defaultTab as PropertyTabType) ?? 'Property Details' }));

  return (
    <div className="bg-white h-full flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default PropertyDetailsOutlet;
