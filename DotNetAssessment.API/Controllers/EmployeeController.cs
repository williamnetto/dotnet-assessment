using DotNetAssessment.API.Extensions;
using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace DotNetAssessment.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;
    private readonly IValidator<Employee> _employeeValidator;

    public EmployeeController(IEmployeeService employeeService, IValidator<Employee> employeeValidator)
    {
        _employeeService = employeeService;
        _employeeValidator = employeeValidator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
    {
        var employees = await _employeeService.GetAllEmployeesAsync();
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployeeById(int id)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);
        if (employee == null)
        {
            return NotFound();
        }
        return Ok(employee);
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
    {
        var validationResult = await _employeeValidator.ValidateAsync(employee);

        if(!validationResult.IsValid){
            validationResult.AddToModelState(ModelState);
            return BadRequest(ModelState);
        }

        var createdEmployee = await _employeeService.CreateEmployeeAsync(employee);
        return CreatedAtAction(nameof(CreateEmployee), new { id = createdEmployee.Id }, createdEmployee);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Employee>> UpdateEmployee(int id, Employee employee)
    {
        if (id != employee.Id)
        {
            return BadRequest();
        }

        var updatedEmployee = await _employeeService.UpdateEmployeeAsync(employee);
        return Ok(updatedEmployee);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
        await _employeeService.DeleteEmployeeAsync(id);
        return NoContent();
    }
}
