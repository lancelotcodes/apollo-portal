import { OptionDefaultFormat } from '@/components/core/NewSelect';
import React from 'react';
import { MenuListProps } from 'react-select';

const TableMenuList: React.FC<MenuListProps<OptionDefaultFormat>> = ({ ...props }) => {
  return <span className="py-2 flex flex-col w-full border rounded border-gray-4 shadow-2xl">{props.children}</span>;
};

export default TableMenuList;
