import { AgriculturalLotIcon, CondominiumIcon, OfficeBuildingIcon, WarehouseIcon } from '@/components/core/Icon';
import { classNames } from '@/helpers/classNames';
import { ZoningClassification } from '@/infrastructure/store/features/property-list/property-list-type';
import React from 'react';

interface PropertyMarkerProps {
  classification: ZoningClassification;
  isSelected: boolean;
}

const PropertyMarker: React.FC<PropertyMarkerProps> = ({ classification, isSelected }) => {
  return (
    <div className="relative group">
      <span
        className={classNames(
          'block py-1 px-2 border border-white rounded relative transition-all duration-150',
          markerToClassification[classification].bg(isSelected),
          isSelected ? '-inset-y-2' : '-inset-y-0 group-hover:-inset-y-2',
        )}
      >
        <span className="text-white">{markerToClassification[classification].icon}</span>
        <span
          className={classNames(
            'w-1 border border-white rounded absolute left-1/2 -translate-x-1/2 group-hover:h-4 group-hover:-bottom-4 transition-all duration-150',
            isSelected ? 'h-4 -bottom-4' : '-bottom-2 h-2 group-hover:h-4 group-hover:-bottom-4',

            markerToClassification[classification].bg(isSelected),
          )}
        />
      </span>
    </div>
  );
};

export default PropertyMarker;

const markerToClassification: Record<ZoningClassification, { icon: JSX.Element; bg: (e: boolean) => string }> = {
  Commercial: {
    icon: <OfficeBuildingIcon />,
    bg: (selected: boolean) => (!selected ? 'bg-pink-6' : 'bg-pink-7'),
  },
  Residential: {
    icon: <CondominiumIcon />,
    bg: (selected: boolean) => (!selected ? 'bg-blue-6' : 'bg-blue-7'),
  },
  Industrial: {
    icon: <WarehouseIcon />,
    bg: (selected: boolean) => (!selected ? 'bg-green-6' : 'bg-green-7'),
  },
  Agricultural: {
    icon: <AgriculturalLotIcon />,
    bg: (selected: boolean) => (!selected ? 'bg-orange-6' : 'bg-orange-7'),
  },
};

// "Commercial" | "Agricultural" | "Industrial" | "Residential"
