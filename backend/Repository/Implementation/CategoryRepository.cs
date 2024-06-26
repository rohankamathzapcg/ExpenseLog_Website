using ExpenseTracker.Data;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ExpenseTrackerDbContext _context;

        public CategoryRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }
        public async Task<Category> AddAsync(Category cat)
        {
            _context.Categories.Add(cat);
            await _context.SaveChangesAsync();
            return cat;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

    }

}
