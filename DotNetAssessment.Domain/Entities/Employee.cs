namespace DotNetAssessment.Domain.Entities;

public class Employee
{
    public int Id { get; set; } // Primary Key
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime HireDate { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }

    // Foreign Key
    public int DepartmentId { get; set; }
    public virtual Department Department { get; set; }
}
