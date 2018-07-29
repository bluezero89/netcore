using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebBlog.Common;

namespace WebBlog.Services
{
    public interface IFacebookClient
    {
        Task<T> GetAsync<T>(string accessToken, string endpoint, string args = null);
        Task PostAsync(string accessToken, string endpoint, object data, string args = null);
    }

    public class FacebookClient : IFacebookClient
    {
        private readonly HttpClient _httpClient;

        private string _accessToken;

        public string AccessToken
        {
            get
            {
                return _accessToken;
            }
            set
            {
                _accessToken = value;
            }
        }


        public FacebookClient()
        {
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://graph.facebook.com/v3.1/")
            };
            _httpClient.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<T> GetAsync<T>(string accessToken, string endpoint, string args = null)
        {
            var response = await _httpClient.GetAsync($"{endpoint}?access_token={accessToken}&{args}");
            if (!response.IsSuccessStatusCode)
                return default(T);

            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<T>(result);
        }

        public async Task PostAsync(string accessToken, string endpoint, object data, string args = null)
        {
            var payload = GetPayload(data);
            await _httpClient.PostAsync($"{endpoint}?access_token={accessToken}&{args}", payload);
        }

        public Uri GetLoginUrl(string dialog, string appId, object parameters, bool isMobile = false)
        {
            if (string.IsNullOrEmpty(dialog))
            {
                throw new ArgumentNullException("dialog");
            }
            if (parameters == null)
            {
                throw new ArgumentNullException("parameters");
            }

            IDictionary<string, object> dictionary3 = new Dictionary<string, object>();
            
            if (dialog.Equals("oauth", StringComparison.OrdinalIgnoreCase) && !dictionary3.ContainsKey("client_id") && !string.IsNullOrEmpty(appId))
            {
                dictionary3.Add("client_id", appId);
            }
            if (!dialog.Equals("oauth", StringComparison.OrdinalIgnoreCase) && !dictionary3.ContainsKey("app_id") && !string.IsNullOrEmpty(appId))
            {
                dictionary3.Add("app_id", appId);
            }
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat(isMobile ? "https://m.facebook.com/" : "https://www.facebook.com/");

            stringBuilder.AppendFormat("dialog/{0}?", dialog);
            foreach (KeyValuePair<string, object> item in dictionary3)
            {
                stringBuilder.AppendFormat("{0}={1}&", WebUtility.UrlEncode(item.Key), WebUtility.UrlEncode(Helper.BuildHttpQuery(item.Value, WebUtility.UrlEncode)));
            }

            stringBuilder.Length--;

            return new Uri(stringBuilder.ToString());
        }

        private static StringContent GetPayload(object data)
        {
            var json = JsonConvert.SerializeObject(data);

            return new StringContent(json, Encoding.UTF8, "application/json");
        }

        public string GetAccessToken(string code, string appId, string appSecret)
        {
            //Notice the empty redirect_uri! And the replace on the code we get from the cookie.
            string url = string.Format("https://graph.facebook.com/oauth/access_token?client_id={0}&redirect_uri={1}&client_secret={2}&code={3}", appId, "", appSecret, code.Replace("\"", ""));

            System.Net.HttpWebRequest request = System.Net.WebRequest.Create(url) as System.Net.HttpWebRequest;
            System.Net.HttpWebResponse response = null;

            try
            {
                using (response = request.GetResponse() as System.Net.HttpWebResponse)
                {
                    System.IO.StreamReader reader = new System.IO.StreamReader(response.GetResponseStream());

                    string retVal = reader.ReadToEnd();
                    return retVal;
                }
            }
            catch
            {
                return null;
            }
        }

        private byte[] FromBase64ForUrlString(string base64ForUrlInput)
        {
            int padChars = (base64ForUrlInput.Length % 4) == 0 ? 0 : (4 - (base64ForUrlInput.Length % 4));
            StringBuilder result = new StringBuilder(base64ForUrlInput, base64ForUrlInput.Length + padChars);
            result.Append(String.Empty.PadRight(padChars, '='));
            result.Replace('-', '+');
            result.Replace('_', '/');
            return Convert.FromBase64String(result.ToString());
        }
    }
}