using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ExpenseTracker.Repository.Interfaces
{
    public interface IAnalyticsRepository
    {
        Task<float> GetTotalExpenseTodayAsync(string email,int date, int month, int year);
        Task<float> GetTotalIncomeTodayAsync(string email, int date, int month, int year);
        Task<float> GetTotalExpenseThisWeekAsync(string email,int date,int month,int year);
        Task<float> GetTotalIncomeThisWeekAsync(string email, int date,int month,int year);
        Task<float> GetTotalExpenseByMonthAsync(string email, int year, int month);
        Task<float> GetTotalIncomeByMonthAsync(string email, int year, int month);
        Task<float> GetTotalExpenseThisYearAsync(string email,int year);
        Task<float> GetTotalIncomeThisYearAsync(string email, int year);

        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryTodayAsync(string email,int date, int month, int year);
        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisWeekAsync(string email, int date, int month, int year);
        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisMonthAsync(string email, int month, int year);
        Task<IEnumerable<KeyValuePair<string, float>>> GetTotalExpenseByCategoryThisYearAsync(string email,int year);
    }
}
