using ExpenseTracker.Data;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseTracker.Repository
{
    public class AnalyticsRepository : IAnalyticsRepository
    {
        private readonly ExpenseTrackerDbContext _context;

        public AnalyticsRepository(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<float> GetTotalExpenseTodayAsync(string email, int date, int month, int year)
        {
            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Day == date && e.ExpenseDate.Month == month && e.ExpenseDate.Year == year)
                .SumAsync(e => e.Amount);
        }

        public async Task<float> GetTotalIncomeTodayAsync(string email, DateTime date)
        {
            return await _context.Incomes
                .Where(i => i.EmailID == email && i.IncomeDate==date.ToUniversalTime())
                .SumAsync(i => i.Amount);
        }

        public async Task<float> GetTotalExpenseThisWeekAsync(string email, int date, int month, int year)
        {
            var startDate = new DateTime(year, month, date).StartOfWeek(DayOfWeek.Monday);
            var endDate = startDate.AddDays(7);

            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate >= startDate && e.ExpenseDate < endDate)
                .SumAsync(e => e.Amount);
        }

        public async Task<float> GetTotalIncomeThisWeekAsync(string email, int date, int month, int year)
        {
            var startDate = new DateTime(year, month, date).StartOfWeek(DayOfWeek.Monday);
            var endDate = startDate.AddDays(7);

            return await _context.Incomes
                .Where(i => i.EmailID == email && i.IncomeDate >= startDate && i.IncomeDate < endDate)
                .SumAsync(i => i.Amount);
        }

        public async Task<float> GetTotalExpenseByMonthAsync(string email, int year, int month)
        {
            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Year == year && e.ExpenseDate.Month == month)
                .SumAsync(e => e.Amount);
        }

        public async Task<float> GetTotalIncomeByMonthAsync(string email, int year, int month)
        {
            return await _context.Incomes
                .Where(i => i.EmailID == email && i.IncomeDate.Year == year && i.IncomeDate.Month == month)
                .SumAsync(i => i.Amount);
        }

        public async Task<float> GetTotalExpenseThisYearAsync(string email, int year)
        {
            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Year == year)
                .SumAsync(e => e.Amount);
        }

        public async Task<float> GetTotalIncomeThisYearAsync(string email, int year)
        {
            return await _context.Incomes
                .Where(i => i.EmailID == email && i.IncomeDate.Year == year)
                .SumAsync(i => i.Amount);
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryTodayAsync(string email, int date, int month, int year)
        {
            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Day == date && e.ExpenseDate.Month == month && e.ExpenseDate.Year == year)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisWeekAsync(string email, int date, int month, int year)
        {
            var startDate = new DateTime(year, month, date).StartOfWeek(DayOfWeek.Monday);
            var endDate = startDate.AddDays(7);

            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate >= startDate && e.ExpenseDate < endDate)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisMonthAsync(string email, int month, int year)
        {
            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Month == month && e.ExpenseDate.Year == year)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }

        public async Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisYearAsync(string email, int year)
        {
            return await _context.Expenses
                .Where(e => e.EmailID == email && e.ExpenseDate.Year == year)
                .GroupBy(e => e.Category.CategoryName)
                .Select(g => new KeyValuePair<string, float>(g.Key, g.Sum(e => e.Amount)))
                .ToListAsync();
        }
    }

    public static class DateTimeExtensions
    {
        public static DateTime StartOfWeek(this DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }
    }
}
