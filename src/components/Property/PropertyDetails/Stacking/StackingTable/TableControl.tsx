import { OptionDefaultFormat } from '@/components/core/NewSelect';
import React from 'react';
import { ControlProps, components } from 'react-select';

const TableControl: React.FC<ControlProps<OptionDefaultFormat>> = ({ ...rest }) => {
  return (
    <components.Control
      {...{
        ...rest,
        getStyles: () => ({
          border: '3px solid #000',
          padding: 0,
          display: 'flex',
          height: '26px',
          borderRadius: '5px'
        }),
      }}
    >
      <span>{rest.children}</span>
    </components.Control>
  );
};

export default TableControl;
