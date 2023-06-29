import React, { ChangeEventHandler, useCallback, useRef, useState } from 'react';

import { format, isValid, parse } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { CalendarIcon } from '../core/Icon';
import { classNames } from '@/helpers/classNames';

export interface DayPickerProps extends Omit<DayPickerSingleProps, 'onSelect' | 'mode'> {
  name: string;
  label?: string;
  optional?: boolean;
  error?: string;
  onSelect?: (e: Date) => void;
  setBuildYear?: React.Dispatch<React.SetStateAction<string | number | undefined>>;
}

const Daypicker: React.FC<DayPickerProps> = ({ name, label, optional, error, selected, setBuildYear, ...rest }) => {
  const { onSelect, ...restOptions } = rest;
  const [selectedDate, setSelected] = useState<Date | undefined>(selected);
  const [inputValue, setInputValue] = useState<string>(selected ? format(selected, 'y-MM-dd') : '');
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  if (setBuildYear) {
    setBuildYear(selectedDate?.toString())
  }
  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  });

  const closePopper = useCallback(() => {
    if (isPopperOpen) {
      setIsPopperOpen(false);
      buttonRef?.current?.focus();
    }
  }, [isPopperOpen]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleDaySelect = useCallback(
    (date?: Date) => {
      setSelected(date);
      if (date && isValid(date)) {
        onSelect && onSelect(date);
        setInputValue(format(date, 'y-MM-dd'));
        closePopper();
      } else {
        setInputValue('');
      }
    },
    [closePopper, onSelect],
  );

  return (
    <div>
      <div className="flex flex-col">
        {(label || optional) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="typography-label font-medium text-gray-7" htmlFor={name}>
                {label}
              </label>
            )}

            {optional && <span className="typography-caption font-medium text-gray-5">Optional</span>}
          </div>
        )}

        <div
          ref={popperRef}
          className={classNames(
            'border relative text-base w-full text-gray-9 transition-all my-1 rounded outline-none focus:ring hover:ring focus:ring-blue-3 disabled:bg-gray-2 bg-gray-blue-1 pr-2',
            error ? 'border-red' : 'border-gray-blue-3',
          )}
        >
          <div className="relative flex w-full justify-between bg-red-100">
            <input
              onFocus={() => setIsPopperOpen(true)}
              type="text"
              placeholder={format(new Date(), 'y-MM-dd')}
              value={inputValue}
              onChange={handleInputChange}
              className="rounded typography-body border-none outline-none w-full px-2 py-0.5"
              style={{ boxShadow: 'none' }}
            />
            <button
              ref={buttonRef}
              type="button"
              className=""
              aria-label="Pick a date"
              onClick={() => setIsPopperOpen((old) => !old)}
            >
              <span role="img" aria-label="calendar icon">
                <CalendarIcon />
              </span>
            </button>
          </div>
        </div>

        {error && (
          <span
            className={classNames(
              error ? 'text-red typography-label' : 'typography-caption text-gray-blue-5 font-medium',
            )}
          >
            {error}
          </span>
        )}
      </div>
      {isPopperOpen && (
        <FocusTrap
          active={isPopperOpen}
          focusTrapOptions={{
            initialFocus: false,
            fallbackFocus: buttonRef?.current ?? undefined,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet bg-white z-[5] border border-black rounded"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
          >
            <DayPicker
              captionLayout="dropdown"
              mode="single"
              fromYear={1900}
              toYear={2025}
              modifiersClassNames={{ today: 'rdp__today', selected: 'rdp__selected', disabled: 'rdp__disabled' }}
              initialFocus={isPopperOpen}
              defaultMonth={selectedDate}
              selected={selectedDate}
              onSelect={handleDaySelect}
              {...restOptions}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

export default Daypicker;
