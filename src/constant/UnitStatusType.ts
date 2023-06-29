import { tagTypes } from '@/components/core/Tag/types-tag';

export class UnitStatusType {
  static vacant: tagTypes = 'Vacant';
  static tenanted: tagTypes = 'Tenanted';
  static subtenanted: tagTypes = 'SubTenanted';
  static notverified: tagTypes = 'NotVerified';
}
export class UnitStatusID {
  static vacant = 1;
  static tenanted = 2;
}
