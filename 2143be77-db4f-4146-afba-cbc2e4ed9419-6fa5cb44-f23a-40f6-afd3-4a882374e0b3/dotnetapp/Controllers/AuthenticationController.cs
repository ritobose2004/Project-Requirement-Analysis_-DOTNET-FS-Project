// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using dotnetapp.Data;
// using dotnetapp.Models;
// using dotnetapp.Services;
// using Microsoft.AspNetCore.Mvc;
// using Mono.Cecil;

// namespace dotnetapp.Controllers
// {
//     [ApiController]
//     // [Route("api/[controller]")]
//     public class AuthenticationController : ControllerBase
//     {
//         private readonly IAuthService _authService;
//         private readonly ApplicationDbContext _context;
//         private readonly ILogger<AuthenticationController> _logger;

//         public AuthenticationController(IAuthService authService,ApplicationDbContext context,ILogger<AuthenticationController> logger)
//         {
//             _authService=authService;
//             _context=context;
//             _logger=logger;

//         }

//         [HttpPost("api/login")]

//         public async Task<IActionResult> Login([FromBody] LoginModel model)
//         {
//             try{
//                 if(!ModelState.IsValid){
//                     return BadRequest(new {
//                         success=false,
//                         message="Invalid payload"
//                     });
//                 }

//                 var (status,token) = await _authService.Login(model);

//                 if(status==0){
//                     return Unauthorized(new 
//                     {
//                         success=false,
//                         message=token,
//                         // token="",
//                         // tokenType=""
//                     });
//                 }

//                 return Ok(new 
//                 {
//                     success=true,
//                     message="Login successfull",
//                     token=token,
//                     tokenType="Bearer"
//                 });

//             }
//             catch(Exception ex){
//                 _logger.LogError(ex,"Login error");
//                 return StatusCode(500,new
//                 {
//                     success=false,
//                     message=ex.Message
//                 });

//             }

//         }




//         [HttpPost("api/register")]
//         public async Task<IActionResult> Register([FromBody] User model)
//         {
//             try
//             {
//                 if (!ModelState.IsValid)
//                     return BadRequest(new { message = "Invalid payload" });

//                 var allowedRoles = new[] { "Admin", "User", "ProjectManager", "RequirementAnalyst", "Employee" };
//                 if (!allowedRoles.Contains(model.UserRole))
//                 {
//                     return BadRequest(new { message = "Invalid role. Role must be one of: Admin, User, ProjectManager, RequirementAnalyst, Employee" });
//                 }

//                 var (statusCode, message) = await _authService.Registration(model, model.UserRole);

//                 if (statusCode == 0)
//                 {
//                     return BadRequest(new { message });
//                 }
//                 return Ok(new { message = "User registered successfully", role = model.UserRole });
//             }
//             catch(Exception ex)
//             {
//                 _logger.LogError(ex, "Register error");
//                 return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal server error" });
//             }
//         }



//     }
// }



using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetapp.Controllers
{
    [ApiController]
    // [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AuthenticationController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthenticationController(
            IAuthService authService,
            ILogger<AuthenticationController> logger, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("api/login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Invalid payload"
                    });
                }

                var (status, token) = await _authService.Login(model);

                if (status == 0)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Login Unsuccessfull",
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Login successfull",
                    token = token,
                    tokenType = "Bearer"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login error");
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        [HttpPost("api/register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Invalid payload" });
                }

                // Allowed roles as per your snippet
                var allowedRoles = new[] { "Admin", "User", "ProjectManager", "RequirementAnalyst", "Employee" };
                if (!allowedRoles.Contains(model.UserRole))
                {
                    return BadRequest(new
                    {
                        message = "Invalid role. Role must be one of: Admin, User, ProjectManager, RequirementAnalyst, Employee"
                    });
                }

                var (statusCode, message) = await _authService.Registration(model, model.UserRole);

                if (statusCode == 0)
                {
                    return BadRequest(new { message });
                }

                return Ok(new { message = "User registered successfully", role = model.UserRole });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Register error");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal server error" });
            }
        }


    }
}
