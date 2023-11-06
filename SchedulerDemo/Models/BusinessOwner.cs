using System;
using System.Collections.Generic;

namespace SchedulerDemo.Models;

public partial class BusinessOwner
{
    public int Id { get; set; }

    public string? BusinessGoogleId { get; set; }

    public string? BusinessName { get; set; }

    public string? EmployeeName { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public TimeOnly? MondayHoursOpen { get; set; }

    public TimeOnly? MondayHoursClose { get; set; }

    public TimeOnly? TuesdayHoursOpen { get; set; }

    public TimeOnly? TuesdayHoursClose { get; set; }

    public TimeOnly? WednesdayHoursOpen { get; set; }

    public TimeOnly? WednesdayHoursClose { get; set; }

    public TimeOnly? ThursdayHoursOpen { get; set; }

    public TimeOnly? ThursdayHoursClose { get; set; }

    public TimeOnly? FridayHoursOpen { get; set; }

    public TimeOnly? FridayHoursClose { get; set; }

    public TimeOnly? SatudayHoursOpen { get; set; }

    public TimeOnly? SaturdayHoursClose { get; set; }

    public TimeOnly? SundayHoursOpen { get; set; }

    public TimeOnly? SundayHoursClose { get; set; }

    public string? Services { get; set; }
}
