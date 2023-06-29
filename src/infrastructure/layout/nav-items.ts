import {
  DealsIcon,
  LocationIcon,
  MaintenanceIcon,
  MarketSearchIcon,
  OfferGenerationIcon,
  PropertyIcon,
} from '@/components/core/Icon';

export const AppNavigation = [
  {
    name: 'Property List',
    href: '/property',
    icon: PropertyIcon,
  },
  {
    name: 'Market Search',
    href: '/market-research',
    icon: MarketSearchIcon,
  },
  {
    name: 'Offer Generation',
    href: '/offer-generation',
    icon: OfferGenerationIcon,
  },
  { name: 'Deals', href: '/deals', icon: DealsIcon, current: false },
  {
    name: 'Maintenance',
    href: '/maintenance',
    icon: MaintenanceIcon,
  },
  { name: 'Location', href: '/location', icon: LocationIcon },
];
