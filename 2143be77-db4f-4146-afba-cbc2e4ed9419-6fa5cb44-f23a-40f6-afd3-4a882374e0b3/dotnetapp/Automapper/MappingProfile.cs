using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using dotnetapp.Dtos;
using dotnetapp.Models;

namespace dotnetapp.Automapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProjectRequirementDto, ProjectRequirement>();
            CreateMap<ProjectDto, Project>();
            CreateMap<FeedbackDto, Feedback>();
        }
    }
}