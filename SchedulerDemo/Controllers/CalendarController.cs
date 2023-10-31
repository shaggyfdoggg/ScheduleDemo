using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulerDemo.Models;

namespace SchedulerDemo.Controllers
{
        [Route("[controller]")]
    public class CalendarController : Controller
    {

       
        ScheduleDbContext dbContext = new ScheduleDbContext();
        //public Calendar TimeParameters(DateTime current)
        //{
        //    return dbContext.Calendar();
            
        //}
    }
}
