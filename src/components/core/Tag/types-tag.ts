export type tagTypes =
  | 'primary'
  | 'lease'
  | 'other-rohq'
  | 'other-retail'
  | 'other-bpo'
  | 'Vacant'
  | 'SubTenanted'
  | 'NotVerified'
  | 'Tenanted'
  | 'class-a'
  | 'class-b'
  | 'class-c'
  | 'class-premium'
  | 'zoning-agricultural'
  | 'zoning-commercial'
  | 'zoning-industrial'
  | 'selected'
  | 'zoning-residential';

export const tagTypesToClass = {
  primary: 'border-black border text-black',
  lease:
    'border border-gray-blue-6 text-gray-blue-6 hover:border-blue-7 hover:text-blue-white active:bg-blue-5 active:text-white active:border-blue-7',
  'other-rohq': 'border border-blue-7 text-blue-7',
  'other-retail': 'border border-orange-7 text-orange-7',
  'other-bpo': 'border border-green-7 text-green-7',
  Vacant: 'border border-blue-9 text-white bg-green-7',
  Tenanted: 'border border-black text-white bg-violet-7',
  SubTenanted: 'border border-black text-white bg-violet-7',
  NotVerified: 'border border-orange-7 text-white bg-orange-6',
  'class-b': 'border border-green-6 text-green-6',
  'class-a': 'border border-blue-6 text-blue-6',
  'class-c': 'border border-orange-6 text-orange-6',
  'class-premium': 'border border-violet-6 text-violet-6',
  'zoning-agricultural': 'text-white bg-green-7 border border-blue-9',
  'zoning-commercial': 'text-white bg-pink-6 border border-pink-7',
  'zoning-industrial': 'text-white bg-orange-7 border border-blue-9',
  'zoning-residential': 'text-white bg-blue-7 border border-blue-9',
  selected: 'text-white bg-blue-5 border border-blue-7',
  odd: 'text-white bg-blue-7 border border-blue-9',
  even: 'text-white bg-orange-7 border border-blue-9',
};

export const gradeIDToGradeName = (grade: string | null | undefined) => {
  switch (grade) {
    case 'Grade A': {
      return 'class-a';
    }
    case 'Grade B': {
      return 'class-b';
    }
    case 'Grade C': {
      return 'class-c';
    }
    default: {
      return 'class-premium';
    }
  }
};
