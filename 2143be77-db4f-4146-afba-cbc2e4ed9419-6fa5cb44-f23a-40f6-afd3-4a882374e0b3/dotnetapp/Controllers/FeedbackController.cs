using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using dotnetapp.Dtos;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;
        private readonly IMapper _mapper;
        private readonly ILogger<FeedbackController> _logger; 

        public FeedbackController(IFeedbackService feedbackService, IMapper mapper, ILogger<FeedbackController> logger)
        {
            _feedbackService = feedbackService;
            _mapper = mapper;
            _logger = logger; 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                _logger.LogInformation("Retrieving all feedbacks."); 
                var feedbacks = await _feedbackService.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (ProjectException ex)
            {
                _logger.LogError(ex, "Error occurred while fetching all feedbacks."); 
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                _logger.LogInformation("Fetching feedbacks for User ID: {UserId}", userId); 
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId);
                if (feedbacks == null || !feedbacks.Any())
                {
                    _logger.LogWarning("No feedbacks found for User ID: {UserId}", userId);
                    return NotFound("No feedbacks were found for this requirement analyst.");
                }
                return Ok(feedbacks);
            }
            catch (ProjectException ex)
            {
                _logger.LogError(ex, "Error fetching feedbacks for User ID: {UserId}", userId);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult> AddFeedback([FromBody] FeedbackDto feedbackDto)
        {
            try
            {
                _logger.LogInformation("Adding new feedback for User ID: {UserId}", feedbackDto.UserId);
                var feedback = _mapper.Map<Feedback>(feedbackDto);
                await _feedbackService.AddFeedback(feedback);
                return Ok(feedback);
            }
            catch (ProjectException ex)
            {
                _logger.LogError(ex, "Failed to add feedback for User ID: {UserId}", feedbackDto.UserId);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{feedbackId}")]
        [Authorize(Roles = "RequirementAnalyst")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                _logger.LogInformation("Attempting to delete feedback with ID: {FeedbackId}", feedbackId);
                var result = await _feedbackService.DeleteFeedback(feedbackId);
                if (result == false)
                {
                    _logger.LogWarning("Feedback with ID: {FeedbackId} not found for deletion", feedbackId);
                    return StatusCode(404, new { message = "Cannot find any feedback" });
                }
                _logger.LogInformation("Successfully deleted feedback with ID: {FeedbackId}", feedbackId);
                return StatusCode(200, new { message = "Feedback deleted successfully" });
            }
            catch (ProjectException ex)
            {
                _logger.LogError(ex, "Error deleting feedback with ID: {FeedbackId}", feedbackId);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
