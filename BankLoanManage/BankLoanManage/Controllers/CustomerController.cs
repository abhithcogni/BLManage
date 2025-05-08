using Microsoft.AspNetCore.Mvc;

namespace BankLoanManage.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult CustomerDashBoard()
        {
            return View();
        }

        public IActionResult CustomerReport()
        {
            return View();
        }
    }
}
