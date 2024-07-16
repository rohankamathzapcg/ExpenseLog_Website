using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTracker.Data;
using ExpenseTracker.Model;
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
                .Where(i => i.EmailId == email)
                .Select(i => new TransactionDTO
                {
                    TransactionId = i.IncomeId,
                    Date = i.IncomeDate,
                    Amount = i.amount,
                    NewBalance = i.NewBalance,
                    Remarks = i.remarks,
                    AccountNo = i.AccountNo,
                    EmailId = i.EmailId,
                    Type = "Income"
                })
                .ToListAsync();

            var expenses = await _context.Expenses
                .Where(e => e.EmailId == email)
                .Select(e => new TransactionDTO
                {
                    TransactionId = e.ExpenseId,
                    Date = e.ExpenseDate,
                    Amount = e.Amount,
                    NewBalance = e.NewBalance,
                    Remarks = e.Remarks,
                    AccountNo = e.AccountNo,
                    EmailId = e.EmailId,
                    Type = "Expense"
                })
                .ToListAsync();

            var transactions = incomes.Concat(expenses)
                .OrderByDescending(t => t.Date)
                .ToList();

            return transactions;
        }
    }
}
