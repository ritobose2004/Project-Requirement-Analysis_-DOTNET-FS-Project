using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IProjectRequirementService
    {
        Task<IEnumerable<ProjectRequirement>> GetAllProjectRequirements();

        Task<ProjectRequirement> GetProjectRequirementById(int requirementId);

        Task<IEnumerable<ProjectRequirement>> GetProjectRequirementsByUserId(int userId);

        Task AddProjectRequirement(ProjectRequirement projectRequirement);

        Task<bool> UpdateProjectRequirement(int requirementId, ProjectRequirement projectRequirement);

        Task<bool> DeleteProjectRequirement(int requirementId);

        Task<bool> UpdateStatus(int requirementId, string status);
    }
}