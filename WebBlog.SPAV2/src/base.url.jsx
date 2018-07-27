import { environment } from './environments/environment';

export const BaseUrl = {
    BASE_URL: environment.serviceAPI,
    AUTH_URL: environment.authAPI,
    HOME_URL: environment.clientURL + '/',
    ARTICLE_DETAIL_URL: environment.clientURL + '/article/:articleId',
    LOGIN_URL: environment.clientURL + '/login',
    REGISTER_URL: environment.clientURL + '/register',
    MYPROFILE_URL: environment.clientURL + '/myprofile',
    MYBLOGS_URL: environment.clientURL + '/myblogs',
    CATEGORYBLOGS_URL: environment.clientURL + '/categoryblogs',
    CATEGORYBLOGS_DETAIL_URL: environment.clientURL + '/categoryblogs/:category',
    SEARCHBLOGS_URL: environment.clientURL + '/searchblogs',
    SEARCHBLOGS_DETAIL_URL: environment.clientURL + '/searchblogs/:search',
    CREATE_BLOG_URL: environment.clientURL + '/createblog',
    ARTICLE_URL: environment.clientURL + '/article'
}