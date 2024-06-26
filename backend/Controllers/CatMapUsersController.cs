using ExpenseTracker.Model;
using ExpenseTracker.Repository.Implementation;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatMapUsersController : ControllerBase
    {
        private readonly ICatMapUserRepository _repository;

        public CatMapUsersController(ICatMapUserRepository repository)
        {
            _repository = repository;

        }
      
        [HttpPost]
        public async Task<ActionResult<List<CatMapUserDTO>>> AddAsync(List<CatMapUserDTO> cat)
        {
            
            await _repository.AddAsync(cat);

            return Ok(cat);
        }

    }
}
