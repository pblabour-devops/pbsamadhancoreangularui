import { TForm } from "../generic-implementation/generic-form-builder.type";

export type ProfileFormViewModel = { // <-- Main form structure
    firstName: string;
    lastName: string;
    address: TForm<AddressFormViewModel>; // Strongly typed nested form,
    countryId: number;
  };

  export type AddressFormViewModel = { // <-- Nested form structure
    street: number;
    city: string;
    pincode: string;
  };

  export class country {
    id: string;
    name: string;
   
    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
    }
  }