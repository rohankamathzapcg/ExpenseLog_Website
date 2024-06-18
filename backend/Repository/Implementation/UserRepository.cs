using ExpenseTracker.Data;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Repository.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly ExpenseTrackerDbContext _context;

        public UserRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteAsync(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<User> PostUserForLogin(string id, string password)
        {
            var testUser = await _context.Users.FindAsync(id);

            if(testUser.EmailID==id && testUser.Password == password)
            {
                return testUser;
            }
            else
            {
                return null;
            }
        }
    }

}
