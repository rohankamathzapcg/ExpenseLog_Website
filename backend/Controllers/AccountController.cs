using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _repository;

        public AccountController(IAccountRepository repository)
        {
            _repository = repository;
          
        }
        [HttpPost]
        public async Task<ActionResult<Account>> AddAsync(Account acc)
        {
            await _repository.AddAsync(acc);
           
            return Ok(acc);
        }

    }
}
