using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using dotnetapp.Data;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;


namespace dotnetapp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;

        
        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            
            var projects = await _context.Projects.ToListAsync();
            
            return projects;
        }

        public async Task<Project> GetProjectById(int projectId)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(i => i.ProjectId == projectId);

            
            return project;
        }

        public async Task<bool> AddProject(Project project)
        {
           
            bool existingProject = await _context.Projects.AnyAsync(i => i.ProjectTitle == project.ProjectTitle);

            if (existingProject)
            {
             
                throw new ProjectException("Project with the same title already exists");
            }

            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
           

            return true;

        }

        public async Task<bool> UpdateProject(int projectId, Project project)
        {
            var existingProject = await _context.Projects.FirstOrDefaultAsync(i => i.ProjectId == projectId);

            if (existingProject == null)
            {
           
                return false;
            }
            existingProject.ProjectTitle = project.ProjectTitle;
            existingProject.ProjectDescription = project.ProjectDescription;
            existingProject.StartDate = project.StartDate;
            existingProject.EndDate = project.EndDate;
            existingProject.FrontEndTechStack = project.FrontEndTechStack;
            existingProject.BackendTechStack = project.BackendTechStack;
            existingProject.Database = project.Database;
            existingProject.Status = project.Status;

            await _context.SaveChangesAsync();
           

            return true;
        }


        public async Task<bool> DeleteProject(int projectId)
        {
            
            var existingProject = await _context.Projects.FirstOrDefaultAsync(i => i.ProjectId == projectId);

            if (existingProject == null)
            {
                return false;
            }

            _context.Projects.Remove(existingProject);
            await _context.SaveChangesAsync();
          

            return true;
        }

    }
}


// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.EntityFrameworkCore;
// using dotnetapp.Data;
// using dotnetapp.Models;

// namespace dotnetapp.Services
// {
//     public class ProjectService : IProjectService
//     {
//         private readonly ApplicationDbContext _context;

//         public ProjectService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<IEnumerable<Project>> GetAllProjects()
//         {
//             var projects = await _context.Projects.ToListAsync();
//             return projects;
//         }

//         public async Task<Project> GetProjectById(int projectId)
//         {
//             var project = await _context.Projects.FirstOrDefaultAsync(i => i.ProjectId == projectId);

//             if (project == null)
//             {
//                 throw new KeyNotFoundException($"Project with ID {projectId} not found.");
//             }

//             return project;
//         }

//         public async Task<bool> AddProject(Project project)
//         {
//             if (string.IsNullOrWhiteSpace(project.ProjectTitle))
//             {
//                 throw new ArgumentException("Project title cannot be empty.", nameof(project.ProjectTitle));
//             }

//             bool existingProject = await _context.Projects.AnyAsync(i => i.ProjectTitle == project.ProjectTitle);

//             if (existingProject)
//             {
//                 throw new KeyNotFoundException("Project with the same title already exists.");
//             }

//             await _context.Projects.AddAsync(project);
//             await _context.SaveChangesAsync();
//             return true;
//         }

//         public async Task<bool> UpdateProject(int projectId, Project project)
//         {
//             var existingProject = await _context.Projects.FirstOrDefaultAsync(i => i.ProjectId == projectId);

//             if (existingProject == null)
//             {
//                 // Throws KeyNotFoundException (maps to 404 Not Found)
//                 throw new KeyNotFoundException($"Project with ID {projectId} not found for update.");
//             }

//             if (string.IsNullOrWhiteSpace(project.ProjectTitle))
//             {
//                  // Throws ArgumentException (maps to 400 Bad Request)
//                 throw new ArgumentException("Project title cannot be empty during update.", nameof(project.ProjectTitle));
//             }
            
//             // Check for duplicate title (using KeyNotFoundException as closest match in middleware)
//             var duplicateTitle = await _context.Projects.AnyAsync(i => i.ProjectTitle == project.ProjectTitle && i.ProjectId != projectId);
//             if (duplicateTitle)
//             {
//                 throw new KeyNotFoundException($"Cannot update title; another project named '{project.ProjectTitle}' already exists.");
//             }

//             existingProject.ProjectTitle = project.ProjectTitle;
//             existingProject.ProjectDescription = project.ProjectDescription;
//             existingProject.StartDate = project.StartDate;
//             existingProject.EndDate = project.EndDate;
//             existingProject.FrontEndTechStack = project.FrontEndTechStack;
//             existingProject.BackendTechStack = project.BackendTechStack;
//             existingProject.Database = project.Database;
//             existingProject.Status = project.Status;

//             await _context.SaveChangesAsync();
//             return true;
//         }

//         public async Task<bool> DeleteProject(int projectId)
//         {
//             var existingProject = await _context.Projects.FirstOrDefaultAsync(i => i.ProjectId == projectId);

//             if (existingProject == null)
//             {
//                 // Throws KeyNotFoundException (maps to 404 Not Found)
//                 throw new KeyNotFoundException($"Project with ID {projectId} not found for deletion.");
//             }

//             _context.Projects.Remove(existingProject);
//             await _context.SaveChangesAsync();
//             return true;
//         }
//     }
// }
