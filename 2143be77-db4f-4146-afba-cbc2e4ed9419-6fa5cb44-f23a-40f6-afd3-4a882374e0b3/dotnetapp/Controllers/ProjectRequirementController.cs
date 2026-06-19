using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using dotnetapp.Dtos;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/projectrequirements")]
    public class ProjectRequirementController : ControllerBase
    {
        private readonly IProjectRequirementService _service;
        private readonly IMapper _mapper;
        private readonly ILogger<ProjectRequirementController> _logger;

        public ProjectRequirementController(
            IProjectRequirementService service,
            IMapper mapper,
            ILogger<ProjectRequirementController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "ProjectManager")]
        public async Task<ActionResult<IEnumerable<ProjectRequirement>>> GetAllProjectRequirements()
        {
            _logger.LogInformation("API: Fetching all project requirements."); // 4. Added Information logs
            try
            {
                var requirements = await _service.GetAllProjectRequirements();
                return Ok(requirements);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "API: Error occurred while fetching all requirements."); // 5. Added Error logs with exception
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{requirementId}")]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult<ProjectRequirement>> GetProjectRequirementById(int requirementId)
        {
            try
            {
                var requirement = await _service.GetProjectRequirementById(requirementId);

                if (requirement == null)
                {
                    _logger.LogWarning("API: Requirement with ID {Id} not found.", requirementId); // 6. Added Warning logs
                    return NotFound("Project requirement not found.");
                }
                return Ok(requirement);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "API: Error fetching requirement {Id}.", requirementId);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult<IEnumerable<ProjectRequirement>>> GetProjectRequirementByUserId(int userId)
        {
            _logger.LogInformation("API: Retrieving project requirements for User ID {UserId}.", userId);

            try
            {
                var requirements = await _service.GetProjectRequirementsByUserId(userId);

                if (requirements == null || !requirements.Any())
                {
                    _logger.LogWarning("API: No project requirements found for User ID {UserId}.", userId);
                    return NotFound("No project requirements are found for the user.");
                }

                _logger.LogInformation("API: Successfully retrieved {Count} requirements for User ID {UserId}.", requirements.Count(), userId);
                return Ok(requirements);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "API: Error occurred while retrieving requirements for User ID {UserId}.", userId);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult> AddProjectRequirement([FromBody] ProjectRequirementDto projectRequirementDto)
        {
            _logger.LogInformation("API: Attempting to add requirement: {Title}", projectRequirementDto.RequirementTitle);
            try
            {
                var projectRequirement = _mapper.Map<ProjectRequirement>(projectRequirementDto);
                await _service.AddProjectRequirement(projectRequirement);

                _logger.LogInformation("API: Requirement added successfully.");
                return Ok("Project Requirement added successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "API: Failed to add requirement.");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{requirementId}")]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult> UpdateProjectRequirement(int requirementId, [FromBody] ProjectRequirementDto projectRequirementDto)
        {
            _logger.LogInformation("API: Updating requirement ID {Id}.", requirementId);
            try
            {
                var projectRequirement = _mapper.Map<ProjectRequirement>(projectRequirementDto);
                projectRequirement.RequirementId = requirementId;

                var updated = await _service.UpdateProjectRequirement(requirementId, projectRequirement);

                if (!updated)
                {
                    _logger.LogWarning("API: Update failed. Requirement {Id} not found.", requirementId);
                    return NotFound("Project requirement not found.");
                }

                return Ok("Project requirement updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "API: Error updating requirement {Id}.", requirementId);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{requirementId}")]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult> DeleteProjectRequirement(int requirementId)
        {
            _logger.LogInformation("API: Deleting requirement ID {Id}.", requirementId);
            try
            {
                var deleted = await _service.DeleteProjectRequirement(requirementId);
                if (!deleted)
                {
                    _logger.LogWarning("API: Delete failed. Requirement {Id} not found.", requirementId);
                    return NotFound("Project requirement not found.");
                }
                return Ok("Project requirement deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "API: Error deleting requirement {Id}.", requirementId);
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPut("{requirementId}/status")]
        [Authorize(Roles = "ProjectManager")]
        public async Task<ActionResult> UpdateStatus(int requirementId, [FromBody] string status)
        {
            var ok = await _service.UpdateStatus(requirementId, status.Trim());

            if (!ok)
                return NotFound("Requirement not found");

            return Ok("Status updated successfully");
        }

    }
}