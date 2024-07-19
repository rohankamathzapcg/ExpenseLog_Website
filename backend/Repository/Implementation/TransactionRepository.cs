using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTracker.Data;
using ExpenseTracker.Model.DTO;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Repository.Implementation
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ExpenseTrackerDbContext _context;

        public TransactionRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TransactionDTO>> GetTransactionsAsync(string email)
        {
            var incomes = await _context.Incomes
                .Where(i => i.EmailID == email)
                .Select(i => new TransactionDTO
                {
                    TransactionId = i.IncomeId,
                    Date = i.IncomeDate,
                    FormattedDate = i.IncomeDate.ToString("yyyy-MM-dd"),
                    Amount = i.Amount,
                    NewBalance = i.NewBalance,
                    Remarks = i.Remarks,
                    AccountNo = i.AccountNo,
                    EmailId = i.EmailID,
                    Type = "Income"
                })
                .ToListAsync();

            var expenses = await _context.Expenses
                .Where(e => e.EmailID == email)
                .Select(e => new TransactionDTO
                {
                    TransactionId = e.ExpenseId,
                    Date = e.ExpenseDate,
                    FormattedDate = e.ExpenseDate.ToString("yyyy-MM-dd"),
                    Amount = e.Amount,
                    NewBalance = e.NewBalance,
                    Remarks = e.Remarks,
                    AccountNo = e.AccountNo,
                    EmailId = e.EmailID,
                    Type = "Expense",
                    CategoryId = e.CategoryId,
                    CategoryName = e.Category.CategoryName // Include category name from Expense
                })
                .ToListAsync();

            var transactions = incomes.Concat(expenses)
                .OrderByDescending(t => t.Date)
                .ToList();

            return transactions;
        }
    }
}
