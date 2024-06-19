using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Data;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var user = await _repository.GetAllAsync();
            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(string id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null)
            {
                return Ok("Check your email and password or create an account.");
            }
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            var existingUser = await _repository.GetByIdAsync(user.EmailID);
            if (existingUser != null)
            {
                return Ok("Email already exists.");
            }
            var newUser = await _repository.AddAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.EmailID }, newUser);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.EmailID)
            {
                return BadRequest();
            }

            try
            {
                await _repository.UpdateAsync(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _repository.GetByIdAsync(id) == null)
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
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(id);

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> CheckLogin(User login)
        {
            {
                var user = await _repository.PostUserForLogin(login);
                if (user == null)
                {
                    return Ok("Invalid Email ID or Password");
                }
                else
                {
                    return Ok(user);
                }

            }
        }
    }
}
