import React from 'react';
import { classNames } from '@/helpers/classNames';
import { PropertySEORequest } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon, PencilAltIcon } from '@heroicons/react/solid';
import Accordion from '@/components/core/Accordion';
import {
  usePropertySEOQuery,
  usePropertyTypesListQuery,
  useSavePropertySEOMutation,
} from '@/infrastructure/store/api/property/property-api';
import Loader from '@/components/core/Loader';
import { HandleNotification } from '@/components/core/ToastAlert';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { SubmitHandler } from 'react-hook-form';
import AuditDetailsAccordion from '@/components/core/PropertyDetailsComponent/Accordions/AuditDetailsAccordion/AuditDetailsAccordion';
import AuditDetailsForm from '@/components/core/PropertyDetailsComponent/Accordions/AuditDetailsAccordion/AuditDetailsForm';

interface Props {
  propertyID?: number | string;
  isTabForm?: boolean | null | undefined;
}
const SEODetailsAccordionContainer: React.FC<Props> = ({ propertyID, isTabForm }) => {
  const [propertySEOForm, setPropertySEOForm] = React.useState<boolean>(false);
  const handleTabPropertyForm = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent> | undefined,
    value?: boolean | string,
  ) => {
    if (value === 'show') {
      setPropertySEOForm(true);
    } else {
      setPropertySEOForm(!propertySEOForm);
      event?.stopPropagation();
    }
  };
  const {
    data: propertySEOInfo,
    isLoading: propertySEOLoading,
    isFetching,
  } = usePropertySEOQuery(propertyID ?? skipToken);
  const { data: propertyTypes } = usePropertyTypesListQuery(null);
  const [savePropetySEO] = useSavePropertySEOMutation();
  const onSubmit: SubmitHandler<PropertySEORequest> = async (e) => {
    const res = await savePropetySEO({ ...e, propertyID: propertyID }).unwrap();
    res.message && HandleNotification(res.message, res.success);
    setPropertySEOForm(!propertySEOForm);
  };

  const loading = propertySEOLoading || isFetching;
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text text-gray-blue-5 hover:text-gray-blue-9 items-center">
            <div className="flex">
              {isTabForm && (
                <PencilAltIcon
                  onClick={(e) => handleTabPropertyForm(e, open ? true : 'show')}
                  className={classNames('h-5 w-5 mr-1 transition-transform')}
                />
              )}
              SEO DETAILS
            </div>
            <ChevronUpIcon
              className={classNames('h-5 w-5 transition-transform', !open ? 'rotate-180 transform' : '')}
            />
          </E>
        )}
      >
        {propertySEOForm && propertySEOInfo && (
          <>
            {isTabForm && loading ? (
              <div className="flex justify-center h-screen">
                <Loader />
              </div>
            ) : (
              <AuditDetailsForm
                onSubmit={onSubmit}
                initialValue={propertySEOInfo?.data}
                propertyTypes={propertyTypes?.data}
                formColClassName="md:flex-col md:space-x-0 md:divide-x-0"
                formColInnerClassName="md:w-full md:ml-0"
                formCardBorderClassName="border-0 p-0 md:px-0"
                inputClassName="py-1"
                handleTabPropertyForm={handleTabPropertyForm}
              />
            )}
          </>
        )}
        {!propertySEOForm && propertySEOInfo?.data && <AuditDetailsAccordion {...propertySEOInfo?.data} />}
        {!propertySEOForm && propertySEOInfo?.data === null && (
          <p className="mt-2 px-4 pb-4">{InfoMessages.DataNotFound}</p>
        )}
      </Accordion>
    </div>
  );
};

export default SEODetailsAccordionContainer;
