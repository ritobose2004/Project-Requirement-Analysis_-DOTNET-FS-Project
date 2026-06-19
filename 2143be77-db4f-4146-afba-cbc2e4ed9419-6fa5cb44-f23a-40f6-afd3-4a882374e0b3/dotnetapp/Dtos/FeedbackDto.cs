using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Dtos
{
    public class FeedbackDto
    {
        public string FeedbackText { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
    }
}