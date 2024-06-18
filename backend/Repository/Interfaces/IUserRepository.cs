using ExpenseTracker.Model;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IUserRepository
    {

        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(string id);
        Task<User> AddAsync(User user);
        Task<User> UpdateAsync(User user);
        Task DeleteAsync(string id);
        Task<User> PostUserForLogin(string id, string password);
    }
}

