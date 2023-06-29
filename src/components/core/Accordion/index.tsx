import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import React from 'react';

interface Props {
  title?: string;
  titleClassName?: string;
  panelClassName?: string;
  chevronClassName?: string;
  defaultOpen?: boolean;
  renderTitle?: (e: React.ElementType, open: boolean) => string | JSX.Element;
  IsFileStackUploader?: boolean;
}

const Accordion: FCC<Props> = ({
  title = 'TITLE',
  titleClassName,
  panelClassName,
  children,
  defaultOpen,
  chevronClassName,
  renderTitle,
  IsFileStackUploader,
}) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          {renderTitle ? (
            renderTitle(Disclosure.Button, open)
          ) : (
            <Disclosure.Button className={classNames('flex justify-between', titleClassName && titleClassName)}>
              <span>{title}</span>
              <ChevronUpIcon
                className={classNames(
                  'h-5 w-5 transition-transform',
                  !open ? 'rotate-180 transform' : '',
                  chevronClassName && chevronClassName,
                )}
              />
            </Disclosure.Button>
          )}
          {IsFileStackUploader ? (
            <Disclosure.Panel className={classNames(panelClassName && panelClassName)}>{children}</Disclosure.Panel>
          ) : (
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100 -translate-y-0"
              leave="transition duration-75 ease-out"
              leaveFrom="opacity-100 -translate-y-0"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel className={classNames(panelClassName && panelClassName)}>{children}</Disclosure.Panel>
            </Transition>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
