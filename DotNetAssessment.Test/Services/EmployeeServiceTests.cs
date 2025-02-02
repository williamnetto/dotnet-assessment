using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Repositories;
using DotNetAssessment.Infrastructure.Services;
using FluentAssertions;
using Moq;

namespace DotNetAssessment.Tests.Services;

public class EmployeeServiceTests
{
    private readonly Mock<IEmployeeRepository> _mockEmployeeRepo;
    private readonly EmployeeService _employeeService;

    public EmployeeServiceTests()
    {
        _mockEmployeeRepo = new Mock<IEmployeeRepository>();
        _employeeService = new EmployeeService(_mockEmployeeRepo.Object);
    }

    [Fact]
    public async Task GetAllEmployeesAsync_ShouldReturnEmployees()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now },
            new Employee { Id = 2, FirstName = "Jane", LastName = "Doe", HireDate = DateTime.Now }
        };

        _mockEmployeeRepo.Setup(repo => repo.GetAllEmployeesAsync()).ReturnsAsync(employees);

        // Act
        var result = await _employeeService.GetAllEmployeesAsync();

        // Assert
        result.Should().NotBeNull(); // Ensure the result is not null
        result.Count().Should().Be(2); // Ensure there are two employees
    }

    [Fact]
    public async Task GetAllEmployeesAsync_ShouldReturnEmptyList_WhenNoEmployeesExist()
    {
        // Arrange
        var employees = new List<Employee>();

        _mockEmployeeRepo.Setup(repo => repo.GetAllEmployeesAsync()).ReturnsAsync(employees);

        // Act
        var result = await _employeeService.GetAllEmployeesAsync();

        // Assert
        result.Should().NotBeNull(); // Ensure the result is not null
        result.Count().Should().Be(0); // Ensure no employees were returned
    }

    [Fact]
    public async Task GetEmployeeByIdAsync_ShouldReturnEmployee_WhenEmployeeExists()
    {
        // Arrange
        var employeeId = 1;
        var employee = new Employee { Id = employeeId, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now };

        _mockEmployeeRepo.Setup(repo => repo.GetEmployeeByIdAsync(employeeId)).ReturnsAsync(employee);

        // Act
        var result = await _employeeService.GetEmployeeByIdAsync(employeeId);

        // Assert
        result.Should().NotBeNull(); // Ensure the result is not null
        result.Id.Should().Be(employeeId); // Ensure the employee ID matches
        result.FirstName.Should().Be("John"); // Ensure the first name is correct
    }

    [Fact]
    public async Task GetEmployeeByIdAsync_ShouldReturnNull_WhenEmployeeDoesNotExist()
    {
        // Arrange
        var employeeId = 1;

        _mockEmployeeRepo.Setup(repo => repo.GetEmployeeByIdAsync(employeeId)).ReturnsAsync((Employee)null);

        // Act
        var result = await _employeeService.GetEmployeeByIdAsync(employeeId);

        // Assert
        result.Should().BeNull(); // Ensure no employee is returned
    }

    [Fact]
    public async Task CreateEmployeeAsync_ShouldCreateEmployee_WhenValidEmployeeIsGiven()
    {
        // Arrange
        var employee = new Employee { FirstName = "John", LastName = "Doe", HireDate = DateTime.Now, Phone = "123456789", Address = "123 Street" };

        _mockEmployeeRepo.Setup(repo => repo.CreateEmployeeAsync(employee)).Returns(Task.FromResult(new Employee()));

        // Act
        await _employeeService.CreateEmployeeAsync(employee);

        // Assert
        _mockEmployeeRepo.Verify(repo => repo.CreateEmployeeAsync(employee), Times.Once); // Ensure AddEmployeeAsync was called once
    }

    [Fact]
    public async Task UpdateEmployeeAsync_ShouldUpdateEmployee_WhenEmployeeExists()
    {
        // Arrange
        var employee = new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now };
        _mockEmployeeRepo.Setup(repo => repo.UpdateEmployeeAsync(employee)).Returns(Task.FromResult(new Employee()));

        // Act
        await _employeeService.UpdateEmployeeAsync(employee);

        // Assert
        _mockEmployeeRepo.Verify(repo => repo.UpdateEmployeeAsync(employee), Times.Once); // Ensure UpdateEmployeeAsync was called once
    }

    [Fact]
    public async Task UpdateEmployeeAsync_ShouldThrowException_WhenEmployeeDoesNotExist()
    {
        // Arrange
        var employee = new Employee { Id = 1, FirstName = "John", LastName = "Doe", HireDate = DateTime.Now };
        _mockEmployeeRepo.Setup(repo => repo.UpdateEmployeeAsync(employee)).ThrowsAsync(new KeyNotFoundException());

        // Act & Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _employeeService.UpdateEmployeeAsync(employee));
    }

    [Fact]
    public async Task DeleteEmployeeAsync_ShouldDeleteEmployee_WhenEmployeeExists()
    {
        // Arrange
        var employeeId = 1;
        _mockEmployeeRepo.Setup(repo => repo.DeleteEmployeeAsync(employeeId)).Returns(Task.CompletedTask);

        // Act
        await _employeeService.DeleteEmployeeAsync(employeeId);

        // Assert
        _mockEmployeeRepo.Verify(repo => repo.DeleteEmployeeAsync(employeeId), Times.Once); // Ensure DeleteEmployeeAsync was called once
    }

    [Fact]
    public async Task DeleteEmployeeAsync_ShouldThrowException_WhenEmployeeDoesNotExist()
    {
        // Arrange
        var employeeId = 1;
        _mockEmployeeRepo.Setup(repo => repo.DeleteEmployeeAsync(employeeId)).ThrowsAsync(new KeyNotFoundException());

        // Act & Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _employeeService.DeleteEmployeeAsync(employeeId));
    }
}
