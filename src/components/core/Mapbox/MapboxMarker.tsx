import React from 'react';
import { AgriculturalLotIcon, CondominiumIcon, OfficeBuildingIcon, WarehouseIcon } from '@/components/core/Icon';
import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { ZoningClassification } from '@/infrastructure/store/features/property-list/property-list-type';

interface MapboxMarkerProps {
  classification: ZoningClassification;
  isSelected: boolean;
  isCluster: boolean;
  count?: number;
}

const MapboxMarker: FCC<MapboxMarkerProps> = ({ classification, isSelected, children, isCluster, count }) => {
  return (
    <div className="relative group">
      <span
        className={classNames(
          'border border-white relative transition-all duration-150 flex items-center justify-center',
          markerToClassification[classification].bg(isSelected),
          isSelected ? '-inset-y-3' : '-inset-y-0 group-hover:-inset-y-3',
          isCluster ? 'rounded-full' : 'rounded',
          isCluster ? 'bg-opacity-90' : 'rounded',
          isCluster && count ? 'h-10 w-10' : 'py-2 px-3',
        )}
      >
        {isCluster ? (
          <span className="text-white">{children}</span>
        ) : (
          <span className="text-white">{markerToClassification[classification].icon}</span>
        )}
        <span
          className={classNames(
            'w-1 border border-white rounded absolute left-1/2 -translate-x-1/2 group-hover:h-3 group-hover:-bottom-4 transition-all duration-150',
            isSelected ? 'h-4 -bottom-4' : '-bottom-2 h-2 group-hover:h-4 group-hover:-bottom-4',

            markerToClassification[classification].bg(isSelected),
          )}
        />
      </span>
    </div>
  );
};

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

export default MapboxMarker;
