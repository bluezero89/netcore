# netcore
“Building a simple Blog Engine using ASP.NET Core”.


The architecture of project was based on the common N-Layers architecture for web development (https://docs.microsoft.com/en-us/dotnet/standard/modern-web-apps-azure-architecture/common-web-application-architectures)

Demo:
- WebBlog.SPA was deployed to azure site (https://ui-webblog.azurewebsites.net) (Account: enduser - Pass: User@123) 
- WebBlog (WebBlog management) was deployed to(https://admin-webblog.azurewebsites.net) (Account: admin.webblog@gmail.com - Pass: Admin@123)
- WebBlog.Api (Api WebBlog) was also deployed to (https://api-webblog.azurewebsites.net/swagger/index.html)

Because I connected to MySQL database on Google Cloud, hence I used MySql provider of entity framework. With the security reasons, I set authorized to access to My SQL instance with trust IP addresses.
If you want to run Web project (WebBlog, WebBlog.Api, WebBlog.Auth) as your localhost. Please use SQLite provider.
 
To use SQLite provider of entity framework

- Remove MySQL package reference <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="2.0.1" />

- Add SQLite package reference <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="2.1.0" />

- In Startup.cs change UseSqlServer to UseSqlite

- Update connection string: 

			+ "WebBlogDBConnection": "Data Source=webblog.db"
			
			+ "WebBlogIdentityDBConnection": "Data Source=webblogIdentityDB.db"	

			(Database files also was commited in folder ../WebBlog.Database/Data)

- Delete add existing migration and Add the new one for SQLite


INSTRUCTIONS:

1/Please make sure your connection strings in appsettings.json point to a local SQL Server instance.

2/Open a command prompt in the Web folder (~\WebBlog\WebBlog) and execute the following commands:

dotnet restore
dotnet ef database update -c WebBlogDbContext -p ../WebBlog.Database/WebBlog.Database.csproj -s WebBlog.csproj
dotnet ef database update -c ApplicationDbContext -p ../WebBlog.Database/WebBlog.Database.csproj -s WebBlog.csproj

3/If you need to create migrations, you can use these commands:

-- create migration (from Web folder CLI)
dotnet ef migrations add InitialModel --context WebBlogDbContext -p ../WebBlog.Database/WebBlog.Database.csproj -s WebBlog.csproj -o Data/Migrations
dotnet ef migrations add InitialIdentityModel --context ApplicationDbContext -p ../WebBlog.Database/WebBlog.Database.csproj -s WebBlog.csproj -o Data/Migrations

4/I built the client SPA with technologies: (React + webpack + typescript). 
	
	Open a command promt in the Web SPA folder (~\WebBlog\WebBlog.SPA) and execute the following commands:
		
		npm install 
		npm run-script build
		npm start
	
	(url: http://localhost:5000)
	
5/I built the client SPAV2 with technologies: (React + webpack + babel). 
	
	Open a command promt in the Web SPA folder (~\WebBlog\WebBlog.SPAV2) and execute the following commands:
		
		npm install 
		npm run-script build
		npm start
	
	(url: http://localhost:5001)
