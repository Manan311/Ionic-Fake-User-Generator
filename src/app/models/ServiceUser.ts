import { FilterData } from './FilterData';
import { ResultObject } from './ResultObject';

export class ServiceUser {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ID: string;

    serviceName: string;

    gender: string;
    name: string;
    email: string;
    username: string;
    password: string;
    dob: Date;
    phone: string;
    cell: string;
    picture: string;
    address: string;

    constructor(serName: string, result: ResultObject, data: FilterData) {
        this.serviceName = serName;

        if (data.gender)
            {this.gender = result.gender;}
        if (data.name){
            this.name = result.name.title + ' ' +
                result.name.first + ' ' +
                result.name.last;
        }
        if (data.email)
            {this.email = result.email;}
        if (data.username)
            {this.username = result.login.username;}
        if (data.password)
            {this.password = result.login.password;}
        if (data.dob)
            {this.dob = new Date(result.dob.date);}
        if (data.phone)
            {this.phone = result.phone;}
        if (data.cell)
            {this.cell = result.cell;}
        if (data.picture)
            {this.picture = result.picture.large;}
        if (data.address)
            {this.address = result.location.street.number + ', ' +
            result.location.street.name + ', ' +
            result.location.city + ', ' +
            result.location.state + ', ' +
            result.location.country + ', ' +
            result.location.postcode;}
    }
}
