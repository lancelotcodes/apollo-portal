import { InfoMessages } from '@/constant/InfoMessageOptions';
import { classNames } from '@/helpers/classNames';
import { useLazyOfferOptionQuery } from '@/infrastructure/store/api/offer/offer-api';
import { ChevronUpIcon } from '@heroicons/react/solid';
import React from 'react';
import Accordion from '../core/Accordion';
import Loader from '../core/Loader';
import Map from './Map';
import SearchedPropertyList from './SearchedPropertyList';
import SearchForm from './SearchForm';

const PersonalProfile: React.FC = () => {
  // Trigger Lazy Query To Get Offer
  const [getOffers, { data: propertyList, isLoading: isPropertyListLoading, isFetching: isPropertyListFetching }] =
    useLazyOfferOptionQuery();

  const loading = isPropertyListLoading || isPropertyListFetching;
  return (
    <div className="bg-white h-full flex flex-col">
      <div className="space-y-4 py-4 relative flex gap-4 w-full flex-col px-4">
        <section className="border border-gray-blue-2 rounded-lg bg-white w-full">
          <Accordion
            defaultOpen
            panelClassName="w-full"
            title="PROPERTY DETAILS"
            renderTitle={(E, open) => (
              <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 items-center">
                GENERATE OPTIONS LIST
                <ChevronUpIcon
                  className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')}
                />
              </E>
            )}
          >
            <div className="flex flex-col lg:flex-row gap-4 w-full px-4">
              <SearchForm getOffers={getOffers} />
              <Map searchedPropertyList={propertyList?.data} />
            </div>
          </Accordion>
        </section>
      </div>
      {loading ? <Loader /> : <SearchedPropertyList searchedPropertyList={propertyList?.data} />}
      {propertyList?.data?.length === 0 && <p className="px-5 pb-4">{InfoMessages.DataNotFound}</p>}
    </div>
  );
};

export default PersonalProfile;
