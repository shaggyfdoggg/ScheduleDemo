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
            //UserInfo e = dbContext.UserInfos.FirstOrDefault(i => i.GoogleId == newUser.GoogleId);
            if (!dbContext.UserInfos.Any(t => t.GoogleId == newUser.GoogleId))
            {
                dbContext.UserInfos.Add(newUser);
                dbContext.SaveChanges();
            }
            //could eventually add an error or a route to tell user it already exists in database
            return newUser;
        }

        [HttpPatch]
        public UserInfo ChangeInfo([FromBody] UserInfo newInfo) 
        {
            UserInfo n = dbContext.UserInfos.FirstOrDefault(p => p.GoogleId == newInfo.GoogleId);
            n.Address = newInfo.Address;
            n.City = newInfo.City;
            n.State = newInfo.State;            
            dbContext.UserInfos.Update(n);
            dbContext.SaveChanges();
            return n;

            
        }


        


    }
}
