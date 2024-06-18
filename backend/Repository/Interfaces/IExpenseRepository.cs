using ExpenseTracker.Model;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IExpenseRepository
    {
        Task<IEnumerable<Expense>> GetAllAsync();
        Task<Expense> GetByIdAsync(int id);
        Task<Expense> AddAsync(Expense expense);
        Task<Expense> UpdateAsync(Expense expense);
        Task DeleteAsync(int id);
    }

}
