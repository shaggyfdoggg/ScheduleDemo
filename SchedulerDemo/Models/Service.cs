using System;
using System.Collections.Generic;

namespace SchedulerDemo.Models;

public partial class Service
{
    public int Id { get; set; }

    public string? BusinessGoogleId { get; set; }

    public string? ServiceName { get; set; }

    public string? MinutesLong { get; set; }

    public decimal? EstimatedPrice { get; set; }
}
