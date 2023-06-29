import React from 'react';
import { tagTypes, tagTypesToClass } from './types-tag';
import { CgClose } from 'react-icons/cg';
import { FCC } from '@/helpers/FCC';
import { classNames } from '@/helpers/classNames';

type DefaultProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

interface Props extends DefaultProps {
  /**
  `primary`: black text-black \
  `lease`: gray-blue-6 text-gray-blue-6 \
  `other-rohq`: blue-7 text-blue-7 \
  `other-retail`: orange-7 text-orange-7 \
  `other-bpo`: green-7 text-green-7 \
  `status-vacant`: blue-9 text-white bg-green-6 \
  `status-tenanted`: black text-white bg-blue-6 \
  `status-subtenanted`: black text-white bg-blue-6 \
  `status-notverified`: orange-7 text-white bg-orange-6 \
  `class-b`: green-7 text-green-7 \
  `class-a`: green-7 text-green-7 \
  `class-c`: orange-7 text-orange-7 \
  `class-premium`: violet-7 text-violet-7 \
  `zoning-agricultural`: text-white bg-green-7 blue-9 \
  `zoning-commercial`: text-white bg-pink-7 blue-9 \
  `zoning-industrial`: text-white bg-orange-7 blue-9 \
  `zoning-residential`: text-white bg-blue-7 blue-9`
   */
  type?: tagTypes;
  closable?: boolean;
  Icon?: JSX.Element;
  onClickCloseIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value?: string | JSX.Element | number;
  disabled?: boolean;
}

const Tag: FCC<Props> = ({
  type = 'primary',
  closable = false,
  onClickCloseIcon,
  Icon,
  className,
  disabled,
  value,
  ...rest
}) => {
  return (
    <span
      aria-disabled={disabled}
      className={classNames(
        'px-2 py-1 rounded text-center group typography-caption font-medium inline-block whitespace-nowrap',
        // value && !disabled && tagTypesToClass[type],
        value &&
          !disabled &&
          tagTypesToClass[
            type.slice(0, 2) === '20' && parseInt(type) % 2 !== 0
              ? 'odd'
              : type.slice(0, 2) === '20' && parseInt(type) % 2 === 0
              ? 'even'
              : type
          ],
        !value && !disabled && 'bg-gray-2 text-black',
        disabled && 'border border-gray-3 text-gray-3',
        className && className,
      )}
      {...rest}
    >
      <span className="flex gap-1 items-center">
        {Icon}

        <span> {value ?? 'Not Selected'}</span>

        {closable && (
          <button onClick={onClickCloseIcon} key={rest.key}>
            <CgClose className={classNames('h-4 w-4 textwhite hover:text-gray-blue-6')} />
          </button>
        )}
      </span>
    </span>
  );
};

export default Tag;
