using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBlog.Auth
{
    public class Config
    {
        public IConfiguration Configuration { get; }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }


        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "WebBlog API")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                
                // resource owner password grant client
                new Client
                {
                    ClientId = "WebBlogAuthentication",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    ClientSecrets =
                    {
                        new Secret("T2iHoangWebBlog@123!".Sha256())
                    },

                    RedirectUris           = { 
                        "http://localhost:5000/callback",
                        "https://ui-webblog.azurewebsites.net/callback"
                    },

                    PostLogoutRedirectUris = {
                        "http://localhost:5000",
                        "https://ui-webblog.azurewebsites.net"
                    },

                    AllowedCorsOrigins = {
                        "http://localhost:5000",
                        "https://ui-webblog.azurewebsites.net"
                    },
                    //AllowedCorsOrigins = { "http://localhost:5000" },
                    
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.Address,
                        "api1"
                    }
                }
            };
        }
    }
}
