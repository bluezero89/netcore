using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using WebBlog.Database.Models;
using WebBlog.Database.Models.AccountViewModels;
using WebBlog.Database.Models.UserViewModels;
using WebBlog.Services;
using WebBlog.Services.Services;

namespace WebBlog.Auth.Areas.v1.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Area("v1")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        private Uri RedirectUri
        {
            get
            {
                var uriBuilder = new UriBuilder();
                uriBuilder.Query = null;
                uriBuilder.Fragment = null;
                uriBuilder.Path = Url.Action("FacebookCallback");

                return uriBuilder.Uri;
            }
        }

        public AccountController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser { UserName = model.UserName, FirstName = model.FirstName, LastName = model.LastName, Email = model.Email };
            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);

                string role = "Basic User";

                if (result.Succeeded)
                {
                    if (await _roleManager.FindByNameAsync(role) == null)
                    {
                        await _roleManager.CreateAsync(new IdentityRole(role));
                    }
                    await _userManager.AddToRoleAsync(user, role);
                    await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("userName", user.UserName));
                    await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("firstName", user.FirstName));
                    await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("lastName", user.LastName));
                    await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("email", user.Email));
                    await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("role", role));

                    return Ok(new ProfileViewModel(user));
                }
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error");
            }
        }

        [HttpGet]
        public async Task<ActionResult> Facebook()
        {
            var fb = new FacebookClient();
            var appId = _configuration["FACEBOOK_APP_ID"];
            var secret = _configuration["FACEBOOK_APP_SECRET"];
            var loginUrl = fb.GetLoginUrl("oauth", appId, new
            {
                client_id = appId,
                client_secret = secret,
                redirect_uri = RedirectUri.AbsoluteUri,
                response_type = "code",
                scope = new[] { "email" } // Add other permissions as needed
            });

            return Redirect(loginUrl.AbsoluteUri);
        }

        public async Task<ActionResult> FacebookCallback(string code)
        {
            try
            {
                var fb = new FacebookClient();
                var appId = _configuration["FACEBOOK_APP_ID"];
                var secret = _configuration["FACEBOOK_APP_SECRET"];

                //dynamic result = fb.Post("oauth/access_token", new
                //{
                //    client_id = appId,
                //    client_secret = secret,
                //    redirect_uri = RedirectUri.AbsoluteUri,
                //    code = code
                //});

                var tokenParams = HttpUtility.ParseQueryString(fb.GetAccessToken((string)JObject.Parse(code)["code"], appId, secret));
 
                var accessToken = tokenParams["access_token"];

                // update the facebook client with the access token so
                // we can make requests on behalf of the user
                fb.AccessToken = accessToken;

                var facebookService = new FacebookService(fb);
                var getAccountTask = facebookService.GetAccountAsync(accessToken);
                Task.WaitAll(getAccountTask);
                var account = getAccountTask.Result;

                return Ok(new ProfileViewModel(account));
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error");
            }
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}