import Loader from '@/components/core/Loader';
import { FCC } from '@/helpers/FCC';
import { StepHelpers } from '@/hooks/useStep';
import { useTenantClassificationListQuery } from '@/infrastructure/store/api/lookup/lookup-api';
import { useAgentListQuery } from '@/infrastructure/store/api/property/property-api';
import { PropertyContractRequest, PropertyContractsById } from '@/infrastructure/store/api/stacking/stacking-types';
import React, { useState } from 'react';
import TenantDetailsForm from './TenantDetailsForm';
import { SubmitHandler } from 'react-hook-form';
import { SessionUtils } from '@/helpers/session-storage';
import { SessionOptions } from '@/constant/SessionOptions';
import {
  useBuildingFloorUnitByIdQuery,
  usePropertyContractsByIdQuery,
  useSavePropertyContractMutation,
} from '@/infrastructure/store/api/stacking/stacking-api';
import { HandleNotification } from '@/components/core/ToastAlert';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import TenantTable from '../../../DetailsUnit/TenantTabDetails/TenantTable';
import { useCompanyListQuery } from '@/infrastructure/store/api/company/company-api';
import { useContactListQuery } from '@/infrastructure/store/api/contact/contact-api';

const TenantFormContainer: FCC<StepHelpers> = ({ goToPrevStep, goToNextUnitStep }) => {
  const [contractInfo, setContractInfo] = useState<PropertyContractsById>();
  const [unitId] = useState<number | undefined>(
    SessionUtils.getItem(SessionOptions.unitId) ? SessionUtils.getItem(SessionOptions.unitId) : undefined,
  );
  const [propertyId] = useState<number | undefined>(
    SessionUtils.getItem(SessionOptions.propertyId) ? SessionUtils.getItem(SessionOptions.propertyId) : undefined,
  );

  const [saveContract] = useSavePropertyContractMutation();

  const { data: companyList, isLoading: isCompanyListLoading } = useCompanyListQuery(null);
  const { data: contactList, isLoading: isContactListLoading } = useContactListQuery(null);
  const { data: agentList, isLoading: isAgentListLoading } = useAgentListQuery(null);
  const { data: tenantClassificationList, isLoading: isTenantClassificationListLoading } =
    useTenantClassificationListQuery(null);
  const { data: buildingUnitDetails, isLoading: isBuildingUnitDetailsLoading } = useBuildingFloorUnitByIdQuery(
    unitId ?? skipToken,
  );

  const {
    data: contractDetails,
    isLoading: isContractDetailsLoading,
    isFetching: isContractDetailsFetching,
  } = usePropertyContractsByIdQuery(propertyId ?? skipToken);

  const onSubmitTenant: SubmitHandler<PropertyContractRequest> = async (e) => {
    const res = await saveContract({
      ...e,
      id: contractInfo?.id ? contractInfo.id : 0,
      propertyID: Number(propertyId),
      estimatedArea: Number(e?.estimatedArea),
      leaseTerm: Number(e?.leaseTerm),
      closingRate: Number(e?.closingRate),
    }).unwrap();
    res && res?.message && HandleNotification(res.message, res.success);
    setContractInfo(undefined);
  };

  const handleUpdateContract = (contract: PropertyContractsById) => {
    setContractInfo(contract);
  };

  // Query IsLoading true
  const loading =
    isCompanyListLoading ||
    isAgentListLoading ||
    isContactListLoading ||
    isTenantClassificationListLoading ||
    isContractDetailsLoading ||
    isContractDetailsFetching ||
    isBuildingUnitDetailsLoading;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TenantDetailsForm
          onSubmitTenant={onSubmitTenant}
          contractInfo={contractInfo}
          goToPrevStep={goToPrevStep}
          goToNextUnitStep={goToNextUnitStep}
          unitDetails={buildingUnitDetails?.data}
          companyList={companyList?.data}
          contactList={contactList?.data}
          agents={agentList?.data}
          tenantClassificationList={tenantClassificationList?.data}
          contractListLength={contractDetails?.data?.length}
        >
          {/* Passing tenant table as children to show listing below tenant form */}
          <div key="CreateUnitTenant">
            <TenantTable TenantTableData={contractDetails?.data} handleUpdateContract={handleUpdateContract} />
          </div>
        </TenantDetailsForm>
      )}
    </>
  );
};

export default TenantFormContainer;
