using System;
using System.Collections.Generic;

namespace SchedulerDemo.Models;

public partial class Userform
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTime? DateTime { get; set; }

    public string? Description { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public bool? Public { get; set; }
}
