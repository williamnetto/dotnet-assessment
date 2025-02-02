using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotNetAssessment.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly IDepartmentService _departmentService;

    public DepartmentController(IDepartmentService departmentService)
    {
        _departmentService = departmentService;
    }

    // GET: api/Department
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Department>>> GetAllDepartments()
    {
        var departments = await _departmentService.GetAllDepartmentsAsync();

        if (departments == null || !departments.Any())
            return NoContent();

        return Ok(departments);
    }
}
