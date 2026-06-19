using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ProjectRequirement
    {
        [Key]
        public int RequirementId { get; set; }
        public string RequirementTitle { get; set; }
        public string RequirementDescription { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}