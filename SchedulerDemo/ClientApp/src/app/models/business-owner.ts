import { Time } from "@angular/common";

export interface BusinessOwner {
    ID: number;
    businessGoogleId?: string;
    businessName?: string;
    employeeName?: string;
    address?: string;
    city?: string;
    state?: string;
    MondayHoursOpen?: string;
    MondayHoursClose?: string;
    TuesdayHoursOpen?: string;
    TuesdayHoursClose?: string;
    WednesdayHoursOpen?: string;
    WednesdayHoursClose?: string;
    ThursdayHoursOpen?: string;
    ThursdayHoursClose?: string;
    FridayHoursOpen?: string;
    FridayHoursClose?: string;
    SaturdayHoursOpen?: string;
    SaturdayHoursClose?: string;
    SundayHoursOpen?: string;
    SundayHoursClose?: string;
    services?: string;
    oneLocation?: boolean;
}
