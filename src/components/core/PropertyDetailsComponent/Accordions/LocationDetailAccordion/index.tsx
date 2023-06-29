import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import LocationDetailsForm from '@/components/Property/CreatePropertyPage/PropertyForms/LocationDetailsForm/LocationForm';
import { classNames } from '@/helpers/classNames';
import {
  useCityListQuery,
  useCityMicroDistrictsListQuery,
  useCitySubMarketsListQuery,
} from '@/infrastructure/store/api/lookup/lookup-api';
import { useSavePropertyLocationMutation } from '@/infrastructure/store/api/property/property-api';
import { PropertyAddress, SavePropertyLocationRequest } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '../../../Accordion';
import LocationDetailsAccordion from './LocationDetailsAccordion';
import { Feature } from '@/infrastructure/store/api/mapbox/LocationSearchResponse';
import { MapRef } from 'react-map-gl';
import { UseFormGetValues, SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { setSelectedPropertyAddress } from '@/infrastructure/store/features/property-list/property-list-slice';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { SingleValue } from 'react-select';

interface Props {
  propertyLocation?: PropertyAddress | SavePropertyLocationRequest | null;
  isTabForm?: boolean | null | undefined;
  passedRef?: React.RefObject<MapRef> | null;
}

const LocationDetailsAccordionContainer: React.FC<Props> = ({ propertyLocation, isTabForm, passedRef }) => {
  const dispatch = useAppDispatch();
  const [propertyLocationForm, setPropertyLocationForm] = useState<boolean>(false);

  const { propertyId } = useParams();
  const { data: cityList, isLoading: isCitiesLoading } = useCityListQuery(null);
  const [cityId, setCityId] = useState<number | undefined>(propertyLocation?.cityID);
  const { data: submarketList } = useCitySubMarketsListQuery(cityId ?? skipToken);
  const { data: microdistrictsList } = useCityMicroDistrictsListQuery(cityId ?? skipToken);
  const [initialLocationData, setInitialLocationData] = useState<
    PropertyAddress | SavePropertyLocationRequest | null | undefined
  >(propertyLocation);
  const [locationData, setLocationData] = useState<PropertyAddress | SavePropertyLocationRequest | undefined | null>(
    propertyLocation,
  );
  const [saveLocation] = useSavePropertyLocationMutation();

  function handleSelectCity(
    e: SingleValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<SavePropertyLocationRequest>,
  ) {
    setCityId(e?.value);
    setValue('cityID', e?.value);
    setValue('subMarketID', undefined);
    setValue('microDistrictID', undefined);
  }
  const onSubmit: SubmitHandler<SavePropertyLocationRequest> = async (e) => {
    if (propertyId) {
      const res = await saveLocation({ ...e, propertyID: propertyId }).unwrap();
      res.message && HandleNotification(res.message, res.success);
      setInitialLocationData({ ...e, propertyID: propertyId });
    }
    setPropertyLocationForm(!propertyLocationForm);
  };

  useEffect(() => {
    console.log(cityId);
  }, [cityId]);

  const loading = isCitiesLoading;
  const handleTabPropertyLocationForm = (
    e: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setPropertyLocationForm(!propertyLocationForm);
    } else {
      if (initialLocationData) {
        setLocationData(initialLocationData);
        dispatch(setSelectedPropertyAddress(initialLocationData));
      }
      setPropertyLocationForm(!propertyLocationForm);
      e?.stopPropagation();
    }
  };

  const handleSelectAddress = (data: Feature, getValues: UseFormGetValues<SavePropertyLocationRequest>) => {
    const location = data && (data.center || (data.geometry?.type === 'Point' && data.geometry.coordinates));
    if (getValues()) {
      setLocationData({ ...getValues(), line1: data.place_name, latitude: location[1], longitude: location[0] });
      dispatch(
        setSelectedPropertyAddress({
          ...getValues(),
          line1: data.place_name,
          latitude: location[1],
          longitude: location[0],
        }),
      );
    }
    passedRef &&
      passedRef.current?.flyTo({
        center: [location[0], location[1]],
        zoom: 7,
        speed: 1.3,
      });
  };

  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleTabPropertyLocationForm(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform')}
                />
              )}
              LOCATION DETAILS
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        {isTabForm && propertyLocationForm && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <LocationDetailsForm
                initialValue={locationData}
                onSubmit={onSubmit}
                cities={cityList?.data}
                submarkets={submarketList?.data}
                districts={microdistrictsList?.data}
                handleSelectCity={handleSelectCity}
                formColClassName="md:flex-col md:space-x-0 md:divide-x-0"
                formColInnerClassName="md:w-full md:pl-0"
                formCardBorderClassName="border-0 p-0 md:px-0"
                formColInnerTwoClassName="md:!w-full"
                isStepForm={true}
                inputClassName="py-1"
                handleTabPropertyLocationForm={handleTabPropertyLocationForm}
                cityId={cityId}
                handleSelectAddress={handleSelectAddress}
              />
            )}
          </>
        )}
        {!propertyLocationForm && propertyLocation && <LocationDetailsAccordion {...propertyLocation} />}
        {!propertyLocation && <p className="mt-2 px-4 pb-4">{InfoMessages.DataNotFound}</p>}
      </Accordion>
    </div>
  );
};

export default LocationDetailsAccordionContainer;
