import { FCC } from '@/helpers/FCC';
import Broker from '../Broker';
import { LocationIcon } from '../Icon';
import Tag from '../Tag';
import React from 'react';
import { PropertyAgentsDetails } from '@/infrastructure/store/api/property/property-type';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from 'src/assets/images';
import { numberFormat } from '@/helpers/numberFormat';

export interface PropertyCardProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'id'> {
  id: number;
  propertyName: string;
  address: string;
  gradeName: string;
  propertyTypeName: string;
  totalUnits: number;
  availableUnits: number;
  propertySize: number;
  brokerProps: PropertyAgentsDetails[] | undefined;
  propertyImage?: string | null;
}

const PropertyCard: FCC<PropertyCardProps> = ({
  id,
  propertyName,
  address,
  availableUnits,
  totalUnits,
  propertySize,
  brokerProps,
  gradeName,
  propertyTypeName,
  propertyImage,
  ...rest
}) => {
  const navigate = useNavigate();
  const handleOnClickTab = (event: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>) => {
    event?.stopPropagation();
    navigate(`/property/${id}`, {
      state: {
        defaultTab: 'Stacking Plan',
      },
    });
  };
  return (
    <div
      className="rounded p-4 lg:p-6 xl:p-8 bg-white shadow-sm border border-gray-blue-2 hover:bg-gray-blue-1 hover:border-gray-blue-7 active:bg-gray-1 active:border-gray-blue-7 transition-all duration-100 cursor-pointer"
      {...rest}
    >
      <div className="flex flex-col xl:flex-row gap-4 w-full h-full">
        <div className="h-60 w-full xl:w-44 xl:h-auto bg-gray-blue-3">
          {propertyImage && <img className="h-full w-full xl:w-44" src={propertyImage} alt="main-img" />}
          {!propertyImage && <img className="h-full w-full xl:w-44" src={IMAGES.DUMMYPHOTO} alt="main-img" />}
        </div>

        <div className="flex-col flex gap-2 flex-1">
          <div className="flex gap-2">
            <Tag type="zoning-commercial" value={propertyTypeName} />

            <Tag type="class-c" value={gradeName} />
          </div>

          <h2 className="font-medium">{propertyName}</h2>

          <span className="flex">
            <LocationIcon />
            <span className="flex-1 typography-body">{address === 'null' ? 'N/A' : address}</span>
          </span>

          <div className="mt-auto">
            <span
              className="flex items-center gap-1"
              onClick={handleOnClickTab}
              onKeyPress={handleOnClickTab}
              role="link"
              tabIndex={0}
            >
              <span className="typography-label font-medium text-gray-blue-7">All units:</span>
              <span>{totalUnits}</span>
            </span>

            <span className="flex items-center gap-1">
              <span className="typography-label font-medium text-gray-blue-7">Available units:</span>
              <span>{availableUnits}</span>
            </span>

            <span className="flex items-center gap-1">
              <span className="typography-label font-medium text-gray-blue-7">Available area for rent:</span>
              <span>{numberFormat(propertySize)} sqm</span>
            </span>
          </div>
          {brokerProps &&
            brokerProps?.map((agent, index) => {
              if (agent?.agentType === 1) {
                return (
                  <div className="mt-2" key={index}>
                    <Broker agent={agent} />
                  </div>
                );
              }
            })}
          {brokerProps && brokerProps.length !== 0 && !brokerProps?.find((x) => x.agentType === 1) && (
            <div className="mt-2">
              <Broker agent={brokerProps && brokerProps[0]} />
            </div>
          )}
          {brokerProps && brokerProps.length === 0 && (
            <span className="flex items-center gap-1">
              <span className="typography-label font-medium text-gray-blue-7">{'Agent:'}</span>
              <span>N/A</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
