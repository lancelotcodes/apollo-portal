import Drawer, { DrawerProps } from '@/components/core/Drawer';
import StackingCard from '../Cards/StackingCard';
import React from 'react';
import { BuildingFloorUnits } from '@/infrastructure/store/api/stacking/stacking-types';
import Loader from '@/components/core/Loader';
import { numberFormat } from '@/helpers/numberFormat';

type Props = DrawerProps & {
  floorBuilding: BuildingFloorUnits | undefined;
  isBuildingFloors: boolean;
};

const FloorDetailsDrawer: React.FC<Props> = ({ closeDrawer, isOpen, floorBuilding, isBuildingFloors }) => {
  return (
    <Drawer title="FLOOR NUMBER INFORMATION" isOpen={isOpen} closeDrawer={closeDrawer}>
      <div className="space-y-4">
        {isBuildingFloors ? (
          <Loader />
        ) : (
          <div className="mt-5">
            <section className="text-gray-blue-7">
              <p className="typography-label font-medium">Total size of the floor for rent</p>
              <p className="typography-body">
                <span className="text-black">{floorBuilding && numberFormat(floorBuilding?.floorPlateSize)}</span>
                <span className="typography-caption font-medium "> SQM</span>
              </p>
            </section>

            <section className="space-y-4 overflow-auto h-full">
              {floorBuilding &&
                floorBuilding &&
                floorBuilding?.units?.map((item, index) => {
                  return (
                    <StackingCard
                      key={index}
                      floor={item}
                      unitNumber={2}
                      // type="vacant"
                      type={item?.unitStatusName}
                      isVerified
                      withBroker
                    />
                  );
                })}

              {/* <StackingCard unitNumber={2} type="vacant" isVerified withBroker />
          <StackingCard unitNumber={2} type="vacant" isVerified withBroker />
          <StackingCard unitNumber={2} type="vacant" isVerified withBroker />
          <StackingCard unitNumber={2} type="vacant" isVerified withBroker />
          <StackingCard unitNumber={2} type="vacant" isVerified withBroker />
          <StackingCard unitNumber={2} type="vacant" isVerified withBroker />
          <StackingCard unitNumber={2} type="vacant" isVerified withBroker /> */}
            </section>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default FloorDetailsDrawer;
