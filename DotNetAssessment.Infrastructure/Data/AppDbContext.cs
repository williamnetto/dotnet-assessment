using DotNetAssessment.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetAssessment.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        // Configuring the relationship between Employee and Department
        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department) 
            .WithMany() 
            .HasForeignKey(e => e.DepartmentId); 

        // Seeding initial data for Departments
        modelBuilder.Entity<Department>().HasData(
            new Department { Id = 1, Name = "IT" },
            new Department { Id = 2, Name = "HR" },
            new Department { Id = 3, Name = "Finance" }
        );

        // Seeding initial data for Employees
        modelBuilder.Entity<Employee>().HasData(
            new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = new DateTime(2020, 1, 1), Phone = "123456789", Address = "123 Street", DepartmentId = 1 },
            new Employee { Id = 2, FirstName = "Jane", LastName = "Smith", HireDate = new DateTime(2018, 4, 27), Phone = "987654321", Address = "456 Avenue", DepartmentId = 2 },
            new Employee { Id = 3, FirstName = "Michael", LastName = "Johnson", HireDate = new DateTime(2021, 5, 6), Phone = "456789123", Address = "789 Road", DepartmentId = 3 }

        );

        base.OnModelCreating(modelBuilder);
    }
}
