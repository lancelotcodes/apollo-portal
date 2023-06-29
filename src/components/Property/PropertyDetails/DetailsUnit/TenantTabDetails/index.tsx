import Loader from '@/components/core/Loader';
import { useTenantClassificationListQuery } from '@/infrastructure/store/api/lookup/lookup-api';
import { useAgentListQuery } from '@/infrastructure/store/api/property/property-api';
import {
  usePropertyContractsByIdQuery,
  useSavePropertyContractMutation,
} from '@/infrastructure/store/api/stacking/stacking-api';
import { PropertyContractRequest, PropertyContractsById } from '@/infrastructure/store/api/stacking/stacking-types';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import TenantDetailsForm from '../../CreateUnitPage/CreateUnitForms/TenantDetailsForm/TenantDetailsForm';
import TenantTable from './TenantTable';
import { SubmitHandler } from 'react-hook-form';
import { HandleNotification } from '@/components/core/ToastAlert';
import { useCompanyListQuery } from '@/infrastructure/store/api/company/company-api';
import { useContactListQuery } from '@/infrastructure/store/api/contact/contact-api';

const TenantTabDetailsContainer: React.FC = () => {
  const [contractInfo, setContractInfo] = useState<PropertyContractsById>();
  const [addContract, setAddContract] = useState<boolean>(true);
  const { selectedUnitDetails } = useAppSelector((state) => state['unit-list']);

  const [saveContract] = useSavePropertyContractMutation();

  const { data: companyList, isLoading: isCompanyListLoading } = useCompanyListQuery(null);
  const { data: contactList, isLoading: isContactListLoading } = useContactListQuery(null);
  const { data: agentList, isLoading: isAgentListLoading } = useAgentListQuery(null);
  const { data: tenantClassificationList, isLoading: isTenantClassificationListLoading } =
    useTenantClassificationListQuery(null);

  const {
    data: contractDetails,
    isLoading: isContractDetailsLoading,
    isFetching: isContractDetailsFetching,
  } = usePropertyContractsByIdQuery(selectedUnitDetails?.propertyID ?? skipToken);

  const onSubmitTenant: SubmitHandler<PropertyContractRequest> = async (e) => {
    const res = await saveContract({
      ...e,
      id: contractInfo?.id ? contractInfo.id : 0,
      propertyID: Number(selectedUnitDetails?.propertyID),
      estimatedArea: Number(e?.estimatedArea),
      leaseTerm: Number(e?.leaseTerm),
      closingRate: Number(e?.closingRate),
    }).unwrap();
    res && res?.message && HandleNotification(res.message, res.success);
    setContractInfo(undefined);
  };

  const handleUpdateContract = (contract: PropertyContractsById) => {
    setContractInfo(contract);
    setAddContract(false);
  };

  // Query IsLoading true
  const loading =
    isCompanyListLoading ||
    isAgentListLoading ||
    isContactListLoading ||
    isTenantClassificationListLoading ||
    isContractDetailsLoading ||
    isContractDetailsFetching;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TenantDetailsForm
          onSubmitTenant={onSubmitTenant}
          contractInfo={contractInfo}
          isTenantTabForm={true}
          companyList={companyList?.data}
          contactList={contactList?.data}
          agents={agentList?.data}
          tenantClassificationList={tenantClassificationList?.data}
          addContract={addContract}
          setAddContract={setAddContract}
          selectedUnitInfo={selectedUnitDetails}
        >
          <div key="TenantDetails">
            <TenantTable
              TenantTableData={contractDetails?.data}
              handleUpdateContract={handleUpdateContract}
              setAddContract={setAddContract}
            />
          </div>
        </TenantDetailsForm>
      )}
    </>
  );
};

export default TenantTabDetailsContainer;
