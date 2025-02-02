using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Repositories;
using DotNetAssessment.Infrastructure.Services;
using Moq;

namespace DotNetAssessment.Tests.Services;

public class DepartmentServiceTests
{
    private readonly Mock<IDepartmentRepository> _mockDepartmentRepo;
    private readonly DepartmentService _departmentService;

    public DepartmentServiceTests()
    {
        _mockDepartmentRepo = new Mock<IDepartmentRepository>();
        _departmentService = new DepartmentService(_mockDepartmentRepo.Object);
    }

    [Fact]
    public async Task GetAllDepartmentsAsync_ShouldReturnAllDepartments()
    {
        // Arrange
        var departments = new List<Department>
        {
            new Department { Id = 1, Name = "HR" },
            new Department { Id = 2, Name = "IT" }
        };

        _mockDepartmentRepo
            .Setup(repo => repo.GetAllDepartmentsAsync())
            .ReturnsAsync(departments);

        // Act
        var result = await _departmentService.GetAllDepartmentsAsync();
        var resultList = result.ToList();

        // Assert
        Assert.NotNull(result); 
        Assert.Equal(departments.Count, resultList.Count);
        Assert.Equal(departments[0].Name, resultList[0].Name);
        Assert.Equal(departments[1].Name, resultList[1].Name); 

        _mockDepartmentRepo.Verify(repo => repo.GetAllDepartmentsAsync(), Times.Once); 
    }

    [Fact]
    public async Task GetAllDepartmentsAsync_ShouldReturnEmptyList_WhenNoDepartmentsExist()
    {
        // Arrange
        var emptyDepartments = new List<Department>();

        _mockDepartmentRepo
            .Setup(repo => repo.GetAllDepartmentsAsync())
            .ReturnsAsync(emptyDepartments);

        // Act
        var result = await _departmentService.GetAllDepartmentsAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
        _mockDepartmentRepo.Verify(repo => repo.GetAllDepartmentsAsync(), Times.Once);
    }
}
