using ExpenseTracker.Model;
using ExpenseTracker.Model.DTO;
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
        public async Task<ActionResult<AccountDTO>> AddAsync(AccountDTO account)
        {
            var addedAccount=await _repository.AddAsync(account);
            if (addedAccount != null)
            {
                return Ok(addedAccount);
            }
            else
            {
                return Ok("Invalid EmailID");
            }
        }

    }
}
