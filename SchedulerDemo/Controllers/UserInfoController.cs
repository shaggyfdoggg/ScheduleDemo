using Microsoft.AspNetCore.Mvc;
using SchedulerDemo.Models;

namespace SchedulerDemo.Controllers
{

    [Route("[controller]")]
    public class UserInfoController : Controller
    {
        ScheduleDbContext dbContext = new ScheduleDbContext();


        [HttpGet("{id}")]
        public UserInfo GetByGoogleId(string id) 
        {
            return dbContext.UserInfos.FirstOrDefault(i => i.GoogleId == id);
        }


        [HttpPost]
          public UserInfo NewUser([FromBody] UserInfo newUser)
        {
            dbContext.UserInfos.Add(newUser);
            dbContext.SaveChanges();
            return newUser;
        }


        


    }
}
