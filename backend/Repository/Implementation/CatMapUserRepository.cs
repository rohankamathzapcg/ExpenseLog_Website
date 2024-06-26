using ExpenseTracker.Data;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;

namespace ExpenseTracker.Repository.Implementation
{
    public class CatMapUserRepository : ICatMapUserRepository
    {
        private readonly ExpenseTrackerDbContext _context;

        public CatMapUserRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }
        public async Task<List<CatMapUserDTO>> AddAsync(List<CatMapUserDTO> cat)
        {
            var catMapUsers = new List<CatMapUser>();

            foreach (var dto in cat)
            {
                var newCat= await _context.Categories.FindAsync(dto.CategoryId);
                var user = await _context.Users.FindAsync(dto.EmailID); // Assuming EmailID is the primary key of User
                if (user == null || newCat == null)
                {
                    // Handle case where user with given EmailID does not exist
                    // You may throw an exception or handle it as needed
                    throw new InvalidOperationException($"User with EmailID '{dto.EmailID}' not found.");
                }

                var catMapUser = new CatMapUser
                {
                    CategoryId = dto.CategoryId,
                    EmailID = dto.EmailID,
                    User = user,
                    category = newCat
                    // You may map other properties as needed
                };

                catMapUsers.Add(catMapUser);
            }
            _context.CategoriesMapUsers.AddRange(catMapUsers);
            await _context.SaveChangesAsync();
            return cat;
        }
    }
}
