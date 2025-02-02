using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DotNetAssessment.Domain.Entities;

namespace DotNetAssessment.Infrastructure.Repositories;

public interface IDepartmentRepository
{
    Task<IEnumerable<Department>> GetAllDepartmentsAsync();
}
