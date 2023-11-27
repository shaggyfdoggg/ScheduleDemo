using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulerDemo.Models;
using System.Security.Cryptography.Xml;

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
        public BusinessOwner oneOwner(string businessGoogleId)
        {
            return dbContext.BusinessOwners.FirstOrDefault(b => b.BusinessGoogleId == businessGoogleId);
        }

        [HttpPost]
        public BusinessOwner NewOwner([FromBody] BusinessOwner owner)
        {
            try
            {
               
                dbContext.BusinessOwners.Add(owner);
                dbContext.SaveChanges();
                
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
            return owner;
        }
        [HttpPatch]
        public BusinessOwner UpdateOwner([FromBody]BusinessOwner owner)
        {

            BusinessOwner b = dbContext.BusinessOwners.FirstOrDefault(p => p.BusinessGoogleId == owner.BusinessGoogleId);

            //b.BusinessGoogleId = owner.BusinessGoogleId;
            //b.BusinessName = owner.BusinessName;
            //b.EmployeeName = owner.EmployeeName;
            //b.Address = owner.Address;
            //b.City = owner.City;
            //b.State = owner.State;
            //b.OneLocation = owner.OneLocation;
            //b.Services = owner.Services;
            //b.MondayHoursOpen = owner.MondayHoursOpen;
            //b.MondayHoursClose = owner.MondayHoursClose;
            //b.TuesdayHoursOpen = owner.TuesdayHoursOpen;
            //b.TuesdayHoursClose = owner.TuesdayHoursClose;
            //b.WednesdayHoursOpen = owner.WednesdayHoursOpen;
            //b.WednesdayHoursClose = owner.WednesdayHoursClose;
            //b.ThursdayHoursOpen = owner.ThursdayHoursOpen;
            //b.ThursdayHoursClose = owner.ThursdayHoursClose;
            //b.FridayHoursOpen = owner.FridayHoursOpen;
            //b.FridayHoursClose = owner.FridayHoursClose;
            //b.SatudayHoursOpen = owner.SatudayHoursOpen;
            //b.SundayHoursOpen = owner.SundayHoursOpen;
            //b.SaturdayHoursClose = owner.SaturdayHoursClose;
            //b.SundayHoursClose = owner.SundayHoursClose;

            if (owner.BusinessGoogleId != null)
            {
                b.BusinessGoogleId = owner.BusinessGoogleId;
            }

            if (owner.BusinessName != null)
            {
                b.BusinessName = owner.BusinessName;
            }

            if (owner.EmployeeName != null)
            {
                b.EmployeeName = owner.EmployeeName;
            }

            if (owner.Address != null)
            {
                b.Address = owner.Address;
            }

            if (owner.City != null)
            {
                b.City = owner.City;
            }

            if (owner.State != null)
            {
                b.State = owner.State;
            }

            if (owner.OneLocation != null)
            {
                b.OneLocation = owner.OneLocation;
            }

            if (owner.Services != null)
            {
                b.Services = owner.Services;
            }

            if (owner.MondayHoursOpen != null)
            {
                b.MondayHoursOpen = owner.MondayHoursOpen;
            }

            if (owner.MondayHoursClose != null)
            {
                b.MondayHoursClose = owner.MondayHoursClose;
            }

            if (owner.TuesdayHoursOpen != null)
            {
                b.TuesdayHoursOpen = owner.TuesdayHoursOpen;
            }

            if (owner.TuesdayHoursClose != null)
            {
                b.TuesdayHoursClose = owner.TuesdayHoursClose;
            }

            if (owner.WednesdayHoursOpen != null)
            {
                b.WednesdayHoursOpen = owner.WednesdayHoursOpen;
            }

            if (owner.WednesdayHoursClose != null)
            {
                b.WednesdayHoursClose = owner.WednesdayHoursClose;
            }

            if (owner.ThursdayHoursOpen != null)
            {
                b.ThursdayHoursOpen = owner.ThursdayHoursOpen;
            }

            if (owner.ThursdayHoursClose != null)
            {
                b.ThursdayHoursClose = owner.ThursdayHoursClose;
            }

            if (owner.FridayHoursOpen != null)
            {
                b.FridayHoursOpen = owner.FridayHoursOpen;
            }

            if (owner.FridayHoursClose != null)
            {
                b.FridayHoursClose = owner.FridayHoursClose;
            }

            if (owner.SatudayHoursOpen != null)
            {
                b.SatudayHoursOpen = owner.SatudayHoursOpen;
            }

            if (owner.SaturdayHoursClose != null)
            {
                b.SaturdayHoursClose = owner.SaturdayHoursClose;
            }

            if (owner.SundayHoursOpen != null)
            {
                b.SundayHoursOpen = owner.SundayHoursOpen;
            }

            if (owner.SundayHoursClose != null)
            {
                b.SundayHoursClose = owner.SundayHoursClose;
            }
            dbContext.BusinessOwners.Update(b);
            dbContext.SaveChanges();
            return b;
        }
    }
}
