import Breadcrumb from '@/components/core/Breadcrumb';
import Select from '@/components/core/NewSelect';
import { FCC } from '@/helpers/FCC';
import { usePropertyListQuery } from '@/infrastructure/store/api/property/property-api';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SingleValue } from 'react-select';

const Header: FCC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unitId } = useParams();

  const [query, setQuery] = useState('');

  const { selectedProperty, selectedPropertyInfo } = useAppSelector((state) => state['property-list']);

  const {
    data: properties,
    isLoading,
    isFetching,
    isError,
  } = usePropertyListQuery(
    {
      Query: query,
      PageNumber: 1,
      PageSize: 10,
    },
    {
      selectFromResult: (state) => {
        return state;
      },
    },
  );

  // Change property listing on property change
  const handleSelectedPropertyChange = (
    data: SingleValue<{
      name: string;
      value: number;
    }>,
  ) => {
    navigate(`/property/${data?.value}`);
  };

  return (
    <section>
      <Breadcrumb
        excludePaths={[`/property/${selectedProperty?.propertyID}/unit`]}
        mappedValue={{
          [`/property/${selectedPropertyInfo?.id}`]: selectedPropertyInfo?.name,
          [`/property/${selectedProperty?.propertyID}/unit/${unitId}`]: `Unit Number: ${unitId}`,
          [`/property/${selectedProperty?.propertyID}/unit/create`]: 'CREATE UNIT',
        }}
      />

      {!location.pathname.includes('create') && (
        <div className="p-4 flex sm:gap-4 sm:justify-between w-full items-center">
          <h1 className="hidden sm:inline font-bold">
            {!location.pathname.includes('unit') && selectedPropertyInfo?.name}
            {location.pathname.includes('unit') && selectedPropertyInfo?.name}
            {/* {location.pathname.includes('unit') && selectedProperty?.name : 'Unit Number: 20'} */}
          </h1>

          {!location.pathname.includes('unit') && (
            <div className="w-full sm:max-w-[320px]">
              {selectedProperty && selectedProperty.name && selectedProperty.id && properties?.success && (
                <Select
                  isLoading={isLoading || isFetching}
                  options={properties.data.items.map((e) => ({ ...e, value: e.id }))}
                  value={[{ name: selectedProperty.name, value: selectedProperty.id }]}
                  getOptionLabel={(e) => e.name.toString()}
                  getOptionValue={(e) => e.value.toString()}
                  onChange={(e) => handleSelectedPropertyChange(e)}
                  controlShouldRenderValue
                  aria-errormessage={isError ? 'Failed to load data' : undefined}
                  label="Property"
                  onInputChange={(e) => setQuery(e)}
                />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Header;
