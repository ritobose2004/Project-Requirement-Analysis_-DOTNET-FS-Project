using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dtos
{
    public class ProjectRequirementDto
    {
        public string RequirementTitle { get; set; }
        public string RequirementDescription { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
    }
}