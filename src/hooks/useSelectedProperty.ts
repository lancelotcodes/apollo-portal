import {
  useAgentsByPropertyIDQuery,
  useBuildingByIDQuery,
  usePropertyAddressByIDQuery,
  usePropertyByIDQuery,
  usePropertyDocumentsByIDQuery,
  usePropertyMandateByIDQuery,
  usePropertySEOQuery,
  usePropertyVideoByIDQuery,
} from '@/infrastructure/store/api/property/property-api';
import {
  setSelectedProperty,
  setSelectedPropertyAddress,
  setSelectedPropertyAgents,
  setSelectedPropertyDetailsLoading,
  setSelectedPropertyDocuments,
  setSelectedPropertyInfo,
  setSelectedPropertyMandate,
  setSelectedPropertySEO,
  setSelectedPropertyVideo,
} from '@/infrastructure/store/features/property-list/property-list-slice';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { useEffect } from 'react';

export const useSelectedProperty = (id?: number | null) => {
  const dispatch = useAppDispatch();

  const { data: propertyAgents, isLoading: isPropertyAgentLoading } = useAgentsByPropertyIDQuery(id, {
    skip: typeof id !== 'number',
  });
  const { data: property, isLoading: isProperyBuildingLoading } = useBuildingByIDQuery(id, {
    skip: typeof id !== 'number',
  });
  const { data: propertyAddress, isLoading: isPropertyAddressLoading } = usePropertyAddressByIDQuery(id, {
    skip: typeof id !== 'number',
  });
  const { data: propertyById, isLoading: isPropertyInfoLoading } = usePropertyByIDQuery(id, {
    skip: typeof id !== 'number',
  });
  const { data: propertySEO, isLoading: isPropertySEOLoading } = usePropertySEOQuery(id, {
    skip: typeof id !== 'number',
  });
  const { data: propertyVideo, isLoading: isPropertyVideoLoading } = usePropertyVideoByIDQuery(id, {
    skip: typeof id !== 'number',
  });
  const { data: propertyDocuments, isLoading: isPropertyDocumentLoading } = usePropertyDocumentsByIDQuery(id, {
    skip: typeof id !== 'number',
  });
  const { data: propertyMandates, isLoading: isProperyMandateLoading } = usePropertyMandateByIDQuery(id, {
    skip: typeof id !== 'number',
  });

  const loading =
    isPropertyAgentLoading ||
    isProperyBuildingLoading ||
    isPropertyAddressLoading ||
    isPropertyInfoLoading ||
    isPropertySEOLoading ||
    isPropertyVideoLoading ||
    isPropertyDocumentLoading ||
    isProperyMandateLoading;
  useEffect(() => {
    dispatch(setSelectedPropertyDetailsLoading(loading));
  }, [dispatch, loading]);
  useEffect(() => {
    if (
      property &&
      propertyAddress &&
      propertyById &&
      propertyAgents &&
      propertySEO &&
      propertyVideo &&
      propertyDocuments &&
      propertyMandates
    ) {
      dispatch(setSelectedProperty(property.data));
      dispatch(setSelectedPropertyAddress(propertyAddress.data));
      dispatch(setSelectedPropertyInfo(propertyById?.data));
      dispatch(setSelectedPropertyAgents(propertyAgents?.data));
      dispatch(setSelectedPropertySEO(propertySEO?.data));
      dispatch(setSelectedPropertyVideo(propertyVideo?.data));
      dispatch(setSelectedPropertyDocuments(propertyDocuments?.data));
      dispatch(setSelectedPropertyMandate(propertyMandates?.data));
    }
  }, [
    dispatch,
    property,
    propertyById,
    propertyAddress,
    propertyAgents,
    propertySEO,
    propertyVideo,
    propertyDocuments,
    propertyMandates,
  ]);
};
