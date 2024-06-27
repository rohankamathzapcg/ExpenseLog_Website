
using ExpenseTracker.Data;
using ExpenseTracker.Model;
using ExpenseTracker.Model.DTO;
using ExpenseTracker.Repository.Interfaces;
using Humanizer;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<AccountDTO> AddAsync(AccountDTO account)
        {

            var existingUser = await _context.Users
                    .FirstOrDefaultAsync(acc =>  acc.EmailID == account.EmailID);
            if (existingUser == null) {

                return null;

            }
            var userAccount = new Account
            {
                AccountNo = account.AccountNo,
                Balance = account.Balance,
                User = existingUser
            };

            _context.Accounts.Add(userAccount);
            await _context.SaveChangesAsync();
            return account;
        }

        public Task<AccountDTO> UpdateAsync(AccountDTO cat)
        {
            throw new NotImplementedException();
        }
    }
}
