import React, { useEffect, useRef, useState } from 'react';
import { SessionOptions } from '@/constant/SessionOptions';
import { FCC } from '@/helpers/FCC';
import { SessionUtils } from '@/helpers/session-storage';
import { StepHelpers } from '@/hooks/useStep';
import {
  useCityListQuery,
  useCityMicroDistrictsListQuery,
  useCitySubMarketsListQuery,
} from '@/infrastructure/store/api/lookup/lookup-api';
import {
  usePropertyAddressByIDQuery,
  usePropertyByIDQuery,
  useSavePropertyLocationMutation,
} from '@/infrastructure/store/api/property/property-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import LocationDetailsForm from './LocationForm';
import { useParams } from 'react-router-dom';
import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import Mapbox from '@/components/core/Mapbox';
import { MapRef, MarkerDragEvent } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Feature } from '@/infrastructure/store/api/mapbox/LocationSearchResponse';
import { PropertyAddress, SavePropertyLocationRequest } from '@/infrastructure/store/api/property/property-type';
import { UseFormGetValues, UseFormSetValue, SubmitHandler } from 'react-hook-form';
import { SingleValue } from 'react-select';

const LocationDetailsFormContainer: FCC<StepHelpers> = ({ goToNextStep, goToPrevStep }) => {
  const { id } = useParams();
  const mapRef = useRef<MapRef>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [saveLocation] = useSavePropertyLocationMutation();
  const { data: cityList, isLoading: isCitiesLoading } = useCityListQuery(null);

  const [propertyId] = useState<number | undefined>(
    id
      ? parseInt(id)
      : SessionUtils.getItem(SessionOptions.propertyId)
      ? SessionUtils.getItem(SessionOptions.propertyId)
      : undefined,
  );

  const { data: locationInfo, isLoading: isAddressLoading } = usePropertyAddressByIDQuery(propertyId ?? skipToken);
  const { data: propertyInfo, isLoading: isPropertyLoading } = usePropertyByIDQuery(propertyId ?? skipToken);
  const [cityId, setCityId] = useState<number | undefined>(locationInfo?.data?.cityID);
  const { data: submarketList, isLoading: isSubmarketListLoading } = useCitySubMarketsListQuery(cityId ?? skipToken);
  const { data: microdistrictsList, isLoading: isMicrodistrictsListLoading } = useCityMicroDistrictsListQuery(
    cityId ?? skipToken,
  );
  const [locationData, setLocationData] = useState<PropertyAddress | SavePropertyLocationRequest | undefined>(
    locationInfo?.data,
  );

  // function use to reset sub market & mirco district dropdown on city change
  function handleSelectCity(
    e: SingleValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<SavePropertyLocationRequest>,
  ) {
    setIsEdit(true);
    setCityId(e?.value);
    setValue('cityID', e?.value);
    setValue('subMarketID', undefined);
    setValue('microDistrictID', undefined);
  }

  const onSubmit: SubmitHandler<SavePropertyLocationRequest> = async (e) => {
    if (propertyId) {
      const res = await saveLocation({ ...e, propertyID: propertyId }).unwrap();
      res.message && HandleNotification(res.message, res.success);
    }
    const sessionSteps = SessionUtils.getItem('isStepValidated');
    SessionUtils.setItem('isStepValidated', JSON.stringify({ ...sessionSteps, isStep3: true }));
    goToNextStep();
  };

  const handleSelectAddress = (data: Feature, getValues: UseFormGetValues<SavePropertyLocationRequest>) => {
    const location = data && (data.center || (data.geometry?.type === 'Point' && data.geometry.coordinates));
    if (getValues())
      setLocationData({ ...getValues(), line1: data.place_name, latitude: location[1], longitude: location[0] });
    mapRef.current?.flyTo({
      center: [location[0], location[1]],
      zoom: 7,
      speed: 1.3,
    });
  };

  const onMarkerDragEnd = (event: MarkerDragEvent) => {
    if (locationData) setLocationData({ ...locationData, latitude: event.lngLat.lat, longitude: event.lngLat.lng });
  };

  useEffect(() => {
    if (locationInfo?.data && !isEdit) {
      setCityId(locationInfo?.data.cityID);
    }
    if (locationInfo?.data) {
      setLocationData(locationInfo?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, locationInfo?.data]);

  // Query IsLoading true
  const loading =
    isCitiesLoading || isAddressLoading || isSubmarketListLoading || isMicrodistrictsListLoading || isPropertyLoading;

  return (
    <>
      {!isEdit && loading ? (
        <Loader />
      ) : (
        <>
          <LocationDetailsForm
            initialValue={locationData}
            onSubmit={onSubmit}
            cities={cityList?.data}
            submarkets={submarketList?.data}
            districts={microdistrictsList?.data}
            handleSelectCity={handleSelectCity}
            goToPrevStep={goToPrevStep}
            formColClassName="md:divide-x md:space-x-4"
            formColInnerClassName="md:w-full md:pl-0 space-y-4"
            formColInnerTwoClassName="md:w-full md:pl-4 space-y-4"
            inputClassName="py-1"
            cityId={cityId}
            handleSelectAddress={handleSelectAddress}
          >
            <div className="border -z-0 border-gray-blue-2 rounded-lg bg-white p-4 space-y-2">
              <Mapbox
                zoom={7}
                selectedProperty={propertyInfo?.data}
                selectedPropertyAddress={locationData}
                draggable={true}
                mapHeight="h-[315px]"
                passedRef={mapRef}
                onMarkerDragEnd={onMarkerDragEnd}
              />
            </div>
          </LocationDetailsForm>
        </>
      )}
    </>
  );
};

export default LocationDetailsFormContainer;
