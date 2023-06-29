import { DropdownOption } from '@/constant/DropdownOptions';
import {
  OfferGenerationSendOfferFormType,
  OfferGenerationSendOfferFormResolver,
  NewClientFormResolver,
  NewContactFormResolver,
  NewContactFormType,
  NewCompanyFormType,
} from '@/form-resolvers/offer-generation/offer-generation-send-offer';
import { serializeQuery } from '@/helpers/UrlHelper/query-param';
import { EndPoint } from '@/infrastructure/store/api/axios/end-points';
import { ExportFile } from '@/infrastructure/store/api/axios/file-api';
import { useCompanyListQuery, useSaveCompanyMutation } from '@/infrastructure/store/api/company/company-api';
import {
  useLazyContactListByCompanyIDQuery,
  useLazyContactListQuery,
  useSaveContactMutation,
} from '@/infrastructure/store/api/contact/contact-api';
import { ISelectOption } from '@/infrastructure/store/api/lookup/lookup-type';
import { useSaveSendOfferOnEmailMutation } from '@/infrastructure/store/api/offer/offer-api';
import { SendOfferOnEmailRequest } from '@/infrastructure/store/api/offer/offer-type';
import { useAgentListQuery } from '@/infrastructure/store/api/property/property-api';
import {
  setOfferGenerationSelectedIds,
  setOfferGenerationSelectedUnitIds,
  setSendToClientDialogState,
} from '@/infrastructure/store/features/offer-generation/offer-generation-slice';
import { toggleCreateNewClientDialog } from '@/infrastructure/store/features/property-list/property-list-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import Button from '../core/Button';
import Dialog from '../core/Dialog';
import Form from '../core/Form';
import { AddIcon } from '../core/Icon';
import { HandleNotification } from '../core/ToastAlert';

const SendOfferDialog: React.FC<{
  offerDialogName: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ offerDialogName, setLoading }) => {
  const { search, selectedUnitIds, sendToClientDialogState } = useAppSelector((app) => app['offer-generation']);

  const [isClientTypeContact, setIsClientTypeContact] = useState(false);
  const [isClientTypeCompany, setIsClientTypeCompany] = useState(false);

  const dispatch = useAppDispatch();

  const useFormReturn = useForm<OfferGenerationSendOfferFormType>({
    resolver: yupResolver(OfferGenerationSendOfferFormResolver),
    defaultValues: {
      message: '',
      subject: '',
      client: 'CONTACT',
    },
  });

  const { setValue, getValues, reset } = useFormReturn;

  const { data: agentList } = useAgentListQuery(null);
  const { data: companyList } = useCompanyListQuery(null);
  const [triggerContacts, { data: contactList }] = useLazyContactListQuery();
  const [triggerCompanyContact, { data: companyContacts }] = useLazyContactListByCompanyIDQuery();
  const [contacts, setContacts] = useState(contactList?.data);

  useEffect(() => {
    triggerContacts(null);
    setContacts(contactList?.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactList, setContacts]);

  useEffect(() => {
    setContacts(companyContacts?.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyContacts, setContacts]);

  const [saveSendOfferOnEmail, state] = useSaveSendOfferOnEmailMutation();

  const onSubmit = async (e: OfferGenerationSendOfferFormType) => {
    const offerPayload: SendOfferOnEmailRequest = {
      ...e,
      propertyTypeID: search.PropertyTypeID,
      listingTypeID: search.ListingTypeID,
      peza: search.PEZA,
      operatingHours: search.OperatingHours,
      handOverConditionID: search.HandOverConditionID,
      minSize: search.MinSize,
      maxSize: search.MaxSize,
      cityIds: search.CitiesIds,
      provinceIds: search.ProvinceIds,
      subMarketIds: search.SubMarketsIds,
      unitIds: selectedUnitIds.reduce((acc, current) => acc.concat(current?.AllUnitIds), [] as number[]),
    };
    if (offerDialogName === 'EMAIL') {
      const res = await saveSendOfferOnEmail(offerPayload).unwrap();
      res && res.message && HandleNotification(res.message, res.success);
      if (res && res.success) {
        dispatch(setSendToClientDialogState(false));
        dispatch(setOfferGenerationSelectedIds({}));
        dispatch(setOfferGenerationSelectedUnitIds({ propertyId: null, AllUnitIds: [] }));
      }

      reset({
        contactID: undefined,
        companyID: undefined,
        templateType: undefined,
        subject: '',
        message: '',
        toEmail: '',
        ccEmail: '',
        client: 'CONTACT',
      });
    } else if (offerDialogName === 'EXPORT') {
      dispatch(setSendToClientDialogState(false));
      setLoading(true);
      await ExportFile(`${EndPoint.EXPORTOFFERS}?${serializeQuery(offerPayload)}`);
      setLoading(false);
      reset({
        contactID: undefined,
        companyID: undefined,
        templateType: undefined,
        agentID: undefined,
      });
    }
  };

  useEffect(() => {
    reset({
      client: 'CONTACT',
      templateType: 2,
      offerOnEmail: offerDialogName === 'EMAIL' ? 'EMAILOFFER' : '',
    });
  }, [reset, setValue, offerDialogName]);

  const handleClientTypeDialogClose = () => {
    setValue('contactID', undefined);
    setValue('companyID', undefined);
    setValue('toEmail', '');
    setValue('client', 'CONTACT');
    setContacts(contactList?.data);
    dispatch(setSendToClientDialogState(false));
  };

  const handleClientType = (e: SingleValue<{ value: string; name: string }>) => {
    setValue('contactID', undefined);
    setValue('toEmail', '');
    if (e?.value === 'CONTACT') {
      triggerContacts(null);
      contactList?.data && setContacts(contactList?.data);
      setValue('companyID', undefined);
    }
    if (e) {
      setValue('client', e?.value);
    }
  };

  const handleCompanyDetails = (e: SingleValue<{ value: number; name: string }>) => {
    setValue('companyID', e?.value);
    e?.value && triggerCompanyContact(e?.value);
    companyContacts?.data && setContacts(companyContacts?.data);
  };

  const handleContactDetails = (e: SingleValue<{ value: number; name: string }>) => {
    setValue('contactID', e?.value);
    offerDialogName === 'EMAIL' && setValue('toEmail', contactList?.data?.find((x) => x?.id === e?.value)?.email || '');
  };

  return (
    <Dialog
      size="lg"
      modalState={sendToClientDialogState}
      closeDialog={handleClientTypeDialogClose}
      title={offerDialogName === 'EMAIL' ? 'Send to Client' : 'Export Offer'}
    >
      <div>
        {isClientTypeContact && (
          <AddContactForm
            companyList={companyList?.data}
            toggleCreatingNewContact={() => setIsClientTypeContact(!isClientTypeContact)}
          />
        )}

        {isClientTypeCompany && (
          <AddCompanyForm toggleCreatingNewClient={() => setIsClientTypeCompany(!isClientTypeCompany)} />
        )}
        {!isClientTypeCompany && !isClientTypeContact && (
          <Form useFormReturn={useFormReturn} onSubmit={onSubmit} className="space-y-4 px-2">
            <div className="space-y-1">
              <Form.Select
                label="Client Type"
                name="client"
                options={[
                  { value: 'CONTACT', name: 'Contact' },
                  { value: 'COMPANY', name: 'Company' },
                ]}
                onChange={(e) => handleClientType(e)}
              />
              <Form.Select
                className="hidden"
                name="offerOnEmail"
                options={[{ value: 'EMAILOFFER', name: 'Email Offer' }]}
              />

              {useFormReturn.watch().client === CLIENT_TYPE.company && (
                <>
                  <Form.Select
                    isSearchable
                    label="Company"
                    name="companyID"
                    options={companyList?.data?.map((option) => ({
                      value: option.id,
                      name: option.name,
                    }))}
                    onChange={(e) => handleCompanyDetails(e)}
                  />
                  <button type="button" onClick={() => setIsClientTypeCompany(!isClientTypeCompany)}>
                    <span className="flex gap-1 items-center text-gray-600 font-small">
                      <AddIcon /> <span className="leading-5">CREATE NEW COMPANY</span>
                    </span>
                  </button>
                </>
              )}
              <Form.Select
                key={getValues('contactID')}
                isSearchable
                label="Contact"
                name="contactID"
                options={contacts?.map((option) => ({
                  value: option.id,
                  name: `${option.firstName} ${option.lastName}`,
                }))}
                onChange={(e) => handleContactDetails(e)}
              />

              <button type="button" onClick={() => setIsClientTypeContact(!isClientTypeContact)}>
                <span className="flex gap-1 items-center text-gray-600">
                  <AddIcon /> <span className="">CREATE NEW CONTACT</span>
                </span>
              </button>
            </div>
            {offerDialogName === 'EMAIL' && (
              <>
                <Form.Input name="toEmail" label="To" placeholder="Email" />
                <Form.Input name="ccEmail" label="CC" placeholder="CC" />
                <Form.Select
                  label="Agent"
                  name="agentID"
                  options={agentList?.data?.map((option) => ({
                    value: option.id,
                    name: `${option.firstName} ${option.lastName}`,
                  }))}
                />
                <Form.Select label="Template" name="templateType" options={DropdownOption.TemplateType} />
                <Form.Input name="subject" label="Subject" placeholder="Subject" />
                <Form.TextArea name="message" label="Message" placeholder="Message" />
              </>
            )}
            {offerDialogName === 'EXPORT' && (
              <>
                <Form.Select
                  label="Agent"
                  name="agentID"
                  options={agentList?.data?.map((option) => ({
                    value: option.id,
                    name: `${option.firstName} ${option.lastName}`,
                  }))}
                />
                <Form.Select label="Template" name="templateType" options={DropdownOption.TemplateType} />
              </>
            )}

            <div className="flex justify-end">
              <Button type="submit" className="px-6" isLoading={state.isLoading}>
                SEND
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Dialog>
  );
};

export default SendOfferDialog;

export const AddCompanyForm: React.FC<{
  toggleCreatingNewClient?: () => void;
}> = ({ toggleCreatingNewClient }) => {
  const useFormReturn = useForm<NewCompanyFormType>({
    resolver: yupResolver(NewClientFormResolver),
    defaultValues: {
      name: '',
    },
  });
  const dispatch = useAppDispatch();
  const [saveCompany, state] = useSaveCompanyMutation();

  const onSubmit = async (e: NewCompanyFormType) => {
    const res = await saveCompany(e).unwrap();
    res && res?.message && HandleNotification(res.message, res.success);
    res && res?.success && toggleCreatingNewClient
      ? toggleCreatingNewClient()
      : dispatch(
          toggleCreateNewClientDialog({
            createNewClientDialogOpen: false,
            newClientTypeName: '',
          }),
        );
  };

  return (
    <div className={`${toggleCreatingNewClient ? 'space-y-4' : ''}`}>
      <button type="button" onClick={toggleCreatingNewClient}>
        <span className="flex gap-1 items-center text-gray-600">
          {toggleCreatingNewClient && (
            <>
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="leading-5">CREATE NEW COMPANY</span>
            </>
          )}
        </span>
      </button>

      <Form useFormReturn={useFormReturn} className="space-y-4" onSubmit={onSubmit}>
        <Form.Input name="name" label="Name" placeholder="Company Name" />
        <div className="flex justify-end">
          <Button type="submit" className="px-6" isLoading={state.isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};
export const AddContactForm: React.FC<{
  companyList?: ISelectOption[];
  toggleCreatingNewContact?: () => void;
}> = ({ companyList, toggleCreatingNewContact }) => {
  const useFormReturn = useForm<NewContactFormType>({
    resolver: yupResolver(NewContactFormResolver),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });
  const dispatch = useAppDispatch();
  const [saveContact, state] = useSaveContactMutation();

  const onSubmit = async (e: NewContactFormType) => {
    const res = await saveContact(e).unwrap();
    res && res?.message && HandleNotification(res.message, res.success);
    res && res?.success && toggleCreatingNewContact
      ? toggleCreatingNewContact()
      : dispatch(
          toggleCreateNewClientDialog({
            createNewClientDialogOpen: false,
            newClientTypeName: '',
          }),
        );
  };

  return (
    <div className={`${toggleCreatingNewContact ? 'space-y-4' : ''}`}>
      <button type="button" onClick={toggleCreatingNewContact}>
        {toggleCreatingNewContact && (
          <span className="flex gap-1 items-center text-gray-600">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="leading-5">CREATE NEW CONTACT</span>
          </span>
        )}
      </button>

      <Form useFormReturn={useFormReturn} className="space-y-4" onSubmit={onSubmit}>
        <Form.Input name="firstName" label="First Name" placeholder="First Name" />
        <Form.Input name="lastName" label="Last Name" placeholder="Last Name" />
        <Form.Input name="email" label="Email" placeholder="Email" />
        <Form.Input name="phoneNumber" label="Phone Number" placeholder="Phone Number" />
        <Form.Select
          name="companyID"
          label="Company"
          placeholder="Company"
          options={companyList?.map((option) => ({
            value: option.id,
            name: option.name,
          }))}
        />
        <div className="flex justify-end">
          <Button type="submit" className="px-6" isLoading={state.isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

const CLIENT_TYPE = {
  contact: 'CONTACT',
  company: 'COMPANY',
};
