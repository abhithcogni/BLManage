﻿using Microsoft.AspNetCore.Mvc;

namespace BankLoanManage.Controllers
{
    public class Bankcontroller : Controller
    {   
        public IActionResult CustomerDashBoard()
        {
            return View();
        }
    }
}
