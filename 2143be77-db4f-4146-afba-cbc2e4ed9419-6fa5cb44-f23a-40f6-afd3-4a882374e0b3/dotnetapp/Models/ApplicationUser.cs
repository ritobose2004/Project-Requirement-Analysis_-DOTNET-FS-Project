using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace dotnetapp.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(30, ErrorMessage = "Maximum length should be 30")]
        public string Name { get; set; }
    }
}