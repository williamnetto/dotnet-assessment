using DotNetAssessment.Domain.Entities;
using DotNetAssessment.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DotNetAssessment.Infrastructure.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly AppDbContext _context;

        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
        {
            return await _context.Departments.ToListAsync();
        }
    }
}
