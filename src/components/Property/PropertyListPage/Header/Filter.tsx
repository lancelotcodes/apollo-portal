import React, { useCallback, useState } from 'react';
import Dialog from '@/components/core/Dialog';
import Form from '@/components/core/Form';
import { FilterIcon } from '@/components/core/Icon';
import IconButton from '@/components/core/IconButton';
// import { zoningClassificationOptions } from '@/constant/zoning-clasification';
import { useDialogState } from '@/hooks/useDialogState';
import { useForm } from 'react-hook-form';
import {
  FilterPayloadPropertyListOptions,
  // FilterPropertyListOptions,
  ZoningClassification,
} from '@/infrastructure/store/features/property-list/property-list-type';
import Button from '@/components/core/Button';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { setFilter } from '@/infrastructure/store/features/property-list/property-list-slice';
// import { appThemeColors } from '@/infrastructure/themes/colors';
import { useGradeListQuery, usePropertyTypesListQuery } from '@/infrastructure/store/api/property/property-api';
import {
  useCityListQuery,
  useCityMicroDistrictsListQuery,
  useCitySubMarketsListQuery,
} from '@/infrastructure/store/api/lookup/lookup-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ISelectOption } from '@/infrastructure/store/api/lookup/lookup-type';
import { useEffect } from 'react';
import { GradeDetails, PropertyTypeDetails } from '@/infrastructure/store/api/property/property-type';

const Filter: React.FC = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const dispatch = useAppDispatch();

  const { classification, published, location, city, submarket, microdistrict, propertyType, grade } = useAppSelector(
    (app) => app['property-list'].filter,
  );
  // TODO: check if we could include property classification on each property type
  const { data: propertyTypes } = usePropertyTypesListQuery(null);

  const useFormReturn = useForm<FilterPayloadPropertyListOptions>({
    defaultValues: {
      classification,
      published,
      location,
      city: city?.id,
      submarket: submarket?.id,
      microdistrict: microdistrict?.id,
      propertyType: propertyType?.id,
      grade: grade?.id,
    },
    mode: 'onChange',
  });
  const { setValue, reset, getValues } = useFormReturn;

  const [cityId, setCityId] = useState<number | undefined>(undefined);
  const [cityName, setCityName] = useState<ISelectOption | any | null>(null);
  const [subMarketName, setSubMarketName] = useState<ISelectOption | any | null>(null);
  const [microDistrictName, setMicroDistrictName] = useState<ISelectOption | any | null>(null);
  const [propertyTypeName, setPropertyTypeName] = useState<PropertyTypeDetails | any | null>(null);
  const [propertyGradeName, setPropertyGradeName] = useState<GradeDetails | any | GradeDetails[] | null>(null);

  const { data: cityList } = useCityListQuery(null);
  const { data: submarketList } = useCitySubMarketsListQuery(cityId ?? skipToken);
  const { data: microdistrictsList } = useCityMicroDistrictsListQuery(cityId ?? skipToken);
  const { data: gradeList } = useGradeListQuery(propertyTypeName?.id ?? skipToken);

  function handleSelectCity(e: any) {
    setCityId(e.value);
    setCityName({ id: e.value, name: e.name });
    setSubMarketName([]);
    setMicroDistrictName([]);
  }
  function handleSelectSubMarket(e: any) {
    setSubMarketName({ id: e.value, name: e.name });
  }
  function handleSelectMicroDistrict(e: any) {
    setMicroDistrictName({ id: e.value, name: e.name });
  }
  function handleSelectPropertyType(e: any) {
    setPropertyTypeName({ id: e.value, name: e.name });
  }
  function handleSelectGrade(e: any) {
    setPropertyGradeName({ id: e.value, name: e.name });
  }
  const resetFilterPropertyOption = useCallback(() => {
    setCityName([]);
    setSubMarketName([]);
    setMicroDistrictName([]);
    setPropertyTypeName([]);
    setPropertyGradeName([]);
  }, [setCityName, setSubMarketName, setMicroDistrictName, setPropertyTypeName, setPropertyGradeName]);

  const onSubmit = async (e: any) => {
    dispatch(
      setFilter({
        city: cityName || null,
        submarket: subMarketName || null,
        microdistrict: microDistrictName || null,
        propertyType: propertyTypeName || null,
        grade: propertyGradeName || null,
        location: e.location,
        classification: e.classification as ZoningClassification[],
        published: e.published,
      }),
    );
    setCloseDialog();
  };
  useEffect(() => {
    setValue('city', city?.id);
    setValue('submarket', submarket?.id);
    setValue('microdistrict', microdistrict?.id);
    setValue('propertyType', propertyType?.id);
    setValue('grade', grade?.id);
  }, [city, submarket, microdistrict, propertyType, grade, setCityId, setValue, getValues, reset]);

  return (
    <>
      <IconButton onClick={setOpenDialog} className="p-2 text-gray-blue-6">
        <FilterIcon />
      </IconButton>

      <Dialog size="xl" closeDialog={setCloseDialog} modalState={isOpen} title="Filter">
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <div className="space-y-4">
            <Form.Select
              key={getValues('city')}
              label="City"
              name="city"
              isSearchable={true}
              options={cityList?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              value={cityName}
              onChange={handleSelectCity}
            />
            <Form.Select
              label="Submarket"
              name="submarket"
              isSearchable={true}
              options={submarketList?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              value={subMarketName}
              onChange={handleSelectSubMarket}
              cascadeId={cityName?.id}
            />
            <Form.Select
              label="Microdistrict"
              name="microdistrict"
              isSearchable={true}
              options={microdistrictsList?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              value={microDistrictName}
              onChange={handleSelectMicroDistrict}
              cascadeId={cityName?.id}
            />
            <Form.Select
              label="Property Type"
              name="propertyType"
              placeholder="No Selected"
              options={propertyTypes?.data.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              value={propertyTypeName}
              onChange={handleSelectPropertyType}
            />
            <Form.Select
              label="Grade"
              name="grade"
              placeholder="No Selected"
              options={gradeList?.data.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              value={propertyGradeName}
              onChange={handleSelectGrade}
              cascadeId={propertyTypeName?.id}
            />
            {/* <Form.Select
              isMulti
              label="Zoning Classification"
              name="classification"
              placeholder="No Selected"
              options={zoningClassificationOptions}
              renderValueStyles={(data) => ({
                background:
                  data.value === 'Industrial'
                    ? appThemeColors['orange-6']
                    : data.value === 'Commercial'
                      ? appThemeColors['pink-6']
                      : data.value === 'Residential'
                        ? appThemeColors['blue-6']
                        : appThemeColors['green-6'],
                color: appThemeColors.white,
              })}
            /> */}

            {/* <Form.Radio
              name="published"
              label="Published on the website"
              options={[
                { name: 'Show All', value: 'Show All' },
                { name: 'Published', value: 'Published' },
                { name: 'Not Published', value: 'Not Published' },
              ]}
            /> */}
          </div>

          <div className="flex justify-between mt-4">
            <Button type="button" onClick={() => resetFilterPropertyOption()}>
              CLEAR
            </Button>
            <Button type="submit" className="px-10">
              APPLY
            </Button>
          </div>
        </Form>
      </Dialog>
    </>
  );
};

export default Filter;
