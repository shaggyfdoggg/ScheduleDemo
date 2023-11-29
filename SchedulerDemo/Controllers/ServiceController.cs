using Microsoft.AspNetCore.Mvc;
using SchedulerDemo.Models;

namespace SchedulerDemo.Controllers
{
    [Route("[controller]")]
    public class ServiceController : Controller
    {
        ScheduleDbContext dbContext = new ScheduleDbContext();

        [HttpGet]

        public List<Service> GetServices()
        {
            return dbContext.Services.OrderBy(s => s.BusinessGoogleId).ToList();
        }

        [HttpGet("{businessId}")]
        public List<Service> GetServicesByBusiness(string businessId)
        {
            List<Service>result = dbContext.Services.Where(s => s.BusinessGoogleId == businessId).ToList();
            return result;
        }

        [HttpGet("Single/{Id}")]
        public Service GetService(int Id)
        {
            return dbContext.Services.FirstOrDefault(s => s.Id == Id);
        }

        [HttpDelete("{Id}")]

        public Service DeleteService(int Id)
        {
            Service s = dbContext.Services.FirstOrDefault(r => r.Id == Id); 
            dbContext.Services.Remove(s);
            dbContext.SaveChanges();
            return s;
        }


        [HttpPost]

        public Service PostService([FromBody] Service s) 
        {
            dbContext.Services.Add(s);
            dbContext.SaveChanges();
            return s;
        }



    }
}
