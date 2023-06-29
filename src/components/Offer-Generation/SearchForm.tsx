import React from 'react';
import { DropdownOption } from '@/constant/DropdownOptions';
import { propertyTypeIcons } from '@/constant/propertyTypeOptions';
import { offerSearchFormResolver, offerSearchFormType } from '@/form-resolvers/offer-generation/offerSearchForm';
import { FCC } from '@/helpers/FCC';
import {
  useCitiesByProvinceIdsQuery,
  useCitySubMarketsListByCityIdsQuery,
  usePropertyTypesListQuery,
  useProvinceListQuery,
  useUnitHandOverConditionQuery,
  useUnitListingTypeQuery,
} from '@/infrastructure/store/api/lookup/lookup-api';
import { OfferOptionParam } from '@/infrastructure/store/api/offer/offer-type';
import {
  setOfferGenerationSearchValue,
  setOfferGenerationSelectedIds,
} from '@/infrastructure/store/features/offer-generation/offer-generation-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { appThemeColors } from '@/infrastructure/themes/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';
import { MultiValue } from 'react-select';
import Button from '../core/Button';
import Form from '../core/Form';
import { SearchIcon } from '../core/Icon';
import Tag from '../core/Tag';
import { useAgentListQuery } from '@/infrastructure/store/api/property/property-api';

interface Props {
  getOffers: (arg: OfferOptionParam) => void;
}

const SearchForm: FCC<Props> = ({ getOffers }) => {
  const { ...defaultValues } = useAppSelector((app) => app['offer-generation'].search);
  const [cityId, setCityId] = useState<number[] | undefined>(undefined);
  const [provinceIds, setProvinceIds] = useState<number[] | undefined>(undefined);

  const useFormReturn = useForm<offerSearchFormType>({
    resolver: yupResolver(offerSearchFormResolver),
    defaultValues,
  });

  const { setValue } = useFormReturn;
  const dispatch = useAppDispatch();

  const { data: propertyTypes } = usePropertyTypesListQuery(null);
  const { data: listingType } = useUnitListingTypeQuery(null);
  const { data: handOverCondition } = useUnitHandOverConditionQuery(null);
  const { data: agentList } = useAgentListQuery(null);
  const { data: provincesList } = useProvinceListQuery(null);
  const { data: cities } = useCitiesByProvinceIdsQuery(provinceIds ?? skipToken);
  const { data: subMarkets } = useCitySubMarketsListByCityIdsQuery(cityId ?? skipToken);

  function handleSelectProvince(
    e: MultiValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<offerSearchFormType>,
  ) {
    const ids = e?.map((id) => id?.value);
    setProvinceIds(ids);
    setValue('CitiesIds', []);
    setValue('ProvinceIds', ids);
  }

  function handleSelectCity(
    e: MultiValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<offerSearchFormType>,
  ) {
    const ids = e?.map((id) => id?.value);
    setCityId(ids);
    setValue('SubMarketsIds', []);
    setValue('CitiesIds', ids);
  }

  const onSubmit = (e: offerSearchFormType) => {
    getOffers(e);
    dispatch(setOfferGenerationSearchValue(e));
    dispatch(setOfferGenerationSelectedIds({}));
  };

  return (
    <Form onSubmit={onSubmit} useFormReturn={useFormReturn} className="pb-4 w-full lg:w-1/2">
      <div className="space-y-4">
        <Form.Select
          isSearchable
          isMulti={false}
          label="Property Type"
          name="PropertyTypeID"
          placeholder="No Selected"
          components={{
            SingleValue: (props) => {
              return props?.data?.value ? (
                <Tag
                  Icon={propertyTypeIcons[props?.data?.value]()}
                  className="inline col-start-1 row-start-1 w-32"
                  value={props?.data?.name}
                  type={'zoning-commercial'}
                />
              ) : (
                <></>
              );
            },
          }}
          options={propertyTypes?.data
            ?.filter((x) => x.name === 'Office Building')
            .map((option) => ({
              value: option.id,
              name: option.name,
            }))}
        />

        {useFormReturn.watch('PropertyTypeID') ? (
          <>
            <Form.Select
              isMulti={false}
              label="Listing Type"
              name="ListingTypeID"
              placeholder="Select Listing Type"
              isClearable
              options={listingType?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
            />
            <Form.Select
              isMulti={false}
              label="Hand Over Condition"
              name="HandOverConditionID"
              placeholder="Select Listing Type"
              isClearable
              options={handOverCondition?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
            />
            <Form.Select
              label="Province"
              name="ProvinceIds"
              isSearchable={true}
              isMulti
              options={provincesList?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              renderValueStyles={() => ({
                background: appThemeColors['blue-6'],
                color: appThemeColors.white,
              })}
              onChange={(e) => handleSelectProvince(e, setValue)}
            />
            <Form.Select
              label="City"
              name="CitiesIds"
              isSearchable={true}
              isMulti
              options={cities?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              renderValueStyles={() => ({
                background: appThemeColors['blue-6'],
                color: appThemeColors.white,
              })}
              onChange={(e) => handleSelectCity(e, setValue)}
            />
            <Form.Select
              label="Sub Market"
              name="SubMarketsIds"
              isSearchable={true}
              isMulti
              isClearable
              options={subMarkets?.data?.map((option) => ({
                value: option.id,
                name: option.name,
              }))}
              renderValueStyles={() => ({
                background: appThemeColors['blue-6'],
                color: appThemeColors.white,
              })}
              // cascadeId={cityId}
            />
            <Form.Select
              label="Agent"
              name="AgentID"
              options={agentList?.data?.map((option) => ({
                value: option.id,
                name: `${option.firstName} ${option.lastName}`,
              }))}
            />
            <Form.Select label="Peza" name="PEZA" isClearable options={DropdownOption.PEZAStatus} />

            {/* 
            <Form.Select
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

            <div className="flex gap-4">
              <Form.Input
                className="w-1/2"
                type="number"
                name="MinSize"
                label="Min Size (SQM)"
                placeholder="Min Size (SQM)"
              />
              <Form.Input
                className="w-1/2"
                type="number"
                name="MaxSize"
                label="Max Size (SQM)"
                placeholder="Max Size (SQM)"
              />
            </div>
            <Form.Checkbox label="24/7" name="OperatingHours" />
          </>
        ) : (
          <span className="w-full text-xs font-semibold text-gray-600">To begin, select a property type</span>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <Button icon={<SearchIcon />} type="submit" className="w-full">
          SEARCH
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
