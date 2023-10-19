using System;
using System.Collections.Generic;

namespace SchedulerDemo.Models;

public partial class UserInfo
{
    public int Id { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? GoogleId { get; set; }
}
