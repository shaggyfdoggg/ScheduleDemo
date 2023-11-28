import { Time } from "@angular/common";

export interface BusinessOwner {
    ID: number;
    businessGoogleId?: string;
    businessName?: string;
    employeeName?: string;
    address?: string;
    city?: string;
    state?: string;
    mondayHoursOpen?: string;
    mondayHoursClose?: string;
    tuesdayHoursOpen?: string;
    tuesdayHoursClose?: string;
    wednesdayHoursOpen?: string;
    wednesdayHoursClose?: string;
    thursdayHoursOpen?: string;
    thursdayHoursClose?: string;
    fridayHoursOpen?: string;
    fridayHoursClose?: string;
    saturdayHoursOpen?: string;
    saturdayHoursClose?: string;
    sundayHoursOpen?: string;
    sundayHoursClose?: string;
    services?: string;
    oneLocation?: boolean;
}
