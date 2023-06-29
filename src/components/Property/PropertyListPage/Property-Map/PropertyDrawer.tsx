import Button from '@/components/core/Button';
import { LocationIcon } from '@/components/core/Icon';
import IconButton from '@/components/core/IconButton';
import Tag from '@/components/core/Tag';
import useWindowSize from '@/hooks/useWindowSize';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '@/infrastructure/store/store-hooks';

interface PropertyDrawerProps {
  closeDrawer: () => void;
}

const PropertyDrawer: React.FC<PropertyDrawerProps> = ({ closeDrawer }) => {
  const { selectedPropertyInfo: property, selectedPropertyAddress } = useAppSelector((app) => app['property-list']);

  const { width } = useWindowSize();

  const navigate = useNavigate();

  if (!property) {
    return null;
  }

  return (
    <div
      className="absolute w-full md:w-96 z-10 left-0 md:left-5 p-0 md:p-4 xl:p-8 top-0 md:top-5 overflow-auto transition-all md:rounded-lg bg-white border border-gray-blue-2"
      style={{ height: width >= 768 ? 'calc(100% - 40px)' : '100%' }}
    >
      <div className="flex flex-col gap-2 h-full p-4 md:p-0">
        <div className="flex justify-between">
          <h2 className="font-medium text-black">{property?.name}</h2>
          <div>
            <IconButton className="text-gray-5 hover:text-gray-7 focus:text-gray-7" onClick={closeDrawer}>
              <MdClose className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
        {/* {data.type} */}
        <div className="flex gap-2 flex-0">
          <Tag type="zoning-commercial" value={property?.propertyTypeName} />

          <Tag type="class-c" value="Class C" />
        </div>

        <span className="flex flex-0">
          <LocationIcon />
          <span className="flex-1 typography-body text-gray-600">
            {selectedPropertyAddress?.cityName}, {selectedPropertyAddress?.line1}
          </span>
        </span>

        <div className="w-full bg-gray-1 border border-gray-3 rounded-lg">
          <div className="h-72">
            {property.mainImage && <img className="h-full w-full" src={property.mainImage} alt="main-img" />}
          </div>
        </div>
        {property && (
          <ul className="typography-label flex-0 mb-5">
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Property Type</span>
              <span className="text-black flex-1">{property?.propertyTypeName || ''}</span>
            </li>
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Master Property</span>
              <span className="text-black flex-1">{property?.masterPropertyName || ''}</span>
            </li>
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Contact Name</span>
              <span className="text-black flex-1">{property?.contactName || ''}</span>
            </li>
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Owner</span>
              <span className="text-black flex-1">{property?.ownerName || ''}</span>
            </li>
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Grade</span>
              <span className="text-black flex-1">{property?.gradeName || ''}</span>
            </li>
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Company Owner</span>
              <span className="text-black flex-1">{property?.ownerCompanyName || ''}</span>
            </li>
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Is Exclusive?</span>
              <span className="text-black flex-1">{property?.isExclusive === true ? 'Yes' : 'No'}</span>
            </li>
            <li className="flex justify-between px-2 py-1 even:bg-blue-1">
              <span className="font-medium text-gray-7 flex-1">Notes</span>
              <span className="text-black flex-1">{property?.note || ''}</span>
            </li>
          </ul>
        )}

        <div className="mt-auto w-full flex-0 pb-4">
          <Button className="w-full" btnType="tertiary-gray" onClick={() => navigate(`/property/${property?.id}`)}>
            Property Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDrawer;
