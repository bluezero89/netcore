﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WebBlog.Areas.Administrator.Controllers
{
    [Authorize]
    [Area("Administrator")]
    public class HelpController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}