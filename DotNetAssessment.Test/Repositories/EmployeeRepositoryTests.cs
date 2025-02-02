using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Data;
using DotNetAssessment.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DotNetAssessment.Tests.Repositories;

public class EmployeeRepositoryTests
{
    private readonly AppDbContext _context;
    private readonly EmployeeRepository _repository;

    public EmployeeRepositoryTests()
    {
        // Use a unique in-memory database name for each test run to avoid conflicts
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _repository = new EmployeeRepository(_context);
    }

    // Helper method to ensure fresh data for each test
    private void ResetDatabase()
    {
        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();
    }

    [Fact]
    public async Task GetAllEmployeesAsync_ShouldReturnAllEmployees()
    {
        // Arrange
        ResetDatabase();

        var employees = new List<Employee>
        {
            new Employee { FirstName = "John", LastName = "Doe", HireDate = DateTime.Now, Phone = "123456789", Address = "Address 1", DepartmentId = 1 },
            new Employee { FirstName = "Jane", LastName = "Smith", HireDate = DateTime.Now, Phone = "987654321", Address = "Address 2", DepartmentId = 1 }
        };

        var expectedCount = _context.Employees.Count() + employees.Count;

        await _context.Employees.AddRangeAsync(employees);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetAllEmployeesAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(expectedCount, result.Count());
        Assert.Equal("John", result.First().FirstName);
    }

    [Fact]
    public async Task GetEmployeeByIdAsync_ShouldReturnEmployee_WhenEmployeeExists()
    {
        // Arrange
        ResetDatabase();

        var employee = new Employee { FirstName = "John", LastName = "Doe", HireDate = DateTime.Now, Phone = "123456789", Address = "Address 1", DepartmentId = 1 };
        await _context.Employees.AddAsync(employee);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetEmployeeByIdAsync(employee.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("John", result.FirstName);
    }

    [Fact]
    public async Task CreateEmployeeAsync_ShouldAddEmployee()
    {
        // Arrange: Reset the database
        ResetDatabase();

        var employee = new Employee { FirstName = "John", LastName = "Doe", HireDate = DateTime.Now, Phone = "123456789", Address = "Address 1", DepartmentId = 1 };

        // Act
        var result = await _repository.CreateEmployeeAsync(employee);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("John", result.FirstName);
        Assert.Equal("Doe", result.LastName);
    }

    [Fact]
    public async Task DeleteEmployeeAsync_ShouldRemoveEmployee()
    {
        // Arrange
        ResetDatabase();

        var employee = new Employee { FirstName = "John", LastName = "Doe", HireDate = DateTime.Now, Phone = "123456789", Address = "Address 1", DepartmentId = 1 };
        await _context.Employees.AddAsync(employee);
        await _context.SaveChangesAsync();

        // Act
        await _repository.DeleteEmployeeAsync(employee.Id);

        // Assert
        var result = await _repository.GetEmployeeByIdAsync(employee.Id);
        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateEmployeeAsync_ShouldUpdateEmployee_WhenEmployeeExists()
    {
        // Arrange
        ResetDatabase();

        var employee = new Employee { FirstName = "John", LastName = "Doe", HireDate = DateTime.Now, Phone = "123456789", Address = "Address 1", DepartmentId = 1 };
        await _context.Employees.AddAsync(employee);
        await _context.SaveChangesAsync();

        // Modify employee details
        employee.FirstName = "Updated John";

        // Act
        var result = await _repository.UpdateEmployeeAsync(employee);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Updated John", result.FirstName);
    }
}
