import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { ChevronRightIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';

interface StepsProps {
  currentStep: number;
  onChange?: (e: number) => void;
  steps: { name: string; id: string | number }[];
  isDisable?: boolean;
}

const Steps: FCC<StepsProps> = ({ currentStep, onChange, steps }) => {
  return (
    <nav className="overflow-auto">
      <ul className="flex items-center">
        {steps.map((e, idx) => {
          const isCurrent = currentStep === idx;
          const isFinished = currentStep > idx;
          const isPending = idx > currentStep;

          return (
            <Fragment key={e.id}>
              <li className="p-2">
                <button
                  className="flex items-center gap-1 group"
                  onClick={() => {
                    onChange && onChange(idx);
                  }}
                >
                  <span
                    className={classNames(
                      ' h-6 w-6 rounded',
                      isCurrent && 'text-white bg-blue-6 group-hover:bg-blue-7',
                      isFinished && 'bg-blue-1 group-hover:text-blue-5 text-blue-4',
                      isPending &&
                      'bg-gray-2 disabled:bg-gray-2 group-hover:bg-gray-2 text-gray-3 group-hover:text-gray-4',
                    )}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={classNames(
                      'typography-caption font-medium whitespace-nowrap',
                      isCurrent && 'text-blue-6 group-hover:text-blue-7',
                      isPending && 'text-gray-4 group-hover:text-gray-5',
                      isFinished && 'disabled:bg-gray-2 group-hover:text-blue-5 text-blue-4',
                    )}
                  >
                    {e.name}
                  </span>
                </button>
              </li>

              {idx + 1 < steps.length && (
                <li>
                  <ChevronRightIcon className="h-4 w-4 text-gray-3" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Steps;
