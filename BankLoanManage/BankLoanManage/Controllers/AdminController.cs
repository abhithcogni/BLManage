using Microsoft.AspNetCore.Mvc;

namespace BankLoanManage.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult AdminDashboard()
        {
            return View();
        }
        public IActionResult AddLoanProduct()
        {
            return View();
        }
        public IActionResult LoanProducts()
        {
            return View();
        }
    }
}
