using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebBlog.Database.Models;
using WebBlog.Services.IServices;

namespace WebBlog.Services.Services
{
    public class FacebookService : IFacebookService
    {
        private readonly IFacebookClient _facebookClient;

        public FacebookService(IFacebookClient facebookClient)
        {
            _facebookClient = facebookClient;
        }

        public async Task<ApplicationUser> GetAccountAsync(string accessToken)
        {
            var result = await _facebookClient.GetAsync<dynamic>(
                accessToken, "me", "fields=id,name,email,first_name,last_name,age_range,birthday,gender,locale");

            if (result == null)
            {
                return new ApplicationUser();
            }

            var account = new ApplicationUser
            {
                Id = result.id,
                Email = result.email,
                UserName = result.username,
                FirstName = result.first_name,
                LastName = result.last_name
            };

            return account;
        }

        public async Task PostOnWallAsync(string accessToken, string message)
            => await _facebookClient.PostAsync(accessToken, "me/feed", new { message });
    }
}
