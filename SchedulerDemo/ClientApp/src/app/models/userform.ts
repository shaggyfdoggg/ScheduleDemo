import { Time } from "@angular/common";

export interface Userform {
    id: number;
    firstName?: string;
    lastName?: string;
    date?: Date;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    public?: boolean;
}
