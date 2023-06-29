import Accordion from '@/components/core/Accordion';
import Button from '@/components/core/Button';
import Drawer, { DrawerProps } from '@/components/core/Drawer';
import { ViewIcon } from '@/components/core/Icon';
import Tag from '@/components/core/Tag';
import { FCC } from '@/helpers/FCC';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { Unit } from '@/infrastructure/store/api/stacking/stacking-types';
import { useBuildingFloorUnitByIdQuery } from '@/infrastructure/store/api/stacking/stacking-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { convertToLocalFormat } from '@/helpers/date-format';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import Loader from '@/components/core/Loader';
import { DropdownOption } from '@/constant/DropdownOptions';
import { IMAGES } from 'src/assets/images';
import SwiperSlider from '@/components/core/Slider';
import { SwiperSlide } from 'swiper/react';
import { numberFormat } from '@/helpers/numberFormat';

type Props = DrawerProps & {
  unitID?: number;
  unitDetails?: Unit;
};

const UnitDetailsDrawer: FCC<Props> = ({ closeDrawer, isOpen, unitID = 20, unitDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: unit, isLoading: isUnitLoading } = useBuildingFloorUnitByIdQuery(unitDetails?.id ?? skipToken);
  const loading = isUnitLoading;
  return (
    <Drawer title={unitDetails?.unitNumber || 'UNIT NUMBER'} isOpen={isOpen} closeDrawer={closeDrawer}>
      {loading && <Loader />}
      {!loading && (
        <div className="flex flex-col h-full">
          <div>
            <Tag value={unit?.data?.unitStatusName} type={unit?.data?.unitStatusName} className="border-white" />
          </div>
          <div className="flex flex-col h-full p-4 md:p-0 mt-5">
            <div className="w-full bg-gray-1 rounded-lg mb-4">
              <div className="h-72">
                {unit && unit?.data && unit?.data?.unitMainImage ? (
                  <SwiperSlider withOutSideArrow={false}>
                    <SwiperSlide className="swiper-slide-inside-arrow">
                      <img className="h-72 w-full rounded-lg" src={unit?.data?.unitMainImage} alt="main-img" />
                    </SwiperSlide>
                    {unit &&
                      unit?.data &&
                      unit?.data?.images.map((image, index) => (
                        <SwiperSlide key={index} className="swiper-slide-inside-arrow">
                          <img className="h-72 w-full rounded-lg" src={image} alt="main-img" />
                        </SwiperSlide>
                      ))}
                  </SwiperSlider>
                ) : (
                  <img className="h-full w-full" src={IMAGES.DUMMYPHOTO} alt="main-img" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              {/* UNIT DETAILS */}
              <section>
                <Accordion
                  title="UNIT DETAILS"
                  titleClassName="items-center hover:bg-gray-blue-2 hover:bg-opacity-40 rounded p-2 w-full typography-button text-gray-blue-5 hover:text-gray-blue-7"
                  defaultOpen
                >
                  <ul className="typography-label flex-0">
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Name</span>
                      <span className="text-black flex-1 font-medium">{unit?.data?.name || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Status</span>
                      <span className="text-black flex-1 font-medium">{unit?.data?.unitStatusName || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Availability</span>
                      <span className="text-black flex-1 font-medium">{unit?.data?.availabilityName || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Listing Type</span>
                      <span className="text-black flex-1 font-medium">{unit?.data?.listingTypeName || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Unit Number</span>
                      <span className="text-black flex-1 font-medium">{unit?.data?.unitNumber || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Floor Area (SQM)</span>
                      <span className="text-black flex-1 font-medium">
                        {numberFormat(Number(unit?.data?.leaseFloorArea)) || 'N/A'}
                      </span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Base Price (PHP)</span>
                      <span className="text-black flex-1 font-medium">
                        {numberFormat(Number(unit?.data?.basePrice)) || 'N/A'}
                      </span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">CUSA (PHP)</span>
                      <span className="text-black flex-1 font-medium">
                        {numberFormat(Number(unit?.data?.cusa)) || 'N/A'}
                      </span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">AC Charges</span>
                      <span className="text-black flex-1 font-medium">{unit?.data?.acCharges || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">AC Extension Charges</span>
                      <span className="text-black flex-1 font-medium">{unit?.data?.acExtensionCharges || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Parking Rent (PHP)</span>
                      <span className="text-black flex-1 font-medium">
                        {numberFormat(Number(unit?.data?.parkingRent)) || 'N/A'}
                      </span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Escalation Rate (%)</span>
                      <span className="text-black flex-1 font-medium">
                        {numberFormat(Number(unit?.data?.escalationRate)) || 'N/A'}
                      </span>
                    </li>
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Mininmum Lease Term (Month)</span>
                      <span className="text-black flex-1 font-medium">
                        {numberFormat(Number(unit?.data?.minimumLeaseTerm)) || 'N/A'}
                      </span>
                    </li>
                  </ul>
                </Accordion>
              </section>
              {/* AGENT */}
              <section>
                <Accordion
                  title="AGENT"
                  titleClassName="items-center hover:bg-gray-blue-2 hover:bg-opacity-40 rounded p-2 w-full typography-button text-gray-blue-5 hover:text-gray-blue-7"
                >
                  <ul className="typography-label flex-0">
                    {unit?.data.agents?.map((agent) => {
                      if (agent?.agentType === 1) {
                        return (
                          <div key={agent.id}>
                            <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                              <span className="font-medium text-gray-7 flex-1">Name</span>
                              <span className="text-black flex-1 font-medium">{agent?.agentName || ''}</span>
                            </li>
                            <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                              <span className="font-medium text-gray-7 flex-1">Phone Number</span>
                              <span className="text-black flex-1 font-medium">
                                <a href={`tel:${agent?.agentPhoneNumber}`} onClick={(e) => e.stopPropagation()}>
                                  {agent?.agentPhoneNumber || ''}
                                </a>
                              </span>
                            </li>
                            <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                              <span className="font-medium text-gray-7 flex-1">Email</span>
                              <span className="text-black flex-1 font-medium">
                                <a href={`mailto:${agent?.agentEmail}`} onClick={(e) => e.stopPropagation()}>
                                  {agent?.agentEmail || ''}
                                </a>
                              </span>
                            </li>
                          </div>
                        );
                      }
                    })}
                    {unit?.data.agents &&
                      unit?.data.agents?.length !== 0 &&
                      !unit?.data.agents?.find((x) => x.agentType === DropdownOption.AgentType[0].value) && (
                        <div>
                          <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                            <span className="font-medium text-gray-7 flex-1">Name</span>
                            <span className="text-black flex-1 font-medium">
                              {(unit && unit?.data && unit?.data?.agents && unit?.data?.agents[0]?.agentName) || ''}
                            </span>
                          </li>
                          <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                            <span className="font-medium text-gray-7 flex-1">Phone Number</span>
                            <span className="text-black flex-1 font-medium">
                              {(unit && unit?.data && unit?.data?.agents && unit?.data.agents[0]?.agentPhoneNumber) ||
                                ''}
                            </span>
                          </li>
                          <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                            <span className="font-medium text-gray-7 flex-1">Email</span>
                            <span className="text-black flex-1 font-medium">
                              {(unit && unit?.data && unit?.data?.agents && unit?.data?.agents[0]?.agentEmail) || ''}
                            </span>
                          </li>
                        </div>
                      )}
                    {unit?.data.agents?.length === 0 && (
                      <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1 py-2">
                        <span className="text-black flex-1 typography-body">{InfoMessages.DataNotFound}</span>
                      </li>
                    )}
                  </ul>
                </Accordion>
              </section>
              <section>
                <Accordion
                  title="TENANT DETAILS"
                  titleClassName="items-center hover:bg-gray-blue-2 hover:bg-opacity-40 rounded p-2 w-full typography-button text-gray-blue-5 hover:text-gray-blue-7"
                >
                  <ul className="typography-label flex-0">
                    {unit?.data?.contract === null ? (
                      <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1 py-2">
                        <span className="text-black flex-1 typography-body">{InfoMessages.DataNotFound}</span>
                      </li>
                    ) : (
                      <>
                        <li className="flex justify-between items-center px-2 py-1 even:bg-blue-1 py-2">
                          <span className="font-medium text-gray-7 flex-1">Current Tenant</span>
                          <span className="text-black flex-1 font-medium">{unit?.data?.contract?.name || ''}</span>
                        </li>
                        <li className="flex justify-between items-center px-2 py-1 even:bg-blue-1">
                          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Name</span>
                          <span className="font-medium text-black flex-1">
                            {unit?.data?.contract?.propertyName || ''}
                          </span>
                        </li>
                        <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1 py-2">
                          <span className="font-medium text-gray-7 flex-1">Company Name</span>
                          <span className="text-black flex-1 font-medium">
                            {unit?.data?.contract?.companyName || ''}
                          </span>
                        </li>
                        <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1  py-2">
                          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Contact Name</span>
                          <span className="font-medium text-black flex-1">
                            {unit?.data?.contract?.contactName || ''}
                          </span>
                        </li>
                        <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1 py-2">
                          <span className="font-medium text-gray-7 flex-1">Agent Name</span>
                          <span className="text-black flex-1 font-medium">
                            {unit?.data?.contract?.brokerName || ''}
                          </span>
                        </li>
                        <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                          <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                            Estimated Area (PHP)
                          </span>
                          <span className="font-medium text-black flex-1">
                            {numberFormat(Number(unit?.data?.contract?.estimatedArea)) || ''}
                          </span>
                        </li>
                        <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                          <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                            Lease Term (Month)
                          </span>
                          <span className="font-medium text-black flex-1">
                            {numberFormat(Number(unit?.data?.contract?.leaseTerm)) || ''}
                          </span>
                        </li>
                        <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                          <span className="font-medium text-gray-7 flex-1">Lease Start</span>
                          <span className="text-black flex-1 font-medium">
                            {(unit?.data &&
                              unit?.data?.contract &&
                              unit?.data?.contract?.startDate &&
                              convertToLocalFormat(unit?.data?.contract?.startDate)) ||
                              ''}
                          </span>
                        </li>
                        <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                          <span className="typography-caption flex-1 font-medium text-gray-blue-7">Lease Expiry</span>
                          <span className="font-medium text-black flex-1">
                            {(unit?.data &&
                              unit?.data?.contract &&
                              unit?.data?.contract?.endDate &&
                              convertToLocalFormat(unit?.data?.contract?.endDate)) ||
                              ''}
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </Accordion>
              </section>

              {/* OTHERS */}
              {/* <section>
                <Accordion
                  title="OTHERS"
                  titleClassName="items-center hover:bg-gray-blue-2 hover:bg-opacity-40 rounded p-2 w-full typography-button text-gray-blue-5 hover:text-gray-blue-7"
                >
                  <ul className="typography-label flex-0">
                    <li className="flex justify-between items-end px-2 py-1 even:bg-blue-1">
                      <span className="font-medium text-gray-7 flex-1">Con</span>
                      <span className="text-black flex-1 typography-body">{'N/A'}</span>
                    </li>
                  </ul>
                </Accordion>
              </section> */}
            </div>
          </div>

          <div className="w-full mt-auto">
            <Button
              className="w-full"
              icon={<ViewIcon />}
              onClick={() =>
                navigate(location.pathname + `/unit/${unitDetails?.id ? unitDetails.id : unitID}`, {
                  state: {
                    unitID: unitDetails?.id,
                  },
                })
              }
              // onClick={() => navigate(location.pathname + `/unit/${unitID}`)}
              btnType="tertiary-gray"
            >
              UNIT DETAILS
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default UnitDetailsDrawer;
