export type buttonTypes = 'primary-blue' | 'primary-black' | 'secondary-gray' | 'link' | 'tertiary-gray';

export const buttonTypesToClass = {
  'primary-blue':
    'bg-blue-5 hover:bg-blue-7 active:bg-blue-7 text-white rounded outline-none focus:bg-blue-7 disabled:bg-gray-2 disabled:text-gray-4',
  'primary-black':
    'bg-gray-blue-7 hover:bg-gray-blue-9 active:hover:bg-gray-blue-9 text-white rounded outline-none focus:hover:bg-gray-blue-9 disabled:bg-gray-2 disabled:hover:bg-gray-2 disabled:text-gray-4',
  'secondary-gray':
    'text-gray-7 border border-gray-blue-3 focus:border-gray-blue-9 active:border-gray-blue-9 hover:border-gray-blue-9 focus:text-black active:text-black hover:text-black hover:stroke-text-black rounded outline-none disabled:text-gray-4 disabled:border-none',
  link: 'text-gray-7 focus:text-black active:text-black hover:text-black hover:stroke-text-black rounded outline-none disabled:text-gray-4 disabled:border-none',
  'tertiary-gray':
    'text-gray-7 border bg-gray-1 border-gray-3 focus:border-gray-blue-9 active:border-gray-blue-9 hover:border-gray-blue-9 focus:text-black active:text-black hover:text-black rounded outline-none disabled:text-gray-4 disabled:border-transparent',
};
