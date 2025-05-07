using Microsoft.AspNetCore.Mvc;

namespace BankLoanManage.Controllers
{
    public class Bankcontroller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult CustomerDashBoard()
        {
            return View();
        }
    }
}
