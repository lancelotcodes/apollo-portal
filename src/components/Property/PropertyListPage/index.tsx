import React, { Suspense, useEffect } from 'react';
import { usePropertyListQuery } from '@/infrastructure/store/api/property/property-api';
import PropertyCard from '../../core/Property-Card';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/core/Loader';
import Pagination from '@/components/core/Pagination';
import { setPaginationIndex } from '@/infrastructure/store/features/property-list/property-list-slice';

const Header = React.lazy(() => import('./Header'));
const PropertyTable = React.lazy(() => import('./PropertyTable'));
const HeaderTags = React.lazy(() => import('./HeaderTags'));
const MapBox = React.lazy(() => import('./Property-Map'));

const PropertyListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state['property-list']);
  const navigate = useNavigate();

  const { viewMode, paginationIndex } = state;

  const {
    data: properties,
    isError,
    isFetching,
  } = usePropertyListQuery({
    PageNumber: paginationIndex,
    PageSize: 14,
    Query: state.search,
    City: state?.filter?.city?.name || '',
    SubMarket: state?.filter?.submarket?.name || '',
    MicroDistrict: state?.filter?.microdistrict?.name,
    PropertyType: state?.filter?.propertyType?.name,
    Grade: state?.filter?.grade?.name,
  });

  useEffect(() => {
    if (!isFetching && (isError || !properties?.success)) {
      console.warn('Failed to load Property List');
    }
  }, [isError, state, properties?.success, isFetching]);

  return (
    <>
      <Suspense fallback={null}>
        <Header />
        <HeaderTags state={state} />
      </Suspense>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {viewMode === 'grid' && (
            <div className="p-4">
              <div className="grid md:grid-cols-2 3xl:grid-cols-3 gap-4">
                {properties?.data.items.map((e) => (
                  <PropertyCard
                    key={e.id}
                    id={e.id}
                    address={`${e.line1}`}
                    propertyName={e.name}
                    totalUnits={e.allUnits}
                    availableUnits={e.availableUnits}
                    brokerProps={e.agents}
                    propertySize={e.availableSpace}
                    gradeName={e.gradeName}
                    propertyTypeName={e.propertyTypeName}
                    propertyImage={e.mainImage}
                    onClick={() => {
                      navigate(`/property/${e.id}`, {
                        state: {
                          defaultTab: 'Property Details',
                        },
                      });
                    }}
                  />
                ))}
              </div>
              {properties?.success && properties?.data.items.length > 0 && (
                <Pagination
                  pageSize={14}
                  onPageChange={(e) => dispatch(setPaginationIndex(e))}
                  hasNextPage={properties?.data.hasNextPage}
                  hasPreviousPage={properties?.data.hasPreviousPage}
                  totalCount={properties?.data.totalCount}
                  totalPages={properties?.data.totalPages}
                  pageIndex={paginationIndex}
                />
              )}
            </div>
          )}

          {viewMode === 'table' && properties?.success && (
            <div className="p-4 h-full">
              <Suspense fallback={null}>
                <PropertyTable {...properties.data} />
              </Suspense>
            </div>
          )}

          {viewMode === 'map' && properties?.success && (
            <Suspense fallback={null}>
              <MapBox />
            </Suspense>
          )}
          {properties?.data.items.length === 0 && <div className="flex justify-center">Record not found</div>}
        </>
      )}
    </>
  );
};

export default PropertyListPage;
