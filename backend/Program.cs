using DotNetEnv;
using ExpenseTracker.Data;
using ExpenseTracker.Repository.Implementation;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Env.Load();
//var ClientId = Environment.GetEnvironmentVariable("GoogleOAuth_ClientID");
//var ClientSecret= Environment.GetEnvironmentVariable("GoogleOAuth_ClientSecret");
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("corspolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

//Google Auth
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    // Set a default challenge scheme to one of your providers, or leave it unspecified if you want to specify it in the controller.
})
.AddCookie()
.AddGoogle(options =>
{
    options.ClientId = Environment.GetEnvironmentVariable("GoogleOAuth_ClientID");
    options.ClientSecret = Environment.GetEnvironmentVariable("GoogleOAuth_ClientSecret");
    options.Scope.Add("profile");
    options.Scope.Add("email");
})
.AddFacebook(options =>
{
    options.AppId = Environment.GetEnvironmentVariable("FacebookAppId");
    options.AppSecret = Environment.GetEnvironmentVariable("FacebookAppSecret");
    options.Scope.Add("email");
    options.Fields.Add("name");
    options.Fields.Add("email");
    options.Fields.Add("picture");
    options.CallbackPath = new PathString("/localhost:5041/api/auth/facebook-response"); // Ensure this matches the redirect URI
});

//Added Db Context
builder.Services.AddDbContext<ExpenseTrackerDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ExpenseTrackerCon")));

//Mapping reposiories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
/////Https
//app.UseKestrel(options =>
//{
//    options.ListenAnyIP(5001, listenOptions =>
//    {
//        listenOptions.UseHttps("certificate.pfx", "password"); // Replace with your certificate path and password
//    });
//});

// Using CORS Policy
app.UseCors("corspolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
