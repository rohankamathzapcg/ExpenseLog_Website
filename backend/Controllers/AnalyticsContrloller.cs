using ExpenseTracker.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ExpenseTracker.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsRepository _analyticsRepository;

        public AnalyticsController(IAnalyticsRepository analyticsRepository)
        {
            _analyticsRepository = analyticsRepository;
        }

        [HttpGet("expenses/today")]
        public async Task<IActionResult> GetTotalExpenseToday(string email)
        {
            var totalExpense = await _analyticsRepository.GetTotalExpenseTodayAsync(email);
            return Ok(totalExpense);
        }

        [HttpGet("incomes/today")]
        public async Task<IActionResult> GetTotalIncomeToday(string email)
        {
            var totalIncome = await _analyticsRepository.GetTotalIncomeTodayAsync(email);
            return Ok(totalIncome);
        }

        [HttpGet("expenses/week")]
        public async Task<IActionResult> GetTotalExpenseThisWeek(string email)
        {
            var totalExpense = await _analyticsRepository.GetTotalExpenseThisWeekAsync(email);
            return Ok(totalExpense);
        }

        [HttpGet("incomes/week")]
        public async Task<IActionResult> GetTotalIncomeThisWeek(string email)
        {
            var totalIncome = await _analyticsRepository.GetTotalIncomeThisWeekAsync(email);
            return Ok(totalIncome);
        }

        [HttpGet("expenses/month")]
        public async Task<IActionResult> GetTotalExpenseByMonth(string email, int year, int month)
        {
            var totalExpense = await _analyticsRepository.GetTotalExpenseByMonthAsync(email, year, month);
            return Ok(totalExpense);
        }

        [HttpGet("incomes/month")]
        public async Task<IActionResult> GetTotalIncomeByMonth(string email, int year, int month)
        {
            var totalIncome = await _analyticsRepository.GetTotalIncomeByMonthAsync(email, year, month);
            return Ok(totalIncome);
        }

        [HttpGet("expenses/year")]
        public async Task<IActionResult> GetTotalExpenseThisYear(string email)
        {
            var totalExpense = await _analyticsRepository.GetTotalExpenseThisYearAsync(email);
            return Ok(totalExpense);
        }

        [HttpGet("incomes/year")]
        public async Task<IActionResult> GetTotalIncomeThisYear(string email)
        {
            var totalIncome = await _analyticsRepository.GetTotalIncomeThisYearAsync(email);
            return Ok(totalIncome);
        }
        [HttpGet("expenses/today/by-category")]
        public async Task<IActionResult> GetTotalExpenseByCategoryToday(string email)
        {
            var result = await _analyticsRepository.GetTotalExpenseByCategoryTodayAsync(email);
            return Ok(result);
        }

        [HttpGet("expenses/week/by-category")]
        public async Task<IActionResult> GetTotalExpenseByCategoryThisWeek(string email)
        {
            var result = await _analyticsRepository.GetTotalExpenseByCategoryThisWeekAsync(email);
            return Ok(result);
        }

        [HttpGet("expenses/month/by-category")]
        public async Task<IActionResult> GetTotalExpenseByCategoryThisMonth(string email)
        {
            var result = await _analyticsRepository.GetTotalExpenseByCategoryThisMonthAsync(email);
            return Ok(result);
        }

        [HttpGet("expenses/year/by-category")]
        public async Task<IActionResult> GetTotalExpenseByCategoryThisYear(string email)
        {
            var result = await _analyticsRepository.GetTotalExpenseByCategoryThisYearAsync(email);
            return Ok(result);
        }
    }
}
