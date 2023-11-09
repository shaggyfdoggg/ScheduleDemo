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

        [HttpGet("owner/{businessGoogleId}")]
        public BusinessOwner businessOwner(string businessGoogleId)
        {
            return dbContext.BusinessOwners.FirstOrDefault(b => b.BusinessGoogleId == businessGoogleId);
        }

        [HttpPost]
        public BusinessOwner newOwner([FromBody] BusinessOwner owner)
        {
            BusinessOwner b = new BusinessOwner();
            Console.WriteLine(owner.City);
            Console.WriteLine(owner.FridayHoursOpen);
            b.BusinessGoogleId = owner.BusinessGoogleId;
            b.BusinessName = owner.BusinessName;
            b.EmployeeName = owner.EmployeeName;
            b.Address = owner.Address;
            b.City = owner.City;
            b.State = owner.State;
            b.OneLocation = owner.OneLocation;
            b.Services = owner.Services;
            b.MondayHoursOpen = owner.MondayHoursOpen;
            b.MondayHoursClose = owner.MondayHoursClose;
            b.TuesdayHoursOpen = owner.TuesdayHoursOpen;
            b.TuesdayHoursClose = owner.TuesdayHoursClose;
            b.WednesdayHoursOpen = owner.WednesdayHoursOpen;
            b.WednesdayHoursClose = owner.WednesdayHoursClose;
            b.ThursdayHoursOpen = owner.ThursdayHoursOpen;
            b.ThursdayHoursClose = owner.ThursdayHoursClose;
            b.FridayHoursOpen = owner.FridayHoursOpen;
            b.FridayHoursClose = owner.FridayHoursClose;
            b.SatudayHoursOpen = owner.SatudayHoursOpen;
            b.SundayHoursOpen = owner.SundayHoursOpen;
            b.SaturdayHoursClose = owner.SaturdayHoursClose;
            b.SundayHoursClose = owner.SundayHoursClose;
            
            dbContext.BusinessOwners.Add(b);
                dbContext.SaveChanges();
            
            return b;
        }
    }
}
