using DotNetAssessment.Domain.Entities;
using FluentValidation;

namespace DotNetAssessment.API.Validators;

public class EmployeeValidator : AbstractValidator<Employee>
{
    public EmployeeValidator()
    {
        RuleFor(p => p.Address)
        .NotNull().WithMessage("ABC")
        .MinimumLength(50).WithMessage("GBC")
        .MaximumLength(100).WithMessage("DEF");
        RuleFor(p => p.Phone).NotNull().MaximumLength(20);
    }
}
