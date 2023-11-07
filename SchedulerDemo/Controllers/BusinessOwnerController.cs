using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulerDemo.Models;

namespace SchedulerDemo.Controllers
{
    [Route("[controller]")]
    public class BusinessOwnerController : ControllerBase
    {
        ScheduleDbContext dbContext = new ScheduleDbContext();

        [HttpPost]
        public BusinessOwner businessOwner([FromBody] BusinessOwner businessOwner)
        {
            if (dbContext.BusinessOwners.Any(b => b.BusinessGoogleId == businessOwner.BusinessGoogleId))
            {
                return businessOwner;
            }
            else
            {
                dbContext.BusinessOwners.Add(businessOwner);
                dbContext.SaveChanges();
            }
            return businessOwner;
        }
    }
}
