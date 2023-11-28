using Microsoft.AspNetCore.Mvc;

namespace SchedulerDemo.Controllers
{
    public class ServiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
