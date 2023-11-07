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

    public TimeSpan? MondayHoursOpen { get; set; }

    public TimeSpan? MondayHoursClose { get; set; }

    public TimeSpan? TuesdayHoursOpen { get; set; }

    public TimeSpan? TuesdayHoursClose { get; set; }

    public TimeSpan? WednesdayHoursOpen { get; set; }

    public TimeSpan? WednesdayHoursClose { get; set; }

    public TimeSpan? ThursdayHoursOpen { get; set; }

    public TimeSpan? ThursdayHoursClose { get; set; }

    public TimeSpan? FridayHoursOpen { get; set; }

    public TimeSpan? FridayHoursClose { get; set; }

    public TimeSpan? SatudayHoursOpen { get; set; }

    public TimeSpan? SaturdayHoursClose { get; set; }

    public TimeSpan? SundayHoursOpen { get; set; }

    public TimeSpan? SundayHoursClose { get; set; }

    public string? Services { get; set; }
}
