using DataAccessLayer.Repository;
using DataAccessLayer.Repository.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Text;

namespace books.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserInfodb _userinfo;

        public LoginController(IConfiguration config, UserInfodb userinfo)
        {
            _config = config;
            _userinfo = userinfo;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);

            if (user != null)
            {
                return Ok("User found: " + user.GivenName);
            }

            return NotFound("User not found");
        }

        private UserInfo Authenticate(UserLogin userLogin)
        {
            var currentUser = _userinfo.UserInfos.FirstOrDefault(o => o.Username.ToLower() == userLogin.Username.ToLower() && o.Password == userLogin.Password);

            return currentUser;
        }
    }
}
