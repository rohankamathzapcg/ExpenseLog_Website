using ExpenseTracker.Model;
using ExpenseTracker.Model.DTO;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IExpenseRepository
    {
        Task<IEnumerable<Expense>> GetByEmailAsync(string email);
        Task<ExpenseDTO> AddAsync(ExpenseDTO income);
        Task<ExpenseDTO> UpdateAsync(ExpenseDTO income);
        Task<float> GetTotalExpenseByMonthAsync(string email, int year, int month);
    }

}
