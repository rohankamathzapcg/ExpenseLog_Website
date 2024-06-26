
using ExpenseTracker.Data;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Repository.Implementation
{
    public class AccountRepository : IAccountRepository

    {
        private readonly ExpenseTrackerDbContext _context;

        public AccountRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }
        public async Task<Account> AddAsync(Account acc)
        {
   
            _context.Accounts.Add(acc);
            await _context.SaveChangesAsync();
            return acc;
        }

        
    }
}
