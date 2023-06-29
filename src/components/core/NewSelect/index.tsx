import { classNames } from '@/helpers/classNames';
import React from 'react';
import Select, { CSSObjectWithLabel, GroupBase, Props } from 'react-select';
import { selectThemeColors } from './theme';

export type OptionDefaultFormat = {
  value: string | number;
  name: string | number;
  icon?: JSX.Element;
};

export interface CustomSelectProps<
  T,
  A extends T,
  B extends boolean = false,
  C extends GroupBase<A & T> = GroupBase<A & T>,
> extends Props<A, B, C> {
  label?: string;
  error?: string;
  selected?: string | number | string[] | number[];
  renderValueStyles?: (e: T) => CSSObjectWithLabel;
  containerClassName?: string;
  controlContainerHeight?: string;
}

const CustomSelect = <
  Option extends OptionDefaultFormat,
  isMulti extends boolean = false,
  Group extends GroupBase<Option & OptionDefaultFormat> = GroupBase<Option & OptionDefaultFormat>,
>(
  props: CustomSelectProps<OptionDefaultFormat, Option, isMulti, Group>,
) => {
  const {
    className,
    label,
    error,
    renderValueStyles,
    options,
    isMulti,
    defaultValue,
    containerClassName,
    controlContainerHeight,
    getOptionLabel,
    getOptionValue,
    ...rest
  } = props;

  return (
    <div className={classNames(containerClassName && containerClassName, 'group')}>
      {label && <p className="block font-medium typography-label text-gray-7">{label}</p>}

      <Select
        getOptionLabel={getOptionLabel ? getOptionLabel : (e) => e?.name?.toString()}
        getOptionValue={getOptionValue ? getOptionValue : (e) => e?.value?.toString()}
        isSearchable={rest.isSearchable ?? false}
        options={options}
        defaultValue={defaultValue}
        className={classNames('py-2', className && className)}
        theme={(theme) => ({
          ...theme,
          colors: selectThemeColors,
        })}
        styles={{
          control: (provided, { selectProps, isFocused }) => {
            return {
              ...provided,
              width: '100%',
              height: controlContainerHeight ? controlContainerHeight : '34px',
              minHeight: '34px',
              padding: '2px',
              fontSize: '15px',
              borderColor: selectProps['aria-errormessage'] ? 'red' : '#B9BCC1',
              boxShadow: isFocused ? '0 0 0px 3px #83AEF0' : '',
              '&:hover': {
                boxShadow: '0 0 0px 3px #83AEF0',
              },
            };
          },
          indicatorsContainer: (provided) => ({
            ...provided,
            height: '34px',
            padding: '0 0px 4px 7px',
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: '0 0px 4px 7px',
          }),
          singleValue: (provided, { data }) => {
            return {
              ...provided,
              display: 'flex', // To keep icon and label aligned
              alignItems: 'center',
              ...(renderValueStyles ? renderValueStyles(data) : { color: 'black' }),
            };
          },
          multiValue: (styles, { data }) => {
            return {
              ...styles,
              // border: '1px solid #696D74',
              borderRadius: '4px',
              ...(renderValueStyles ? renderValueStyles(data) : { color: 'black' }),
            };
          },
          multiValueRemove: (styles) => {
            return {
              ...styles,
              background: 'transparent',
              '&:hover': {
                background: 'transparent',
              },
            };
          },
          input: (styles) => {
            return { ...styles, color: 'black', margin: '0px' };
          },
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
        classNamePrefix="react-select"
        isMulti={isMulti}
        {...rest}
      />

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
  );
};

export default CustomSelect;
