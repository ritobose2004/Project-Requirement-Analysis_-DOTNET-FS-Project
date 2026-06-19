using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetProjectById(int projectId);
        Task<bool> AddProject(Project project);
        Task<bool> UpdateProject(int projectId, Project project);
        Task<bool> DeleteProject(int projectId);


    }
}