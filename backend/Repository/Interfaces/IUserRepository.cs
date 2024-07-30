using ExpenseTracker.Model;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IUserRepository
    {

        Task<IEnumerable<User>> GetAllAsync();
        Task<User> AddAsync(User user);
        Task<User> GetByIdAsync(string id);
        Task<User> UpdateAsync(User user);
        Task DeleteAsync(string id);
        Task<User> PostUserForLogin(User login);
        Task<User> AddSocialAsync(User user);
        Task<User> UploadProfileImageAsync(string emailId, string imageName);

        Task<User> UpdatePassword(string emailId,string password);
    }
}

