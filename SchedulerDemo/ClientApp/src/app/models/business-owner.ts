import { Time } from "@angular/common";

export interface BusinessOwner {
    id: number;
    businessGoogleId?: string;
    businessName?: string;
    employeeName?: string;
    address?: string;
    city?: string;
    state?: string;
    mondayHoursOpen?: Date;
    mondayHoursClose?: Date;
    tuesdayHoursOpen?: Date;
    tuesdayHoursClose?: Date;
    wednesdayHoursOpen?: Date;
    wednesdayHoursClose?: Date;
    thursdayHoursOpen?: Date;
    thursdayHoursClose?: Date;
    fridayHoursOpen?: Date;
    fridayHoursClose?: Date;
    saturdayHoursOpen?: Date;
    saturdayHoursClose?: Date;
    sundayHoursOpen?: Date;
    sundayHoursClose?: Date;
    services?: string;
    oneLocation?: boolean;
}
