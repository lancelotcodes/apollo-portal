import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ActionMeta, CSSObjectWithLabel, GroupBase, OnChangeValue, OptionsOrGroups, Props } from 'react-select';
import Select, { OptionDefaultFormat } from '../NewSelect';

export const FormSelect = <
  Option extends OptionDefaultFormat,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option & OptionDefaultFormat> = GroupBase<Option & OptionDefaultFormat>,
>(
  props: Omit<
    Props<Option, IsMulti, Group> & {
      label?: string;
      name: string;
      error?: string;
      value?: OptionDefaultFormat;
      cascadeId?: number;
      renderValueStyles?: (e: OptionDefaultFormat) => CSSObjectWithLabel;
    },
    'defaultValue'
  >,
) => {
  const { name, isMulti, options, error, cascadeId, ...rest } = props;
  const [key, setKey] = useState(cascadeId);
  const {
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();
  const onChange = (e: Option | Option[]) => {
    if (e && Array.isArray(e)) {
      setValue(
        name,
        e.map((e) => e.value),
      );

      return;
    }

    if (e && typeof e === 'object') {
      setValue(name, e.value);
    }
  };

  useEffect(() => {
    setKey(cascadeId);
  }, [cascadeId]);

  return (
    <Select
      key={key}
      options={options}
      name={name}
      defaultValue={getValues(name) ? generateSelectDefaultValue(options ?? [], getValues(name))[0] : []}
      onChange={onChange as (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void}
      isMulti={isMulti}
      error={((name && errors[name]?.message) as string) || error}
      aria-errormessage={errors[name] ? 'Failed to load data' : undefined}
      getOptionLabel={(e) => e?.name?.toString()}
      getOptionValue={(e) => e?.value?.toString()}
      {...rest}
    />
  );
};

const generateSelectDefaultValue = (options: OptionsOrGroups<any, any>, value: string | number) => {
  const finalVal = typeof value === 'number' ? value.toString() : value;
  return options?.filter((e: any) => e.value.toString() === finalVal);
};
