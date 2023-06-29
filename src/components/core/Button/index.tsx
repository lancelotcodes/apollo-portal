import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import React from 'react';
import { BallTriangle } from 'react-loading-icons';
import { buttonTypes, buttonTypesToClass } from './types-button';

type buttonDefaultProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface Props extends buttonDefaultProps {
  icon?: React.ReactNode;
  suffix?: string | React.ReactNode;
  btnType?: buttonTypes;
  isLoading?: boolean;
}

const Button: FCC<Props> = ({
  btnType = 'primary-blue',
  prefix,
  suffix,
  icon,
  className,
  children,
  isLoading = false,
  ...rest
}) => {
  return (
    <button
      className={classNames('p-2 transition-all ', buttonTypesToClass[btnType], className && className)}
      {...rest}
    >
      <span className={classNames('flex justify-center', (prefix || suffix || icon) && 'gap-x-1')}>
        {prefix && <span>{prefix}</span>}
        {icon && <span>{icon}</span>}

        {children}

        {isLoading && <BallTriangle height={20} />}
        {suffix && <span>{suffix}</span>}
      </span>
    </button>
  );
};

export default Button;
