import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import React, { HTMLProps } from 'react';

const TableCell: FCC<HTMLProps<HTMLSpanElement>> = ({ children, className, ...rest }) => {
  return (
    <span className={classNames(className && className, 'p-4 h-14 flex items-center')} {...rest}>
      {children}
    </span>
  );
};

export default TableCell;
