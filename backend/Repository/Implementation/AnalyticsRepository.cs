using ExpenseTracker.Data;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Repository.Implementation
{
    public class AnalyticsRepository:IAnalyticsRepository
    {

        private readonly ExpenseTrackerDbContext _context;

        public AnalyticsRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }
        public async Task<float> GetTotalExpenseTodayAsync(string email)
        {
            var today = DateTime.Today;
            return await _context.Expenses
                             .Where(e => e.EmailID == email &&
                                         e.ExpenseDate.Date == today)
                             .SumAsync(e => e.Amount);
        }

        public async Task<float> GetTotalIncomeTodayAsync(string email)
        {
            var today = DateTime.Today;
            return await _context.Incomes
                          .Where(i => i.EmailID == email &&
                                      i.IncomeDate.Date == today)
                          .SumAsync(i => i.Amount);
        }
        public async Task<float> GetTotalExpenseThisWeekAsync(string email)
        {
            var today = DateTime.Today;
            var startOfWeek = today.AddDays(-(int)today.DayOfWeek);
            var endOfWeek = startOfWeek.AddDays(7);

            return await _context.Expenses
                             .Where(e => e.EmailID == email &&
                                         e.ExpenseDate >= startOfWeek &&
                                         e.ExpenseDate < endOfWeek)
                             .SumAsync(e => e.Amount);
        }

        public async Task<float> GetTotalIncomeThisWeekAsync(string email)
        {
            var today = DateTime.Today;
            var startOfWeek = today.AddDays(-(int)today.DayOfWeek);
            var endOfWeek = startOfWeek.AddDays(7);

            return await _context.Incomes
                          .Where(i => i.EmailID == email &&
                                      i.IncomeDate >= startOfWeek &&
                                      i.IncomeDate < endOfWeek)
                          .SumAsync(i => i.Amount);
        }

        public async Task<float> GetTotalExpenseByMonthAsync(string email, int year, int month)
        {
            return await _context.Expenses
                             .Where(e => e.EmailID == email &&
                            e.ExpenseDate.Year == year &&
                            e.ExpenseDate.Month == month)
                            .SumAsync(e => e.Amount);

        }
        public async Task<float> GetTotalIncomeByMonthAsync(string email, int year, int month)
        {
            return await _context.Incomes
                          .Where(i => i.EmailID == email &&
                          i.IncomeDate.Year == year &&
                          i.IncomeDate.Month == month)
                          .SumAsync(i => i.Amount);
        }
       
        public async Task<float> GetTotalExpenseThisYearAsync(string email)
        {
            var thisYear = DateTime.Today.Year;
            return await _context.Expenses
                             .Where(e => e.EmailID == email &&
                                         e.ExpenseDate.Year == thisYear)
                             .SumAsync(e => e.Amount);
        }

        public async Task<float> GetTotalIncomeThisYearAsync(string email)
        {
            var thisYear = DateTime.Today.Year;
            return await _context.Incomes
                          .Where(i => i.EmailID == email &&
                                      i.IncomeDate.Year == thisYear)
                          .SumAsync(i => i.Amount);
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryTodayAsync(string email)
        {
            var today = DateTime.Today;
            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Date == today)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisWeekAsync(string email)
        {
            var today = DateTime.Today;
            var startOfWeek = today.AddDays(-(int)today.DayOfWeek);
            var endOfWeek = startOfWeek.AddDays(7);

            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate >= startOfWeek && e.ExpenseDate < endOfWeek)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisMonthAsync(string email)
        {
            var today = DateTime.Today;
            var year = today.Year;
            var month = today.Month;

            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Year == year && e.ExpenseDate.Month == month)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisYearAsync(string email)
        {
            var year = DateTime.Today.Year;

            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Year == year)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }
    }
}
