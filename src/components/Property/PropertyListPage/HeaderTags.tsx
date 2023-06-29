import Tag from '@/components/core/Tag';
import { FCC } from '@/helpers/FCC';
import { removeFilter, toggleSort } from '@/infrastructure/store/features/property-list/property-list-slice';
import {
  PropertyListState,
  PropertySortByMode,
} from '@/infrastructure/store/features/property-list/property-list-type';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import React, { useEffect, useState } from 'react';

interface Props {
  state: PropertyListState;
}

const HeaderTags: FCC<Props> = ({ state }) => {
  const { sortBy, filter } = state;

  const [sortState, setSortState] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const res = Object.keys(sortBy).filter((e) => {
      return sortBy[e] === true;
    });

    setSortState(res);
  }, [sortBy]);

  useEffect(() => {
    // const classifications = ;
    // setSortState(classifications);
  }, [filter]);

  // if (sortState?.length === 0) {
  //   return null;
  // }

  return (
    <div className="px-4 flex gap-2">
      {sortState?.map((e) => (
        <Tag
          value={`Sort By: ${e}`.toUpperCase()}
          key={e}
          onClickCloseIcon={() => dispatch(toggleSort(e as PropertySortByMode))}
          closable
        />
      ))}

      {filter?.classification?.map((e) => (
        <Tag
          type="lease"
          value={`Filter By: ${e}`.toUpperCase()}
          key={e}
          onClickCloseIcon={() =>
            dispatch(
              removeFilter({
                action: 'classification',
                data: { classification: e },
              }),
            )
          }
          closable
        />
      ))}

      {filter?.location && (
        <Tag
          type="lease"
          value={`Filter By: ${filter?.location}`.toUpperCase()}
          key={filter?.location}
          onClickCloseIcon={() =>
            dispatch(
              removeFilter({
                action: 'location',
              }),
            )
          }
          closable
        />
      )}

      {filter?.published !== 'Show All' && (
        <Tag
          type="lease"
          value={`Filter By: ${filter?.published}`.toUpperCase()}
          key={filter?.published}
          onClickCloseIcon={() =>
            dispatch(
              removeFilter({
                action: 'published',
              }),
            )
          }
          closable
        />
      )}
    </div>
  );
};

export default HeaderTags;
