import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  bhk: number;
  furnishingType: string;
  price: number;
  builtArea: number;
  carpetArea?: number;
  adress: string;
  adress2?: string;
  city: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove: number;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?: Date | any;
  image?: string;
  description?: string;
}
