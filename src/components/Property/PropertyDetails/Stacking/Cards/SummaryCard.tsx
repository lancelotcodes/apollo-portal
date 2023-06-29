import Tag from '@/components/core/Tag';
import { tagTypes } from '@/components/core/Tag/types-tag';
import { UnitStatusType } from '@/constant/UnitStatusType';
import { classNames } from '@/helpers/classNames';
import React from 'react';

interface SummaryCardProps {
  type: tagTypes;
  year?: number;
  title: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ type, title }) => {
  return (
    <div
      className={classNames(
        'border rounded flex-1 p-4 group min-w-[186px]',
        type === UnitStatusType.vacant && 'border-gray-blue-2 bg-green-2',
        type === UnitStatusType.subtenanted && 'bg-orange-1',
        type === UnitStatusType.notverified && 'bg-orange-1',
        type === UnitStatusType.tenanted && 'border-gray-blue-2 bg-blue-1',
        type.slice(0, 2) === '20' && parseInt(type) % 2 !== 0 && 'border-gray-blue-2 bg-violet-1',
        type.slice(0, 2) === '20' && parseInt(type) % 2 === 0 && 'border-gray-blue-2 bg-blue-1',
      )}
    >
      <Tag
        value={`${type === UnitStatusType.notverified ? 'Not Verified' : type}`}
        type={type}
        className="border-white"
      />

      <h3 className="mt-1 font-bold text-black">{title}</h3>
    </div>
  );
};

// const typeToValue = {
//   Vacant: 'Vacant',
//   Tenanted: 'Tenanted',
//   SubTenanted: 'SubTenanted',
//   NotVerified: 'Not Verified',
// };

export default SummaryCard;
