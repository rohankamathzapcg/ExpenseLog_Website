using DotNetEnv;
using ExpenseTracker.Data;
using ExpenseTracker.Repository.Implementation;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables
Env.Load();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("corspolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Configure Google and Facebook Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
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
    options.CallbackPath = new PathString("/localhost:7026/api/auth/facebook-response"); // Ensure this matches the redirect URI
});

// Add DbContext
builder.Services.AddDbContext<ExpenseTrackerDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ExpenseTrackerCon")));

// Map repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICatMapUserRepository, CatMapUserRepository>();
builder.Services.AddScoped<IIncomeRepository, IncomeRepository>();
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Serve static files from the Images folder
//app.UseStaticFiles(new StaticFileOptions
//{
//    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.ContentRootPath, "Images")),
//    RequestPath = "/Images"
//});

// Use CORS Policy
app.UseCors("corspolicy");

app.UseAuthentication(); // Add authentication middleware
app.UseAuthorization();

app.MapControllers();

app.Run();
