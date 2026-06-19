using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Exceptions
{
    public class ProjectException : Exception
    {
        public ProjectException(string message):base(message){
            
        }
        
    }
}