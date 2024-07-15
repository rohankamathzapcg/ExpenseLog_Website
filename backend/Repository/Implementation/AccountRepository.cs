
using ExpenseTracker.Data;

using ExpenseTracker.Model;
using ExpenseTracker.Model.DTO;
using ExpenseTracker.Repository.Interfaces;
using Humanizer;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Runtime;
using System.Security.Principal;

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
                    .FirstOrDefaultAsync(acc => acc.EmailID == account.EmailID);
            var existingAccount = await _context.Accounts
                   .FirstOrDefaultAsync(acc => acc.AccountNo == account.AccountNo);
            if (existingUser == null )
            {
                return null;

            }
            if (existingAccount == null && existingUser != null)
            {
                var userAccount = new Account
                {
                    AccountNo = account.AccountNo,
                    Balance = account.Balance,
                    BankName = account.BankName,
                    BranchName = account.BranchName,
                    User = existingUser
                };
                _context.Accounts.Add(userAccount);
                await _context.SaveChangesAsync();
            }
            return account;
        }

        public async Task<AccountDTO> UpdateAsync(AccountDTO account)
        {
            var existingUser = await _context.Users
                      .FirstOrDefaultAsync(acc => acc.EmailID == account.EmailID);
            
            var accountToUpdate = new Account
            {
                AccountNo = account.AccountNo,
                BranchName = account.BranchName,
                BankName = account.BankName,
                Balance= account.Balance,
                User = existingUser
            };
            _context.Entry(accountToUpdate).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return account;
        }
        public async Task<Account> DeleteAsync(string EmailId, string accountNo)
        {
            var existingAccount = await _context.Accounts
                   .FirstOrDefaultAsync(acc => acc.AccountNo == accountNo && acc.UserId == EmailId);

            if (existingAccount != null)
            {
                _context.Accounts.Remove(existingAccount);
                await _context.SaveChangesAsync();
                return existingAccount;
            }
            return null;
           
        }

        public async Task<IEnumerable<Account>> GetAllAsync(string EmailId)
        {
            List<Account> accounts = await _context.Accounts
                                    .Where(acc => acc.UserId == EmailId)
                                    .ToListAsync();
            return accounts;
        }
        public async Task<Account> GetAsync(string EmailId, string accountNo)
        {
            var existingAccount = await _context.Accounts
                   .FirstOrDefaultAsync(acc => acc.AccountNo == accountNo && acc.UserId == EmailId);

            if (existingAccount != null)
            {
                return existingAccount;
            }
            else
            {
                return null;
            }
        }

    }
}
