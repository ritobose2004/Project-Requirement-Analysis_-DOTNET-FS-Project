using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string FrontEndTechStack { get; set; }
        public string BackendTechStack { get; set; }
        public string Database { get; set; }
        public string Status { get; set; }

    }
}