import { OptionDefaultFormat } from '@/components/core/NewSelect';
import Tag from '@/components/core/Tag';
import { tagTypes } from '@/components/core/Tag/types-tag';
import React from 'react';
import { SingleValueProps, components } from 'react-select';

const TableSingleValue: React.FC<SingleValueProps<OptionDefaultFormat>> = ({ ...rest }) => {
  return (
    <components.SingleValue {...rest}>
      <Tag
        className="inline col-start-1 row-start-1 w-32"
        value={rest?.data?.name}
        type={`status-${rest.data.value}` as tagTypes}
      />
    </components.SingleValue>
  );
};

export default TableSingleValue;
