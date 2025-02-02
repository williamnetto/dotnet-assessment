using DotNetAssessment.Domain.Entities;

namespace DotNetAssessment.Infrastructure.Services;

public interface IDepartmentService
{
    Task<IEnumerable<Department>> GetAllDepartmentsAsync();
}
