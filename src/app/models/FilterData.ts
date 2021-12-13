export class FilterData {
    gender: boolean;
    name: boolean;
    email: boolean;
    username: boolean;
    password: boolean;
    dob: boolean;
    phone: boolean;
    cell: boolean;
    picture: boolean;
    address: boolean;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    Empty(): boolean {
        return !(this.gender ||
            this.name ||
            this.email ||
            this.username ||
            this.password ||
            this.dob ||
            this.phone ||
            this.cell ||
            this.picture ||
            this.address);
    }
}
