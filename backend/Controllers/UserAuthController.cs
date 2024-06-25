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
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UserAuthController(IUserRepository repository, IWebHostEnvironment hostEnvironment)
        {
            _repository = repository;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _repository.GetAllAsync();
            var usersWithImageSrc = users.Select(x => new User()
            {
                EmailID = x.EmailID,
                FullName = x.FullName,
                Password = x.Password,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
            });
            return Ok(usersWithImageSrc);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(string id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null)
            {
                return Ok("Check your email and password or create an account.");
            }

            user.ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName);
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> PostUser([FromForm] User user)
        {
            var existingUser = await _repository.GetByIdAsync(user.EmailID);
            if (existingUser != null)
            {
                return Ok("Email already exists.");
            }

            if (user.ImageFile != null)
            {
                user.ImageName = await SaveImage(user.ImageFile);
            }

            var newUser = await _repository.AddAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.EmailID }, newUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, [FromForm] User user)
        {
            if (id != user.EmailID)
            {
                return BadRequest();
            }

            if (user.ImageFile != null)
            {
                DeleteImage(user.ImageName);
                user.ImageName = await SaveImage(user.ImageFile);
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

            DeleteImage(user.ImageName);
            await _repository.DeleteAsync(id);

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> CheckLogin(User login)
        {
            var user = await _repository.PostUserForLogin(login);
            if (user == null)
            {
                return Accepted("application/json", "Invalid Email ID or Password");
            }
            else
            {
                user.ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName);
                return Ok(user);
            }
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
