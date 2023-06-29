import React, { useEffect, useState } from 'react';
import { FCC } from '@/helpers/FCC';
import { StepHelpers } from '@/hooks/useStep';
import {
  useCreatePropertyMutation,
  useGradeListQuery,
  usePropertyByIDQuery,
  usePropertyShortListQuery,
  usePropertyTypesListQuery,
} from '@/infrastructure/store/api/property/property-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useParams } from 'react-router-dom';
import PropertyDetailsForm from './PropertyDetailsForm';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import Loader from '@/components/core/Loader';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { propertyStepsChanged } from '@/infrastructure/store/features/property-create/property-create-slice';
import { HandleNotification } from '@/components/core/ToastAlert';
import { CreatePropertyRequest } from '@/infrastructure/store/api/property/property-type';
import { SingleValue } from 'react-select';
import { UseFormSetValue, SubmitHandler } from 'react-hook-form';
import { useCompanyListQuery } from '@/infrastructure/store/api/company/company-api';
import { useContactListQuery } from '@/infrastructure/store/api/contact/contact-api';

const PropertyDetailsFormContainer: FCC<StepHelpers> = ({ canGoToNextStep, goToNextStep }) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [propertyId] = useState<number | undefined>(
    id
      ? parseInt(id)
      : SessionUtils.getItem(SessionOptions.propertyId)
      ? SessionUtils.getItem(SessionOptions.propertyId)
      : undefined,
  );

  const { data: propertyInfo, isLoading: isPropertyLoading } = usePropertyByIDQuery(propertyId ?? skipToken);
  const dispatch = useAppDispatch();
  const { data: propertyTypes, isLoading: propertyTypesLoading } = usePropertyTypesListQuery(null);
  const { data: masterProperties, isLoading: propertyShortListLoading } = usePropertyShortListQuery(null);
  const { data: companyList } = useCompanyListQuery(null);
  const { data: contactList } = useContactListQuery(null);
  const [propertyTypeId, setPropertyTypeId] = useState<number | undefined>(propertyInfo?.data?.propertyTypeID);
  const { data: gradeList, isLoading: gradesLoading } = useGradeListQuery(propertyTypeId ?? skipToken);
  const [saveProperty] = useCreatePropertyMutation();

  // function use to reset grade dropdown on property change
  function handleSelectPropertyType(
    e: SingleValue<{ value: number; name: string }>,
    setValue: UseFormSetValue<CreatePropertyRequest>,
  ) {
    setIsEdit(true);
    setPropertyTypeId(e?.value);
    dispatch(propertyStepsChanged(e?.name));
    setValue('propertyTypeID', e?.value);
    setValue('gradeID', undefined);
  }

  const onSubmit: SubmitHandler<CreatePropertyRequest> = async (payload) => {
    const res = await saveProperty(payload).unwrap();
    res?.message && HandleNotification(res.message, res.success);
    SessionUtils.setItem(SessionOptions.propertyId, res.data.entityId);
    SessionUtils.setItem(SessionOptions.propertyName, payload?.name);
    const getSteps = SessionUtils.getItem('isStepValidated');
    SessionUtils.setItem('isStepValidated', JSON.stringify({ ...getSteps, isStep2: true }));
    canGoToNextStep && goToNextStep();
  };

  useEffect(() => {
    if (propertyInfo?.data && !isEdit) {
      dispatch(propertyStepsChanged(propertyInfo?.data?.propertyTypeName));
      setPropertyTypeId(propertyInfo.data.propertyTypeID);
    }
  }, [dispatch, isEdit, propertyTypeId, propertyInfo?.data]);

  // Query IsLoading true
  const loading = isPropertyLoading || propertyTypesLoading || propertyShortListLoading || gradesLoading;

  return (
    <>
      {!isEdit && loading ? (
        <Loader />
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
          isStepForm={false}
          formColClassName="md:divide-x md:space-x-4"
          formColInnerClassName="md:w-full md:pl-0 space-y-4"
          formColInnerTwoClassName="md:w-full md:pl-4 space-y-4"
          inputClassName="py-1"
          propertyTypeId={propertyTypeId}
        />
      )}
    </>
  );
};

export default PropertyDetailsFormContainer;
