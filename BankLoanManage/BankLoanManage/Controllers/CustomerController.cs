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
        public IActionResult LoanApplication()
        {
            return View();
        }
        public IActionResult LApplicationStatus()
        {
            return View();
        }
        public IActionResult KYCUpdate()
        {
            return View();
        }
        public IActionResult CustomerUpdate()
        {
            return View();
        }
        public IActionResult CustomerDetails()
        {
            return View();
        }
    }
}
