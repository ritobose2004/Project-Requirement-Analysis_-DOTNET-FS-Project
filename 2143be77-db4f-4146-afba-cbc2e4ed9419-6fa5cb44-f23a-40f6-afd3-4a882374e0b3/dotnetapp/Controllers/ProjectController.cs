using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using dotnetapp.Dtos;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _service;
        private readonly IMapper _mapper;

        private readonly ILogger<ProjectController> _logger;


        public ProjectController(IProjectService service, IMapper mapper, ILogger<ProjectController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }


        [HttpGet]
        [Authorize(Roles = "ProjectManager , RequirementAnalyst")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            _logger.LogInformation("API Request received for processing data.");
            try
            {
                var projects = await _service.GetAllProjects();
                return Ok(projects);
            }
            catch (ProjectException ex)
            {
                _logger.LogError("Error retrieving all projects.", ex);
                return StatusCode(500, ex.Message);
            }


        }

        [HttpGet("{projectId}")]
        [Authorize(Roles = "ProjectManager")]

        public async Task<ActionResult<Project>> GetProjectById(int projectId)
        {
            _logger.LogInformation($"Attempting to retrieve project with ID: {projectId}");
            try
            {
                var ex = await _service.GetProjectById(projectId);

                return Ok(ex);
            }
            catch (ProjectException ex)
            {
                _logger.LogError($"Error retrieving project ID {projectId}", ex);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "ProjectManager")]
        public async Task<ActionResult> AddProject([FromBody] ProjectDto projectDto)
        {
            _logger.LogInformation($"Attempting to add a new project with title: {projectDto.ProjectTitle}");
            try
            {
                // Map DTO to Entity Model
                var project = _mapper.Map<Project>(projectDto);

                await _service.AddProject(project);
                _logger.LogInformation($"Successfully added new project with ID: {project.ProjectId}");
                return Ok(project);
            }
            catch (ProjectException ex)
            {
                _logger.LogError($"Failed to add project: {projectDto.ProjectTitle}", ex);
                return StatusCode(409, ex.Message);
            }


        }

        [HttpPut("{projectId}")]
        [Authorize(Roles = "ProjectManager")]
        public async Task<ActionResult> UpdateProject(int projectId, [FromBody] ProjectDto projectDto)
        {
            _logger.LogInformation($"Attempting to update project with ID: {projectId}");
            try
            {

                if (projectDto == null)
                {
                    return BadRequest("Project data is required");
                }

                // Map DTO to Entity Model
                var project = _mapper.Map<Project>(projectDto);

                // Ensure the ID from the URL is applied to the model
                project.ProjectId = projectId;

                var updated = await _service.UpdateProject(projectId, project);
                if (updated)
                {
                    return Ok(new {message="Project updated succesfully"});
                }
                else{
                    return NotFound(new {message="Cannot find any loan"});
                }



            }
            catch (ProjectException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{projectId}")]
        [Authorize(Roles = "ProjectManager")]
        public async Task<ActionResult> DeleteProject(int projectId)
        {
            _logger.LogInformation($"Attempting to retrieve project with ID: {projectId}");
            try
            {
                if (projectId == null)
                {
                    return NotFound("Project not found");
                }

                await _service.DeleteProject(projectId);
                return Ok("Project deleted successfully");


            }
            catch (ProjectException ex)
            {
                _logger.LogError($"Failed to delete project ID {projectId}.", ex);
                return StatusCode(500, ex.Message);
            }

        }


    }
}

// using System.Collections.Generic;
// using System.Threading.Tasks;
// using dotnetapp.Models;
// using dotnetapp.Services;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using AutoMapper;
// using dotnetapp.Dtos;
// using dotnetapp.Exceptions; // Keep this using statement

// namespace dotnetapp.Controllers
// {
//     [ApiController]
//     [Route("api/projects")]
//     public class ProjectController : ControllerBase
//     {
//         private readonly IProjectService _service;
//         private readonly IMapper _mapper;
//         private readonly ILogger<ProjectController> _logger;

//         public ProjectController(IProjectService service, IMapper mapper, ILogger<ProjectController> logger)
//         {
//             _service = service;
//             _mapper = mapper;
//             _logger = logger;
//         }

//         [HttpGet]
//         [Authorize(Roles = "ProjectManager , RequirementAnalyst")]
//         public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
//         {
//             _logger.LogInformation("API Request received for processing data.");
//             var projects = await _service.GetAllProjects();
//             return Ok(projects);
//         }

//         [HttpGet("{projectId}")]
//         [Authorize(Roles = "ProjectManager")]
//         public async Task<ActionResult<Project>> GetProjectById(int projectId)
//         {
//             _logger.LogInformation($"Attempting to retrieve project with ID: {projectId}");
//             var project = await _service.GetProjectById(projectId);
//             return Ok(project);
//         }

//         [HttpPost]
//         [Authorize(Roles = "ProjectManager")]
//         public async Task<ActionResult> AddProject([FromBody] ProjectDto projectDto)
//         {
//             _logger.LogInformation($"Attempting to add a new project with title: {projectDto.ProjectTitle}");
           
//             var project = _mapper.Map<Project>(projectDto);
//             await _service.AddProject(project);
          
//             return CreatedAtAction(nameof(GetProjectById), new { projectId = project.ProjectId }, project);
//         }

      



//         [HttpPut("{projectId}")]
//         [Authorize(Roles = "ProjectManager")]
//         public async Task<ActionResult> UpdateProject(int projectId, [FromBody] ProjectDto projectDto)
//         {
//             _logger.LogInformation($"Attempting to update project with ID: {projectId}");
            
//             if (projectDto == null)
//             {
//                 return BadRequest("Project data is required");
//             }
//             var project = _mapper.Map<Project>(projectDto);
//             project.ProjectId = projectId; // Ensure ID matches route

//             await _service.UpdateProject(projectId, project);
            
//             return Ok(new { message = "Project updated successfully" });
//         }

//         [HttpDelete("{projectId}")]
//         [Authorize(Roles = "ProjectManager")]
//         public async Task<ActionResult> DeleteProject(int projectId)
//         {
//             _logger.LogInformation($"Attempting to delete project with ID: {projectId}");
            
//             await _service.DeleteProject(projectId);
//             return Ok("Project deleted successfully");
//         }
//     }
// }



