using System.Threading.Tasks;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IAnalyticsRepository
    {
        Task<float> GetTotalExpenseTodayAsync(string email);
        Task<float> GetTotalIncomeTodayAsync(string email);
        Task<float> GetTotalExpenseThisWeekAsync(string email);
        Task<float> GetTotalIncomeThisWeekAsync(string email);
        Task<float> GetTotalExpenseByMonthAsync(string email, int year, int month);
        Task<float> GetTotalIncomeByMonthAsync(string email, int year, int month);
        Task<float> GetTotalExpenseThisYearAsync(string email);
        Task<float> GetTotalIncomeThisYearAsync(string email);

        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryTodayAsync(string email);
        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisWeekAsync(string email);
        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisMonthAsync(string email);
        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisYearAsync(string email);
    }
}
