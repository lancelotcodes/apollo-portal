import Button from '@/components/core/Button';
import { AddIcon, GridIcon, MapIcon, TableIcon } from '@/components/core/Icon';
import IconButton from '@/components/core/IconButton';
import { SessionOptions } from '@/constant/SessionOptions';
import { StepsValidationWithOutBuilding } from '@/constant/StepsValidation';
import { classNames } from '@/helpers/classNames';
import { SessionUtils } from '@/helpers/session-storage';
import useDebounce from '@/hooks/useDebounce';
import useWindowSize from '@/hooks/useWindowSize';
import {
  setSearchValue,
  toggleGroup,
  toggleSort,
  toggleViewMode,
} from '@/infrastructure/store/features/property-list/property-list-slice';
import {
  PropertyGroupByMode,
  PropertyListViewMode,
  PropertySortByMode,
} from '@/infrastructure/store/features/property-list/property-list-type';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import Group from './Group';
import Search from './Search';
import Sort from './Sort';

const propertyViewOptions: {
  key: PropertyListViewMode;
  icon: () => JSX.Element;
}[] = [
  { key: 'map', icon: MapIcon },
  { key: 'grid', icon: GridIcon },
  { key: 'table', icon: TableIcon },
];

const Header: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce<string>(search, 500);
  const navigate = useNavigate();

  const state = useAppSelector((state) => state['property-list']);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  const handleSetSearchValue = useCallback(
    (e: string) => {
      dispatch(setSearchValue(e));
    },
    [dispatch],
  );

  const handleToggleGroup = (e: PropertyGroupByMode) => {
    dispatch(toggleGroup(e));
  };

  const handleToggleSort = (e: PropertySortByMode) => {
    dispatch(toggleSort(e));
  };

  useEffect(() => {
    handleSetSearchValue(debouncedValue);
  }, [debouncedValue, handleSetSearchValue]);

  const handleNavigateCreateProperty = () => {
    SessionUtils.removeItem(SessionOptions.propertyId);
    SessionUtils.removeItem(SessionOptions.propertyName);
    SessionUtils.setItem('isStepValidated', JSON.stringify(StepsValidationWithOutBuilding));
    navigate('/create-property');
  };
  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-0">
        <section
          className={classNames('flex gap-4 lg:justify-start items-center', isSearching ? 'w-full' : 'justify-between')}
        >
          <h1 className="font-bold text-black">Properties</h1>
          <div className={classNames('flex gap-2 lg:flex-1', isSearching && 'flex-1')}>
            <Search
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              searchValue={search}
              setSearchValue={setSearch}
            />

            {/* Only Show if not searching */}
            {!isSearching && (
              <>
                <Filter />
                <Group groupBy={state.groupBy} toggleGroup={handleToggleGroup} />
                <Sort sortBy={state.sortBy} toggleSort={handleToggleSort} />
              </>
            )}
          </div>
        </section>

        {((!isSearching && width >= 1024) || width < 1024) && (
          <section className="flex gap-4 justify-between items-ceneter">
            <Button btnType="secondary-gray" icon={<AddIcon />} onClick={handleNavigateCreateProperty}>
              Property
            </Button>

            <div className="gap-2 flex self-center">
              {propertyViewOptions.map((e) => (
                <IconButton
                  bordered
                  className={classNames(
                    'p-2',
                    state.viewMode === e.key ? 'text-black border-black' : 'text-gray-blue-6 border-gray-6',
                  )}
                  key={e.key}
                  onClick={() => dispatch(toggleViewMode(e.key))}
                >
                  <e.icon />
                </IconButton>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Header;
