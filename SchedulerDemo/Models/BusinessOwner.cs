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

    public string? MondayHoursOpen { get; set; }

    public string? MondayHoursClose { get; set; }

    public string? TuesdayHoursOpen { get; set; }

    public string? TuesdayHoursClose { get; set; }

    public string? WednesdayHoursOpen { get; set; }

    public string? WednesdayHoursClose { get; set; }

    public string? ThursdayHoursOpen { get; set; }

    public string? ThursdayHoursClose { get; set; }

    public string? FridayHoursOpen { get; set; }

    public string? FridayHoursClose { get; set; }

    public string? SatudayHoursOpen { get; set; }

    public string? SaturdayHoursClose { get; set; }

    public string? SundayHoursOpen { get; set; }

    public string? SundayHoursClose { get; set; }

    public string? Services { get; set; }

    public bool? OneLocation { get; set; }
}
