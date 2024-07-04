using ExpenseTracker.Model;
using ExpenseTracker.Repository.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Policy;
using Microsoft.AspNetCore.Authentication.Facebook;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using NuGet.Common;

[Route("api/[controller]")]
[ApiController]
public class SocialAuthController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public SocialAuthController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("google-login")]
    public IActionResult GoogleLogin()
    {
        var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
        return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("google-response")]
    public async Task<IActionResult> GoogleResponse()
    {
        string token;
        var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        if (!result.Succeeded || result.Principal == null)
        {
            return BadRequest("Failed to authenticate with Google.");
        }

        var identity = result.Principal.Identities.FirstOrDefault();
        if (identity == null)
        {
            return BadRequest("No claims identity found.");
        }

        var claims = identity.Claims.ToList();

        var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var userId = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var firstName = claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value;
        var lastName = claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value;

        if (string.IsNullOrEmpty(email))
        {
            return BadRequest("Email not found in claims.");
        }

        // Check if user exists in database
        var existingUser = await _userRepository.GetByIdAsync(email);
        if (existingUser == null)
        {
            // Create a new user if not exists
            var newUser = new User
            {
                EmailID = email,
                FullName = firstName + " " + lastName,
                Occupation = "None"
            };
            await _userRepository.AddSocialAsync(newUser);
            token = GenerateToken(newUser);  
        }
        else
        {
            token= GenerateToken(existingUser);
        }
        var redirectUrl = $"http://localhost:3000/auth-callback?token={token}";
        return Redirect(redirectUrl);
    }

    private string GenerateToken(User user)
    {
        List<Claim> claims = new List<Claim> {
                new Claim("EmailID", user.EmailID),
               new Claim("FullName",user.FullName),
               new Claim("Occupation",user.Occupation)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            Environment.GetEnvironmentVariable("TokenSecret")!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
            );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

    [HttpGet("signin-facebook")]
    public IActionResult SignInWithFacebook()
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = Url.Action("FacebookResponse")
        };
        return Challenge(properties, FacebookDefaults.AuthenticationScheme);
    }

    [HttpGet("facebook-response")]
    public async Task<IActionResult> FacebookResponse()
    {
        string token;
        var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        if (!result.Succeeded || result.Principal == null)
        {
            return BadRequest("Failed to authenticate with Facebook.");
        }

        var identity = result.Principal.Identities.FirstOrDefault();
        if (identity == null)
        {
            return BadRequest("No claims identity found.");
        }

        var claims = identity.Claims.ToList();

        var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var userId = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var name = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

        if (string.IsNullOrEmpty(email))
        {
            return BadRequest("Email not found in claims.");
        }

        // Check if user exists in database
        var existingUser = await _userRepository.GetByIdAsync(email);
        if (existingUser == null)
        {
            // Create a new user if not exists
            var newUser = new User
            {
                EmailID = email,
                FullName = name,
                Occupation = "None"
            };
            await _userRepository.AddSocialAsync(newUser);
            token = GenerateToken(newUser);
        }
        else
        {
            token = GenerateToken(existingUser);
        }
        var redirectUrl = $"http://localhost:3000/auth-callback?token={token}";
        return Redirect(redirectUrl);
    }

}

