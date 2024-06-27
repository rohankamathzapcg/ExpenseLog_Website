using ExpenseTracker.Model;
using ExpenseTracker.Model.DTO;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IAccountRepository
    {
        Task<AccountDTO> AddAsync(AccountDTO acc);
        Task<AccountDTO> UpdateAsync(AccountDTO cat);
    }
}
