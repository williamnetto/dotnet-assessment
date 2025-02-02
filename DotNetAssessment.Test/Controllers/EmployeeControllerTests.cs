using DotNetAssessment.API.Controllers;
using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DotNetAssessment.Tests.Controllers;

public class EmployeeControllerTests
{
    private readonly Mock<IEmployeeService> _mockEmployeeService;
    private readonly EmployeeController _controller;

    public EmployeeControllerTests()
    {
        _mockEmployeeService = new Mock<IEmployeeService>();
        _controller = new EmployeeController(_mockEmployeeService.Object);
    }

    [Fact]
    public async Task GetAllEmployees_ShouldReturnOkResult_WhenEmployeesExist()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now },
            new Employee { Id = 2, FirstName = "Jane", LastName = "Smith", HireDate = DateTime.Now }
        };

        _mockEmployeeService.Setup(service => service.GetAllEmployeesAsync())
            .ReturnsAsync(employees);

        // Act
        var result = await _controller.GetAllEmployees();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnEmployees = Assert.IsAssignableFrom<IEnumerable<Employee>>(okResult.Value);
        Assert.Equal(2, returnEmployees.Count());  // Ensure 2 employees are returned
    }

    [Fact]
    public async Task GetAllEmployees_ShouldReturnEmptyList_WhenNoEmployeesExist()
    {
        // Arrange
        _mockEmployeeService.Setup(service => service.GetAllEmployeesAsync())
            .ReturnsAsync(new List<Employee>());

        // Act
        var result = await _controller.GetAllEmployees();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnEmployees = Assert.IsAssignableFrom<IEnumerable<Employee>>(okResult.Value);
        Assert.Empty(returnEmployees);  // Ensure no employees are returned
    }

    [Fact]
    public async Task GetEmployeeById_ShouldReturnOkResult_WhenEmployeeExists()
    {
        // Arrange
        var employee = new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now };

        _mockEmployeeService.Setup(service => service.GetEmployeeByIdAsync(1))
            .ReturnsAsync(employee);

        // Act
        var result = await _controller.GetEmployeeById(1);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnEmployee = Assert.IsType<Employee>(okResult.Value);
        Assert.Equal("John", returnEmployee.FirstName);  // Verify that employee's first name is "John"
    }

    [Fact]
    public async Task GetEmployeeById_ShouldReturnNotFound_WhenEmployeeDoesNotExist()
    {
        // Arrange
        _mockEmployeeService.Setup(service => service.GetEmployeeByIdAsync(1))
            .ReturnsAsync((Employee)null);  // Simulate no employee found

        // Act
        var result = await _controller.GetEmployeeById(1);

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);  // Ensure NotFound response is returned
    }

    [Fact]
    public async Task CreateEmployee_ShouldReturnCreatedAtActionResult_WhenEmployeeIsCreated()
    {
        // Arrange
        var employee = new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now };

        _mockEmployeeService.Setup(service => service.CreateEmployeeAsync(employee))
            .ReturnsAsync(employee);

        // Act
        var result = await _controller.CreateEmployee(employee);

        // Assert
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnEmployee = Assert.IsType<Employee>(createdAtActionResult.Value);
        Assert.Equal("John", returnEmployee.FirstName);  // Ensure employee's first name is "John"
    }

    [Fact]
    public async Task UpdateEmployee_ShouldReturnOkResult_WhenEmployeeIsUpdated()
    {
        // Arrange
        var employee = new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now };
        var updatedEmployee = new Employee { Id = 1, FirstName = "Updated John", LastName = "Doe", HireDate = DateTime.Now };

        _mockEmployeeService.Setup(service => service.UpdateEmployeeAsync(employee))
            .ReturnsAsync(updatedEmployee);

        // Act
        var result = await _controller.UpdateEmployee(1, employee);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnEmployee = Assert.IsType<Employee>(okResult.Value);
        Assert.Equal("Updated John", returnEmployee.FirstName);  // Ensure first name is updated
    }

    [Fact]
    public async Task UpdateEmployee_ShouldReturnBadRequest_WhenEmployeeIdMismatch()
    {
        // Arrange
        var employee = new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now };

        // Act
        var result = await _controller.UpdateEmployee(2, employee);  // Mismatch in IDs

        // Assert
        Assert.IsType<BadRequestResult>(result.Result);  // Ensure BadRequest is returned
    }

    [Fact]
    public async Task DeleteEmployee_ShouldReturnNoContent_WhenEmployeeIsDeleted()
    {
        // Arrange
        var employeeId = 1;

        _mockEmployeeService.Setup(service => service.DeleteEmployeeAsync(employeeId))
            .Returns(Task.CompletedTask);  // Simulate successful deletion

        // Act
        var result = await _controller.DeleteEmployee(employeeId);

        // Assert
        Assert.IsType<NoContentResult>(result);  // Ensure NoContent response is returned
    }
}
