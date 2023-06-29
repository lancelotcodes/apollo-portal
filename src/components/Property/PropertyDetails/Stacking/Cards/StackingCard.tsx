import React from 'react';
import Broker from '@/components/core/Broker';
import { ViewIcon, WebsiteIcon } from '@/components/core/Icon';
import IconButton from '@/components/core/IconButton';
import Tag from '@/components/core/Tag';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import { classNames } from '@/helpers/classNames';
import { convertToLocalFormat } from '@/helpers/date-format';
import { FCC } from '@/helpers/FCC';
import { BuildingFloorUnit, Unit } from '@/infrastructure/store/api/stacking/stacking-types';
import { UnitStatusType } from '@/constant/UnitStatusType';
import { tagTypes } from '@/components/core/Tag/types-tag';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { numberFormat } from '@/helpers/numberFormat';

interface Props {
  type: tagTypes;
  tenantClassification?: string;
  unitDetail?: Unit;
  unitName?: string;
  unitNumber: number | string;
  unitSize?: number;
  minimumLease?: number;
  lastVarified?: string | number | Date;
  isVerified?: boolean;
  onView?: (unit: Unit) => void;
  withBroker?: boolean;
  broker?: any;
  floor?: BuildingFloorUnit;
  IsSlider?: boolean;
}

const StackingCard: FCC<Props> = ({
  type,
  tenantClassification,
  unitDetail,
  unitName,
  unitNumber,
  unitSize,
  minimumLease,
  isVerified = true,
  onView,
  // broker,
  withBroker,
  floor,
  IsSlider,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate to unit detail page
  const handleOnViewUnitDrawer = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    navigate(location.pathname + `/unit/${unitDetail?.id ? unitDetail?.id : floor?.id}`, {
      state: {
        unitID: unitDetail?.id ? unitDetail?.id : floor?.id,
      },
    });
  };
  return (
    <div
      className={classNames(
        'border flex flex-col rounded flex-1 p-4 min-w-[280px] group hover:border-gray-blue-7 cursor-pointer',
        type === UnitStatusType.vacant && 'border-gray-blue-2 bg-green-2',
        type === UnitStatusType.subtenanted && 'bg-orange-1',
        type === UnitStatusType.tenanted && 'border-gray-blue-2 bg-blue-1',
        IsSlider && 'mr-3',
      )}
      onClick={(e) => {
        e.stopPropagation();
        onView && unitDetail && onView(unitDetail);
      }}
      onKeyPress={(e) => {
        e.stopPropagation();
        onView && unitDetail && onView(unitDetail);
      }}
      role="link"
      tabIndex={0}
    >
      {/* Tags */}
      <div className="flex gap-2">
        {type && (
          <Tag value={type} type={floor?.unitStatusName ? floor.unitStatusName : type} className="border-white" />
        )}

        {!isVerified && <Tag value="Not verified" type="NotVerified" />}
        {tenantClassification && <Tag value={tenantClassification} type="other-bpo" />}

        <span className="gap-1 ml-auto hidden group-hover:flex">
          <IconButton className="text-gray-6 hover:text-gray-9" onClick={handleOnViewUnitDrawer}>
            <ViewIcon />
          </IconButton>

          <IconButton className="text-gray-6 hover:text-gray-9">
            <WebsiteIcon />
          </IconButton>
        </span>
      </div>

      {(unitDetail?.unitStatusName === UnitStatusType.tenanted || floor?.unitStatusName === UnitStatusType.tenanted) &&
        (unitDetail?.companyName || floor?.companyName) && (
          <h3 className="font-bold mt-1">{unitDetail?.companyName ? unitDetail?.companyName : floor?.companyName}</h3>
        )}
      {(unitDetail?.unitStatusName === UnitStatusType.tenanted || floor?.unitStatusName === UnitStatusType.tenanted) &&
        (unitDetail?.companyName === null || floor?.companyName === null) && (
          <h3 className="font-bold mt-1">{'N/A'}</h3>
        )}

      {/* Details */}
      <ul className="mt-auto">
        <li className="space-x-1 items-end">
          <span className="typography-caption font-medium text-gray-blue-7">Unit Number:</span>
          <span className="typography-body text-black">{floor ? floor.unitNumber : unitNumber}</span>
        </li>
        <li className="space-x-1 items-end">
          <span className="typography-caption font-medium text-gray-blue-7">Unit size:</span>
          <span className="typography-body text-black">
            {floor ? numberFormat(floor.leaseFloorArea) : numberFormat(Number(unitSize))}
            <span className="typography-caption font-medium text-gray-blue-7"> SQM</span>
          </span>
        </li>
        {unitDetail?.unitStatusName === UnitStatusType.vacant && (
          <li className="space-x-1 items-end">
            <span className="typography-caption font-medium text-gray-blue-7">Minimum lease:</span>
            <span className="typography-body text-black">
              {floor ? numberFormat(floor.minimumLeaseTerm) : numberFormat(Number(minimumLease))}
              <span className="typography-caption font-medium text-gray-blue-7"> Months</span>
            </span>
          </li>
        )}

        {!unitName && (
          <li className="space-x-1 items-end">
            <span className="typography-caption font-medium text-gray-blue-7">
              {unitDetail?.unitStatusName === UnitStatusType.tenanted ? 'Lease expiry:' : 'Last verified date:'}
            </span>
            <span className="typography-body text-black">
              {floor?.unitStatusName === UnitStatusType.tenanted
                ? convertToLocalFormat(floor?.endDate)
                : unitDetail?.unitStatusName === UnitStatusType.tenanted
                ? convertToLocalFormat(unitDetail?.endDate)
                : convertToLocalFormat(DateTime.now().toString())}
            </span>
          </li>
        )}
      </ul>

      {withBroker && (
        <div className="mt-2">
          <span className="typography-caption font-medium">Agent Details</span>
          {floor?.agents?.length === 0 && <p className="mt-1.5">{InfoMessages.DataNotFound}</p>}
          {/* <Broker name="Aaron Ramos" /> */}

          {floor?.agents?.map((floorAgent, index) => {
            if (floorAgent?.agentType === 1) {
              return (
                <div className="mt-2" key={index}>
                  <Broker agent={floorAgent} />
                </div>
              );
            }
          })}
          {floor?.agents?.length !== 0 && !floor?.agents?.find((x) => x.agentType === 1) && (
            <div className="mt-2">
              <Broker agent={floor && floor?.agents && floor?.agents[0]} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StackingCard;
