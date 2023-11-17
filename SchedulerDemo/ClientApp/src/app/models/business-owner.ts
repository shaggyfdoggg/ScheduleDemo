import { Time } from "@angular/common";

export interface BusinessOwner {
    ID: number;
    BusinessGoogleID?: string;
    BusinessName?: string;
    EmployeeName?: string;
    Address?: string;
    City?: string;
    State?: string;
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
    Services?: string;
    oneLocation?: boolean;
}
