using ExpenseTracker.Data;
using ExpenseTracker.Repository.Implementation;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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
app.UseAuthorization();

app.MapControllers();

app.Run();
