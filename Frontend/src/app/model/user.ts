import { Adresa } from "./adresa";

export interface User {
  userName: string;
  email: string;
  password: string;
  mobile: number;
  adresses: Adresa[];
}
