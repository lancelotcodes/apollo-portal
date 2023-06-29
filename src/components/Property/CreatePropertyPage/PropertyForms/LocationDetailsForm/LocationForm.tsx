import React, { useCallback, useEffect, useState } from 'react';
import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { saveLocationResolver } from '@/form-resolvers/create-property';
import { FCC } from '@/helpers/FCC';
import { ISelectOption } from '@/infrastructure/store/api/lookup/lookup-type';
import { SavePropertyLocationRequest } from '@/infrastructure/store/api/property/property-type';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';
import { DropdownOption } from '@/constant/DropdownOptions';
import SuggestionBox from '@/components/core/SuggestionBox';
import { Feature, LocationSearchResponse } from '@/infrastructure/store/api/mapbox/LocationSearchResponse';
import { ExternalAPI } from '@/infrastructure/store/api/mapbox/mapbox-api';
import useDebounce from '@/hooks/useDebounce';
import { SingleValue } from 'react-select';

interface Props {
  cities: ISelectOption[] | undefined;
  submarkets: ISelectOption[] | undefined;
  districts: ISelectOption[] | undefined;
  initialValue?: SavePropertyLocationRequest | null | undefined;
  onSubmit: SubmitHandler<SavePropertyLocationRequest>;
  handleSelectCity: (
    e: SingleValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<SavePropertyLocationRequest>,
  ) => void;
  goToPrevStep?: () => void;
  inputClassName?: string;
  formColClassName?: string;
  formColInnerClassName?: string;
  formColInnerTwoClassName?: string;
  formCardBorderClassName?: string;
  isStepForm?: boolean;
  handleTabPropertyLocationForm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  cityId?: number;
  handleSelectAddress?: (data: Feature, getValues: UseFormGetValues<SavePropertyLocationRequest>) => void;
}

const LocationDetailsForm: FCC<Props> = ({
  cities,
  submarkets,
  districts,
  onSubmit,
  handleSelectCity,
  initialValue,
  goToPrevStep,
  inputClassName,
  formColClassName,
  formColInnerClassName,
  formColInnerTwoClassName,
  formCardBorderClassName,
  isStepForm,
  handleTabPropertyLocationForm,
  cityId,
  children,
  handleSelectAddress,
}) => {
  const useFormReturn = useForm<SavePropertyLocationRequest>({
    defaultValues: initialValue ?? {},
    resolver: yupResolver(saveLocationResolver),
  });
  const { setValue, reset, getValues } = useFormReturn;
  const [searchData, setSearchData] = useState<LocationSearchResponse | null>(null);
  const [search, setSearch] = useState('');
  const [suggestionBox, setSuggestionBox] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(search, 200);

  const handleSearchAddress = useCallback(async (value: string) => {
    setSearchData(null);
    if (value.length >= 3) {
      const response = await ExternalAPI.SearchMapbox(value);
      response && setSearchData(response);
    }
  }, []);

  const handleSearchValue = (value: string) => {
    if (getValues()) reset({ ...getValues(), line1: value });
    setSearch(value);
  };

  const handleSelect = (data: Feature) => {
    setSearchData(null);
    if (handleSelectAddress) {
      handleSelectAddress(data, getValues);
    }
  };
  const handleSuggestionBox = () => {
    setSuggestionBox(true);
  };
  const handleInputFocusOut = () => {
    setSuggestionBox(false);
  };

  useEffect(() => {
    if (initialValue) {
      reset(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => { }, [searchData]);

  useEffect(() => {
    handleSearchAddress(debouncedValue);
  }, [debouncedValue, handleSearchAddress]);

  return (
    <Form useFormReturn={useFormReturn} onSubmit={onSubmit} className="w-full flex-1 flex flex-col">
      <section className="p-2 sm:p-4 bg-gray-blue-1 flex-1">
        <div
          className={classNames('p-4 md:px-8 rounded-lg bg-white border border-gray-blue-2', formCardBorderClassName)}
        >
          {!isStepForm && <h3 className="font-bold">Location Details</h3>}

          <div className={classNames('mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0', formColClassName)}>
            <div className={classNames('md:w-1/2 space-y-4', formColInnerClassName)}>
              <Form.Select
                label="City"
                name="cityID"
                isSearchable={true}
                options={cities?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
                onChange={(e) => handleSelectCity(e, setValue)}
              />
              <Form.Select
                label="Submarket"
                name="subMarketID"
                isSearchable={true}
                options={submarkets?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
                cascadeId={cityId}
              />
              <Form.Select
                label="Microdistrict"
                name="microDistrictID"
                isSearchable={true}
                options={districts?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
                cascadeId={cityId}
              />
              <Form.Input label="Zip Code" name="zipCode" inputClassName={inputClassName} />
              <Form.Select label="Address Tag" name="addressTag" options={DropdownOption.AddressTag} />

              <div className={classNames('flex gap-2 md:w-full')}>
                <div className="md:w-1/2">
                  <Form.Input label="GPS Latitude" name="latitude" inputClassName={inputClassName} />
                </div>
                <div className="md:w-1/2">
                  <Form.Input label="GPS Longitude" name="longitude" inputClassName={inputClassName} />
                </div>
              </div>
              <Form.Input label="Polygon Points" name="polygonPoints" inputClassName={inputClassName} />
            </div>

            <div className={classNames('md:w-1/2', formColInnerTwoClassName)}>
              <div className="relative w-full group">
                <Form.Input
                  label="Address 1"
                  name="line1"
                  inputClassName={inputClassName}
                  onKeyUp={({ currentTarget }) => handleSearchValue(currentTarget.value)}
                  onFocus={handleSuggestionBox}
                  onBlurCapture={handleInputFocusOut}
                />
                {searchData && (
                  <SuggestionBox searchData={searchData} handleOnClick={handleSelect} suggestionBox={suggestionBox} />
                )}
              </div>
              <Form.Input label="Address 2" name="line2" inputClassName={inputClassName} />
              {children}
            </div>
          </div>
          {isStepForm && (
            <div className="mt-4 flex flex-col md:flex-row md:divide-x space-y-4 md:space-y-0 md:space-x-4">
              <div className="md:w-full space-y-4 flex justify-center">
                <Button onClick={handleTabPropertyLocationForm} btnType="secondary-gray" className="w-full">
                  Cancel
                </Button>
              </div>
              <div className="md:w-full space-y-4 flex justify-center">
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {!isStepForm && (
        <div className="sticky p-4 border-t bottom-0 bg-white h-[72px]">
          <div className="flex justify-between">
            <Button btnType="link" type="button" onClick={goToPrevStep} icon={<ChevronLeftIcon className="h-6 w-5" />}>
              PREVIOUS STEP
            </Button>
            <Button className="ml-auto" suffix={<ChevronRightIcon className="h-6 w-5" />}>
              NEXT STEP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default LocationDetailsForm;
