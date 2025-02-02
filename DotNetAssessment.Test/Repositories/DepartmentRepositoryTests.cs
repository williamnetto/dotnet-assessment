using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Data;
using DotNetAssessment.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DotNetAssessment.Tests.Repositories;

public class DepartmentRepositoryTests
{
    private readonly AppDbContext _context;
    private readonly DepartmentRepository _repository;

    public DepartmentRepositoryTests()
    {
        // Use a unique in-memory database name for each test run to avoid conflicts
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _repository = new DepartmentRepository(_context);
    }

    // Helper method to ensure fresh data for each test
    private void ResetDatabase()
    {
        _context.Database.EnsureDeleted();  // Ensure previous data is deleted
        _context.Database.EnsureCreated();  // Ensure a new database is created for the test
    }

    [Fact]
    public async Task GetAllDepartmentsAsync_ShouldReturnAllDepartments()
    {
        // Arrange
        ResetDatabase();

        var departments = new List<Department>
        {
            new Department { Name = "Logistic" },
            new Department { Name = "Accounting" },
        };

        var expectedCount = _context.Departments.Count() + departments.Count;

        await _context.Departments.AddRangeAsync(departments);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetAllDepartmentsAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(expectedCount, result.Count()); 
        Assert.Contains(result, d => d.Name == "Logistic");
        Assert.Contains(result, d => d.Name == "Accounting");
    }
}
