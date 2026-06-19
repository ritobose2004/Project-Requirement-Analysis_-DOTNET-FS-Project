using dotnetapp.Models;
using System.Text.Json;
using System.Net;
using System.Text.Json;
using dotnetapp.Models;
using System.Text;

namespace dotnetapp.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
            context.Response.ContentType = "application/json";

            var statusCode = exception switch
            {
                KeyNotFoundException _ => HttpStatusCode.NotFound,
                UnauthorizedAccessException _ => HttpStatusCode.Unauthorized,
                ArgumentException _ => HttpStatusCode.BadRequest,
                _ => HttpStatusCode.InternalServerError
            };

            context.Response.StatusCode = (int)statusCode;

            var response = new ErrorResponse
            {
                StatusCode = context.Response.StatusCode,
                Message = exception.Message,
                Details = exception.StackTrace
            };

            WriteToDailyLogFile(env, context, exception, context.Response.StatusCode);

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
        private static void WriteToDailyLogFile(
            IWebHostEnvironment env,
            HttpContext context,
            Exception ex,
            int statusCode)
        {
            try
            {
                var logFolder = Path.Combine(env.ContentRootPath, "CustomErrorLogs");
                Directory.CreateDirectory(logFolder);

                var projectName = env.ApplicationName;
                var datePart = DateTime.Now.ToString("yyyy_MM_dd");
                var fileName = $"{projectName}_{datePart}.log";
                var filePath = Path.Combine(logFolder, fileName);

                var sb = new StringBuilder();
                sb.AppendLine("====================================================");
                sb.AppendLine($"DateTime    : {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
                sb.AppendLine($"StatusCode  : {statusCode}");
                sb.AppendLine($"Method      : {context.Request.Method}");
                sb.AppendLine($"Path        : {context.Request.Path}");
                sb.AppendLine($"QueryString : {context.Request.QueryString}");
                sb.AppendLine($"TraceId     : {context.TraceIdentifier}");
                sb.AppendLine($"Exception   : {ex.GetType().FullName}");
                sb.AppendLine($"Message     : {ex.Message}");
                sb.AppendLine("StackTrace  :");
                sb.AppendLine(ex.StackTrace);
                if (ex.InnerException != null)
                {
                    sb.AppendLine("InnerException:");
                    sb.AppendLine(ex.InnerException.ToString());
                }
                sb.AppendLine("====================================================");
                sb.AppendLine();

                File.AppendAllText(filePath, sb.ToString());
            }
            catch
            {
                // swallow logging errors (never break API flow)
            }
        }
    }
}


