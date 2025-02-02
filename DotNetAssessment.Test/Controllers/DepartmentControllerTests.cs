using DotNetAssessment.API.Controllers;
using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DotNetAssessment.Tests.Controllers;

public class DepartmentControllerTests
{
    private readonly Mock<IDepartmentService> _mockDepartmentService;
    private readonly DepartmentController _controller;

    public DepartmentControllerTests()
    {
        _mockDepartmentService = new Mock<IDepartmentService>();
        _controller = new DepartmentController(_mockDepartmentService.Object);
    }

    [Fact]
    public async Task GetAllDepartments_ShouldReturnOkResult_WhenDepartmentsExist()
    {
        // Arrange
        var departments = new List<Department>
        {
            new Department { Id = 1, Name = "IT" },
            new Department { Id = 2, Name = "HR" }
        };

        _mockDepartmentService.Setup(service => service.GetAllDepartmentsAsync())
            .ReturnsAsync(departments);

        // Act
        var result = await _controller.GetAllDepartments();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnDepartments = Assert.IsAssignableFrom<IEnumerable<Department>>(okResult.Value);
        Assert.Equal(2, returnDepartments.Count());  // Ensure 2 departments are returned
    }

    [Fact]
    public async Task GetAllDepartments_ShouldReturnNoContent_WhenNoDepartmentsExist()
    {
        // Arrange
        _mockDepartmentService.Setup(service => service.GetAllDepartmentsAsync())
            .ReturnsAsync(new List<Department>());  // No departments available

        // Act
        var result = await _controller.GetAllDepartments();

        // Assert
        Assert.IsType<NoContentResult>(result.Result);  // Ensure NoContent response is returned
    }

    [Fact]
    public async Task GetAllDepartments_ShouldReturnNoContent_WhenDepartmentsAreNull()
    {
        // Arrange
        _mockDepartmentService.Setup(service => service.GetAllDepartmentsAsync())
            .ReturnsAsync((IEnumerable<Department>)null);  // Null departments

        // Act
        var result = await _controller.GetAllDepartments();

        // Assert
        Assert.IsType<NoContentResult>(result.Result);  // Ensure NoContent response is returned
    }
}
