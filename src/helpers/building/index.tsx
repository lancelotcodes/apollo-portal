export const BuildingsTypes: string[] = [
    'Office Building',
    'Retail Building',
    'Warehouse Building',
    'Condominium Building',
    'Dormitory Building',
];

export const isBuildingType = (name: string | null) => {
    return name && BuildingsTypes.includes(name);
}