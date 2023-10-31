using System;
using System.Collections.Generic;

namespace SchedulerDemo.Models;

public partial class Calendar
{
    public DateTime CalendarDate { get; set; }

    public int? Year { get; set; }

    public int? Month { get; set; }

    public int? Day { get; set; }

    public int? DayOfWeek { get; set; }
}
