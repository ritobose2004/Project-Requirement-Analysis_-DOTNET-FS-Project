using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace dotnetapp.Services
{
    public class ProjectRequirementService : IProjectRequirementService
    {
        private readonly ApplicationDbContext _context;
        // private readonly ILogger<ProjectRequirementService> _logger;
        public ProjectRequirementService(ApplicationDbContext context)
        {
            _context = context;
            // _logger = logger;
        }

        public async Task<IEnumerable<ProjectRequirement>> GetAllProjectRequirements()
        {
            // _logger.LogInformation("Retrieving all project requirements from the database.");
            var requirements = await _context.ProjectRequirements.Include(r => r.User).ToListAsync();
            // _logger.LogInformation("Successfully retrieved {Count} project requirements.", requirements.Count);
            return requirements;
        }

        public async Task<ProjectRequirement> GetProjectRequirementById(int requirementId)
        {
            // _logger.LogInformation("Attempting to retrieve project requirement with ID: {RequirementId}", requirementId);
            var req = await _context.ProjectRequirements.FirstOrDefaultAsync(r => r.RequirementId == requirementId);

            if (req == null)
            {
                // _logger.LogWarning("Project requirement with ID: {RequirementId} not found.", requirementId);
                return null;
            }

            // _logger.LogDebug("Successfully found project requirement with ID: {RequirementId}", requirementId);
            return req;
        }

        public async Task<IEnumerable<ProjectRequirement>> GetProjectRequirementsByUserId(int userId)
        {
            // _logger.LogInformation("Retrieving project requirements for User ID: {UserId}", userId);
            var requirements = await _context.ProjectRequirements.Where(r => r.UserId == userId).ToListAsync();
            // _logger.LogInformation("Found {Count} requirements for User ID: {UserId}", requirements.Count, userId);
            return requirements;
        }

        public async Task AddProjectRequirement(ProjectRequirement projectRequirement)
        {
            // _logger.LogInformation("Attempting to add a new project requirement: {RequirementTitle}", projectRequirement.RequirementTitle);

            _context.ProjectRequirements.Add(projectRequirement);
            await _context.SaveChangesAsync();

            // _logger.LogInformation("Successfully added project requirement with ID: {RequirementId}", projectRequirement.RequirementId);
        }

        public async Task<bool> UpdateProjectRequirement(int requirementId, ProjectRequirement projectRequirement)
        {
            // _logger.LogInformation("Attempting to update project requirement with ID: {RequirementId}", requirementId);

            var existingRequirement = await _context.ProjectRequirements.FindAsync(requirementId);

            if (existingRequirement == null)
            {
                // _logger.LogWarning("Update failed. Project requirement with ID: {RequirementId} not found.", requirementId);
                return false;
            }

            existingRequirement.RequirementTitle = projectRequirement.RequirementTitle;
            existingRequirement.RequirementDescription = projectRequirement.RequirementDescription;
            existingRequirement.Status = projectRequirement.Status;
            existingRequirement.UserId = projectRequirement.UserId;

            await _context.SaveChangesAsync();
            // _logger.LogInformation("Successfully updated project requirement with ID: {RequirementId}", requirementId);

            return true;
        }

        public async Task<bool> DeleteProjectRequirement(int requirementId)
        {
            // _logger.LogInformation("Attempting to delete project requirement with ID: {RequirementId}", requirementId);

            var requirement = await _context.ProjectRequirements.FirstOrDefaultAsync(r => r.RequirementId == requirementId);

            if (requirement == null)
            {
                // _logger.LogWarning("Delete failed. Project requirement with ID: {RequirementId} not found.", requirementId);
                return false;
            }

            _context.ProjectRequirements.Remove(requirement);
            await _context.SaveChangesAsync();

            // _logger.LogInformation("Successfully deleted project requirement with ID: {RequirementId}", requirementId);
            return true;
        }



        public async Task<bool> UpdateStatus(int requirementId, string status)
        {
            var existingRequirement = await _context.ProjectRequirements.FindAsync(requirementId);
            Console.WriteLine(existingRequirement);

            if (existingRequirement == null)
            {
                return false;
            }

            existingRequirement.Status = status;

            await _context.SaveChangesAsync();

            return true;
        }
    }

}
