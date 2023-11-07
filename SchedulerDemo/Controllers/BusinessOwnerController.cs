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



        [HttpGet]
        public List<BusinessOwner> AllBusinesses()
        {
           return dbContext.BusinessOwners.ToList();
        }

        [HttpGet("{businessGoogleId}")]
        public List<Userform> AllForBusiness(string businessGoogleId)
        {

            List<Userform> businessSchedule = dbContext.Userforms.OrderBy(p => p.DateTime).ToList();
            businessSchedule = businessSchedule.Where(g => g.BusinessGoogleId == businessGoogleId).ToList();
            return businessSchedule;
        }

        [HttpPost]
        public BusinessOwner businessOwner([FromBody] BusinessOwner businessOwner)
        {
            
            //if (dbContext.BusinessOwners.Any(b => b.BusinessGoogleId == businessOwner.BusinessGoogleId))
            //{
            //    return businessOwner;
            //}
            //else
            //{
                dbContext.BusinessOwners.Add(businessOwner);
                dbContext.SaveChanges();
            //}
            return businessOwner;
        }
    }
}
