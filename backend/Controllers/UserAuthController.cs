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
using ExpenseTracker.Repository.Implementation;
using Humanizer;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UserAuthController(IUserRepository repository)
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
                    return Accepted("application/json", "Invalid Email ID or Password");
                }
                else
                {
                    return Ok(user);
                }

            }
        }
        [HttpPost("upload-profile-image")]
        public async Task<IActionResult> UploadProfileImage(string emailId, [FromForm] FileStream image)
        {
            // Save the image file to a location or storage service
            var imageName = Guid.NewGuid().ToString(); // Generate a unique name or use the original file name
            // Example: Save to a folder on the server
            var imagePath = Path.Combine("../Data/img", imageName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            // Save image name or path to the database
            var updatedUser = await _repository.UploadProfileImageAsync(emailId, imageName);

            if (updatedUser != null)
            {
                return Ok(updatedUser); // Return updated user with image name/path
            }
            else
            {
                return NotFound(); // Handle not found scenario
            }
        }
        [HttpPut("{id}/{password}")]
        public async Task<IActionResult> PutPassword(string id,string password)
        {

            try
            {
                await _repository.UpdatePassword(id,password);
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
    }
}