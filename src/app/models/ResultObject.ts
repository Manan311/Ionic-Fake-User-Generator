import { Address } from './Address';
import { DOB } from './DOB';
import { Login } from './Login';
import { Picture } from './Picture';
import { Name } from './Name';

export interface ResultObject
{
     gender: string;
     name: Name;
     location: Address;
     email: string;
     login: Login;
     dob: DOB;
     phone: string;
     cell: string;
     picture: Picture;
}
