using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulerDemo.Models;

namespace SchedulerDemo.Controllers
{

    [Route("[controller]")]

    public class ScheduleController : Controller
    {

        ScheduleDbContext dbContext = new ScheduleDbContext();

        [HttpGet]

        public List<Userform> AllForAdmin()
        {

            return dbContext.Userforms.OrderBy(p => p.DateTime).ToList();
        }

        [HttpGet ("{businessGoogleId}")]
        public List<Userform> AllForBusiness(string businessGoogleId)
        {

            List<Userform> businessSchedule = dbContext.Userforms.OrderBy(p => p.DateTime).ToList();
            return businessSchedule.Where(g => g.BusinessGoogleId == businessGoogleId).ToList();
        }

        [HttpGet("{city}")]
        public List<Userform> MyArea(string city)
        {
            List<Userform> result = dbContext.Userforms.Where(f =>  f.City == city).ToList();
            return result;

        }
        [HttpGet("{lastName}")]
        public List<Userform> ByLastName(string lastName)
        {
            List<Userform> result = dbContext.Userforms.Where(f => f.LastName == lastName).ToList();
            return result;

        }

        [HttpGet("{KeyWord}")]
        public List<Userform> GetByKeyWord(string KeyWord)
        {
            List<Userform> result = dbContext.Userforms.Where(p => p.Description.Contains(KeyWord)).ToList();
            return result;
        }


        [HttpGet("Filtered")]
        public List<Userform> GetFiltered(DateTime? date)
        {
            List<Userform> result = new List<Userform>();
            
            //if(time == null)
            //{

            result = dbContext.Userforms.Where(p => p.DateTime == date).ToList();
            //}

            //else
            //{
            //    result = dbContext.Userforms.Where(p=>p.Date == date && p.Time == time ).ToList();

        //}
            return result; 
        }


        [HttpPost]
        public Userform NewEvent([FromBody] Userform newEvent)
        {
            if (dbContext.Userforms.Any(e => e.DateTime <= newEvent.EndDateTime && e.EndDateTime >= newEvent.DateTime))
            {
                // There is a conflicting event, so don't allow the new event to be booked.
                Console.WriteLine("The selected time slot is already booked. Please choose a different time.");
                // You can return an error message to the user or handle the conflict in your application.
            }
            else
            {
                // No conflicting events, so it's safe to book the new event.
                dbContext.Userforms.Add(newEvent); // Add the new event to the database.
                dbContext.SaveChanges(); // Save changes to the database.
                Console.WriteLine("Event successfully booked.");
                // You can provide a success message or any other actions you want to perform.
            }
                return newEvent;
        }

        //[HttpPost]

        //public Userform NewEvent([FromBody] Userform newEvent)
        //{
        //    dbContext.Userforms.Add(newEvent);
        //    dbContext.SaveChanges();
        //    return newEvent;
        //}

        [HttpDelete("{id}")]
        public Userform DeleteEvent(int id)
        {
            Userform deleted = dbContext.Userforms.Find(id);
            dbContext.Userforms.Remove(deleted);
            dbContext.SaveChanges();
            return deleted;
        }

        [HttpPatch]

        public Userform UpdateEvent([FromBody] Userform updated)
        {
            Userform c = dbContext.Userforms.FirstOrDefault(d => d.Id == updated.Id);
            c.Address = updated.Address;
            c.DateTime = updated.DateTime;
            c.State = updated.State;
            c.Description = updated.Description;
            c.FirstName = updated.FirstName;
            c.LastName = updated.LastName;
            c.City = updated.City;
            c.Public = updated.Public;
            dbContext.Userforms.Update(c);
            dbContext.SaveChanges();
            return c;
        }

        [HttpGet]
        public List<BusinessOwner> GetBusinessOwners()
        {
            return dbContext.BusinessOwners.OrderBy(p => p).ToList();
        }

        //[HttpPost("BusinessOwner")]
        //public BusinessOwner businessOwner([FromBody] BusinessOwner businessOwner)
        //{
        //    if (dbContext.BusinessOwners.Any(b => b.BusinessGoogleId == businessOwner.BusinessGoogleId))
        //    {
        //        return businessOwner;
        //    }
        //    else
        //    {
        //        dbContext.BusinessOwners.Add(businessOwner);
        //        dbContext.SaveChanges();
        //    }
        //    return businessOwner;
        //}



        //[HttpGet("{city}")]
        //public List<Userform> MyArea(string city)
        //{
        //    List<Userform> result = dbContext.Userforms.Where(f => f.City == city).ToList();
        //    return result;

        //}



        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
