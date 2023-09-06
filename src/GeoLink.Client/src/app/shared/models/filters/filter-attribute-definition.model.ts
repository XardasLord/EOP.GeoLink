export interface FilterAttributeDefinitionModel {
  idAtrF: number;
  atrFType: number;
  name: FilterAttributeNameDefinitionEnum;
  description: string;
}

export enum FilterAttributeNameDefinitionEnum {
  objectNrExpl = 'objectNrExpl',
  objectName = 'objectName',
  city = 'miejscowosc',
  street = 'ulica',
  buildingNumber = 'nrBud',
  plotNumber = 'nrDzialek',
  ppe = 'ppe',
  ipAddress = 'ipAddress',
  serialNumber = 'serialNumber',
}
