import React from 'react';
import { Feature, LocationSearchResponse } from '@/infrastructure/store/api/mapbox/LocationSearchResponse';

interface Props {
  searchData: LocationSearchResponse;
  handleOnClick: (data: Feature) => any;
  suggestionBox?: boolean;
}

const SuggestionBox: React.FC<Props> = ({ searchData, handleOnClick, suggestionBox }): any => {
  return (
    <>
      {
        <div className={`absolute w-full overflow-hidden rounded-md bg-white z-10 border-2 ${suggestionBox ? "block" : "hidden"} group-hover:block`}>
          {searchData?.features?.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => handleOnClick(data)}
                onKeyPress={() => handleOnClick(data)}
                role="link"
                tabIndex={0}
                className="cursor-pointer py-2 px-3 hover:bg-slate-200"
              >
                <p className="text-sm font-medium text-gray-600">{data.text}</p>
                <p className="text-sm text-gray-500">{data.place_name}</p>
              </div>
            )
          })}
        </div>
      }
    </>
  );
};



export default SuggestionBox;
