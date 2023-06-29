import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import Button from '../core/Button';
import React, { useState } from 'react';
import PropertyDetails from './PropertyDetails';
import { XlsIcon } from '../core/Icon';
import {
  setOfferGenerationSelectedIds,
  setSendToClientDialogState,
} from '@/infrastructure/store/features/offer-generation/offer-generation-slice';
import SendOfferDialog from './SendOfferDialog';
import { OfferOptionResponse } from '@/infrastructure/store/api/offer/offer-type';
import { useLazyContactListQuery } from '@/infrastructure/store/api/contact/contact-api';
import Loader from '../core/Loader';
interface Props {
  searchedPropertyList?: OfferOptionResponse[];
}

const SearchedPropertyList: React.FC<Props> = ({ searchedPropertyList }) => {
  const [loading, setLoading] = useState(false);
  const [offerDialogName, setOfferDialogName] = useState<string>('');
  // const { data } = usePropertyListQuery({});
  // const { data: propertyAddress } = usePropertyAddressByIDQuery(data?.data.items[0].id);
  const [getTriggerContacts] = useLazyContactListQuery();
  const { selectedUnitIds } = useAppSelector((app) => app['offer-generation']);
  const dispatch = useAppDispatch();

  // Function to open send offer dialogue & call getContact query
  const handleSendToClientOrExport = (value: string) => {
    setOfferDialogName(value);
    getTriggerContacts(null);
    dispatch(setSendToClientDialogState(true));
  };
  return (
    <>
      <div className="space-y-4 pb-4">
        {searchedPropertyList &&
          searchedPropertyList?.map((property, index) => (
            <PropertyDetails key={index} searchedPropertyList={property} />
          ))}
      </div>

      {searchedPropertyList && searchedPropertyList?.length !== 0 && selectedUnitIds.length > 0 && (
        <div className="sticky p-4 border-t bottom-0 bg-white h-[72px] mt-0">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button
                btnType="secondary-gray"
                type="button"
                onClick={() => dispatch(setOfferGenerationSelectedIds({}))}
              >
                CLEAR
              </Button>
              <span className="typography-button font-bold text-gray-7">
                UNIT/s SELECTED:{' '}
                {selectedUnitIds.reduce((acc, current) => acc.concat(current?.AllUnitIds), [] as number[]).length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                btnType="tertiary-gray"
                icon={<XlsIcon />}
                className="ml-auto"
                onClick={() => handleSendToClientOrExport('EXPORT')}
              >
                EXPORT
              </Button>
              <Button className="ml-auto" onClick={() => handleSendToClientOrExport('EMAIL')}>
                SEND EMAIL
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 opacity-100 flex items-center z-10">
          <Loader />
        </div>
      )}
      <SendOfferDialog offerDialogName={offerDialogName} setLoading={setLoading} />
    </>
  );
};

export default SearchedPropertyList;
