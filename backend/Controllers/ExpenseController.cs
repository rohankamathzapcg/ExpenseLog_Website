using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExpenseTracker.Data;
using ExpenseTracker.Model.DTO;
using ExpenseTracker.Repository.Interfaces;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.Implementation;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseController(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpensesByEmail(string email)
        {
            var expenses = await _expenseRepository.GetByEmailAsync(email);
            if (expenses == null || !expenses.Any())
            {
                return NotFound();
            }
            return Ok(expenses);
        }

        [HttpPost]
        public async Task<ActionResult> CreateExpense([FromBody] ExpenseDTO expenseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdExpense = await _expenseRepository.AddAsync(expenseDto);
                return CreatedAtAction(nameof(GetExpensesByEmail), new { email = createdExpense.EmailId }, createdExpense);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateExpense(int id, [FromBody] ExpenseDTO expenseDto)
        {
            if (id != expenseDto.ExpenseId)
            {
                return BadRequest();
            }

            try
            {
                var updatedExpense = await _expenseRepository.UpdateAsync(expenseDto);
                return Ok(updatedExpense);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("total-expense")]
        public async Task<ActionResult<float>> GetTotalExpense(string email, int year, int month)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required.");
            }

            try
            {
                var totalExpense = await _expenseRepository.GetTotalExpenseByMonthAsync(email, year, month);
                return Ok(totalExpense);
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
