using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Web;

namespace WebBlog.Common
{
    public class Helper
    {
        private static readonly string[] Iso8601Format = new string[3]
        {
            "yyyy-MM-dd\\THH:mm:ss.FFFFFFF\\Z",
            "yyyy-MM-dd\\THH:mm:ss\\Z",
            "yyyy-MM-dd\\THH:mm:ssK"
        };

        public static string BuildQueryParamString(Dictionary<string, string> dictionaries)
        {
            var parameters = HttpUtility.ParseQueryString(string.Empty);
            foreach (var item in dictionaries)
            {
                if (!string.IsNullOrEmpty(item.Value))
                    parameters[item.Key] = item.Value;
            }

            string paramString = parameters.ToString();

            return (!string.IsNullOrEmpty(paramString) ? "?" + paramString : "");
        }

        public static string BuildHttpQuery(object parameter, Func<string, string> encode)
        {
            if (parameter == null)
            {
                return "null";
            }
            if (parameter is string)
            {
                return (string)parameter;
            }
            if (parameter is bool)
            {
                if (!(bool)parameter)
                {
                    return "false";
                }
                return "true";
            }
            StringBuilder stringBuilder;
            if (!(parameter is int) && !(parameter is long) && !(parameter is float) && !(parameter is double) && !(parameter is decimal) && !(parameter is byte) && !(parameter is sbyte) && !(parameter is short) && !(parameter is ushort) && !(parameter is uint) && !(parameter is ulong))
            {
                if (parameter is Uri)
                {
                    return parameter.ToString();
                }
                stringBuilder = new StringBuilder();
                if (parameter is IEnumerable<KeyValuePair<string, object>>)
                {
                    foreach (KeyValuePair<string, object> item in (IEnumerable<KeyValuePair<string, object>>)parameter)
                    {
                        stringBuilder.AppendFormat("{0}={1}&", encode(item.Key), encode(BuildHttpQuery(item.Value, encode)));
                    }
                    goto IL_020c;
                }
                if (parameter is IEnumerable<KeyValuePair<string, string>>)
                {
                    foreach (KeyValuePair<string, string> item2 in (IEnumerable<KeyValuePair<string, string>>)parameter)
                    {
                        stringBuilder.AppendFormat("{0}={1}&", encode(item2.Key), encode(item2.Value));
                    }
                    goto IL_020c;
                }
                if (parameter is IEnumerable)
                {
                    foreach (object item3 in (IEnumerable)parameter)
                    {
                        stringBuilder.AppendFormat("{0},", encode(BuildHttpQuery(item3, encode)));
                    }
                    goto IL_020c;
                }
                if (parameter is DateTime)
                {
                    var dateTime = (DateTime)parameter;
                    return dateTime.ToUniversalTime().ToString(Iso8601Format[0], CultureInfo.InvariantCulture);
                }
            }

            return parameter.ToString();

            IL_020c:

            if (stringBuilder.Length > 0)
            {
                stringBuilder.Length--;
            }

            return stringBuilder.ToString();
        }
    }
}
