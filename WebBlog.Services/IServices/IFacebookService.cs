using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebBlog.Database.Models;

namespace WebBlog.Services.IServices
{
    interface IFacebookService
    {
        Task<ApplicationUser> GetAccountAsync(string accessToken);
        Task PostOnWallAsync(string accessToken, string message);
    }
}
