import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { SearchIcon } from '@/components/core/Icon';
import React from 'react';
import Tag from '@/components/core/Tag';
import { propertyTypeIcons, propertyTypeOptions } from '@/constant/propertyTypeOptions';
import { propertySearchFormResolver } from '@/form-resolvers/property-search/property-search-form-resolver';
import { PropertySearchFormType } from '@/form-resolvers/property-search/property-search-form-type';
import { usePropertyListQuery } from '@/infrastructure/store/api/property/property-api';
import { setPropertySearchValue } from '@/infrastructure/store/features/property-search/property-search-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Accordion from '@/components/core/Accordion';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { classNames } from '@/helpers/classNames';

const radiusOptions = [5, 10, 15, 20, 25];

const SearchForm = () => {
  const { radius, keyword, listingType, propertyId, propertyType } = useAppSelector(
    (app) => app['property-search'].search,
  );
  const dispatch = useAppDispatch();

  const { data: properties } = usePropertyListQuery({ Query: '', PageSize: 20 });

  const useFormReturn = useForm<PropertySearchFormType>({
    resolver: yupResolver(propertySearchFormResolver),
    defaultValues: {
      radius,
      keyword,
      listingType,
      propertyId,
      propertyType,
    },
  });

  const onSubmit = (e: PropertySearchFormType) => {
    dispatch(setPropertySearchValue(e));
  };

  return (
    <section className="border border-gray-blue-2 rounded-lg bg-white mx-4">
      <Accordion
        defaultOpen
        title="PROPERTY DETAILS"
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 items-center">
            MARKET SEARCH FOR TENANTS
            <ChevronUpIcon className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')} />
          </E>
        )}
      >
        <Form onSubmit={onSubmit} useFormReturn={useFormReturn} className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Select
              isSearchable
              isMulti={false}
              label="Property Type"
              name="propertyType"
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
              options={propertyTypeOptions}
            />
            <Form.Input name="keyword" label="Keyword" placeholder="Keyword" />
            <Form.Select
              isMulti={false}
              label="Listing Type"
              name="listingType"
              placeholder="Select Listing Type"
              options={[
                {
                  name: 'Sale',
                  value: 'Sale',
                },
                {
                  name: 'Not For Sale',
                  value: 'Not For Sale',
                },
              ]}
            />

            <div className="">
              <span className="mb-1 w-full typography-label font-medium text-gray-7">Radius</span>
              <div className="flex gap-2 items-start h-[42px]">
                {radiusOptions.map((e) => (
                  <Tag
                    key={e.toString()}
                    value={`+${e}`}
                    className="cursor-pointer hover:text-white hover:bg-blue-5 hover:border hover:border-blue-7"
                    onClick={() => useFormReturn.setValue('radius', e)}
                    type={useFormReturn.watch('radius') === e ? 'selected' : 'primary'}
                  />
                ))}
              </div>
            </div>

            <Form.Select
              isSearchable
              isMulti={false}
              label="Property Name"
              name="propertyId"
              placeholder="Select Property"
              options={
                properties?.success
                  ? properties?.data.items.map((e) => ({
                      name: e.name,
                      value: e.id,
                    }))
                  : []
              }
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button icon={<SearchIcon />} type="submit">
              SEARCH
            </Button>
          </div>
        </Form>
      </Accordion>
    </section>
  );
};

export default SearchForm;
