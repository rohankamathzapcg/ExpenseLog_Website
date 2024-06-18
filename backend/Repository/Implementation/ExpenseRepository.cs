using ExpenseTracker.Data;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Repository.Implementation
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ExpenseTrackerDbContext _context;

        public ExpenseRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
        {
            return await _context.Expenses.ToListAsync();
        }

        public async Task<Expense> GetByIdAsync(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task<Expense> AddAsync(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<Expense> UpdateAsync(Expense expense)
        {
            _context.Entry(expense).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task DeleteAsync(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense != null)
            {
                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();
            }
        }
    }

}
