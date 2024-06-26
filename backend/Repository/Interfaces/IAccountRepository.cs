using ExpenseTracker.Model;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account> AddAsync(Account acc);        
    }
}
