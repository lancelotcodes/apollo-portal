import React, { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}

const IndeterminateCheckbox: React.FC<Props> = ({ indeterminate, className = 'rounded-sm text-blue-6', ...rest }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref?.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <span className="flex justify-center">
      <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />
    </span>
  );
};

export default IndeterminateCheckbox;
