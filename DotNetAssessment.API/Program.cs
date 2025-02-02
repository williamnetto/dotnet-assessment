using DotNetAssessment.API.Validators;
using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Data;
using DotNetAssessment.Infrastructure.Middlewares;
using DotNetAssessment.Infrastructure.Repositories;
using DotNetAssessment.Infrastructure.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register repositories
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

// Register services
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();

// Validators
builder.Services.AddScoped<IValidator<Employee>, EmployeeValidator>();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:56718") // React app URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// Apply any pending migrations at startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Apply pending migrations and create the database if necessary
    dbContext.Database.Migrate();
}
// Use CORS before using routing
app.UseCors("AllowReactApp");

//Use Middlewares
app.UseMiddleware<ApiKeyMiddleware>();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
