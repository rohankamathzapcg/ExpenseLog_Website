using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpensesController(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            var expenses = await _expenseRepository.GetAllAsync();
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var expense = await _expenseRepository.GetByIdAsync(id);
            if (expense == null)
            {
                return NotFound();
            }
            return Ok(expense);
        }

        [HttpPost]
        public async Task<ActionResult<Expense>> PostExpense(Expense expense)
        {
            var newExpense = await _expenseRepository.AddAsync(expense);
            return CreatedAtAction(nameof(GetExpense), new { id = newExpense.ExpenseId }, newExpense);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(int id, Expense expense)
        {
            if (id != expense.ExpenseId)
            {
                return BadRequest();
            }

            try
            {
                await _expenseRepository.UpdateAsync(expense);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _expenseRepository.GetByIdAsync(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _expenseRepository.GetByIdAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            await _expenseRepository.DeleteAsync(id);

            return NoContent();
        }
    }

}
