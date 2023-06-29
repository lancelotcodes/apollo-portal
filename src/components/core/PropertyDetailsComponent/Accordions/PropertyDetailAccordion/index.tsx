import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import PropertyDetailsForm from '@/components/Property/CreatePropertyPage/PropertyForms/PropertyDetailsForm/PropertyDetailsForm';
import { classNames } from '@/helpers/classNames';
import { useCompanyListQuery } from '@/infrastructure/store/api/company/company-api';
import { useContactListQuery } from '@/infrastructure/store/api/contact/contact-api';
import {
  useCreatePropertyMutation,
  useGradeListQuery,
  usePropertyByIDQuery,
  usePropertyShortListQuery,
  usePropertyTypesListQuery,
} from '@/infrastructure/store/api/property/property-api';
import { CreatePropertyRequest, PropertyResponse } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { UseFormSetValue, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SingleValue } from 'react-select';
import Accordion from '../../../Accordion';
import PropertyDetailAccordion from './PropertyDetailAccordion';

interface Props {
  property: PropertyResponse;
  isTabForm?: boolean | null | undefined;
}

const PropertyDetailAccordionContainer: React.FC<Props> = ({ property, isTabForm }) => {
  const { propertyId } = useParams();
  const [propertyID] = useState<number | undefined>(propertyId ? parseInt(propertyId) : undefined);
  const [propertyForm, setPropertyForm] = useState<boolean>(false);
  const {
    data: propertyInfo,
    isLoading: isPropertyLoading,
    isFetching,
  } = usePropertyByIDQuery(propertyID ?? skipToken);
  const { data: propertyTypes, isLoading: propertyTypesLoading } = usePropertyTypesListQuery(null);
  const { data: masterProperties, isLoading: propertyShortListLoading } = usePropertyShortListQuery(null);
  const { data: companyList } = useCompanyListQuery(null);
  const { data: contactList } = useContactListQuery(null);
  const [propertyTypeId, setPropertyTypeId] = React.useState<number | undefined>(propertyInfo?.data?.propertyTypeID);
  const { data: gradeList } = useGradeListQuery(propertyTypeId ?? skipToken);
  const [saveProperty] = useCreatePropertyMutation();

  function handleSelectPropertyType(
    newValue: SingleValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<CreatePropertyRequest>,
  ) {
    if (newValue) {
      setPropertyTypeId(newValue.value);
      setValue('propertyTypeID', newValue.value);
      setValue('gradeID', undefined);
    }
  }

  const handleTabPropertyForm = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setPropertyForm(true);
    } else {
      setPropertyForm(!propertyForm);
      event?.stopPropagation();
    }
  };

  const onSubmit: SubmitHandler<CreatePropertyRequest> = async (payload) => {
    const res = await saveProperty(payload).unwrap();
    res?.message && HandleNotification(res.message, res.success);
    setPropertyForm(false);
  };

  useEffect(() => {
    console.log(propertyTypeId);
  }, [propertyTypeId]);

  const loading = isPropertyLoading || isFetching || propertyTypesLoading || propertyShortListLoading;

  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        defaultOpen
        title="PROPERTY DETAILS"
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleTabPropertyForm(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform', !open)}
                />
              )}
              PROPERTY DETAILS
            </div>
            <ChevronUpIcon className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')} />
          </E>
        )}
      >
        {isTabForm && propertyForm && (
          <>
            {loading ? (
              <div className="flex justify-center h-screen">
                <Loader />
              </div>
            ) : (
              <PropertyDetailsForm
                onSubmit={onSubmit}
                owners={contactList?.data}
                companies={companyList?.data}
                grades={gradeList?.data}
                propertyTypes={propertyTypes?.data}
                contacts={contactList?.data}
                masterProperties={masterProperties?.data}
                initialValue={propertyInfo?.data}
                handleSelectPropertyType={handleSelectPropertyType}
                formColClassName="md:flex-col md:space-x-0 md:divide-x-0"
                formColInnerClassName="md:w-full md:ml-0"
                formColInnerTwoClassName="md:w-full md:ml-0"
                formCardBorderClassName="border-0 p-0 md:px-0"
                isStepForm={true}
                inputClassName="py-1"
                handleTabPropertyForm={handleTabPropertyForm}
                propertyTypeId={propertyTypeId}
              />
            )}
          </>
        )}
        {!propertyForm && <PropertyDetailAccordion {...property} />}
      </Accordion>
    </div>
  );
};

export default PropertyDetailAccordionContainer;
