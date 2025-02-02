using DotNetAssessment.Domain.Entities;

namespace DotNetAssessment.Infrastructure.Services;

public interface IEmployeeService
{
    Task<Employee> GetEmployeeByIdAsync(int id);
    Task<IEnumerable<Employee>> GetAllEmployeesAsync();
    Task<Employee> CreateEmployeeAsync(Employee employee);
    Task<Employee> UpdateEmployeeAsync(Employee employee);
    Task DeleteEmployeeAsync(int id);
}
