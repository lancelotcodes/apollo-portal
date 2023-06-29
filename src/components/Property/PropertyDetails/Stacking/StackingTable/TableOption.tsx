import { OptionDefaultFormat } from '@/components/core/NewSelect';
import Tag from '@/components/core/Tag';
import { tagTypes } from '@/components/core/Tag/types-tag';
import React from 'react';
import { components, OptionProps } from 'react-select';

const TableOption: React.FC<OptionProps<OptionDefaultFormat>> = ({ ...props }) => {
  return (
    <components.SingleValue {...props} className="hover:bg-blue-2 p-1">
      <Tag
        className="inline col-start-1 row-start-1 w-full"
        value={props?.data?.name}
        type={`${props.data.name}` as tagTypes}
      />
    </components.SingleValue>
  );
};

export default TableOption;
