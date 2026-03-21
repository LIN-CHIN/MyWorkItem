using Microsoft.AspNetCore.Http;

namespace MyWorkItemAPI.Common;

public class ApiExceptionMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ApiException ex)
        {
            await WriteResponse(context, ex.Code, ex.Message);
        }
        catch (Exception)
        {
            await WriteResponse(context, ResponseCode.SystemError, "系統發生未預期的錯誤");
        }
    }

    private static async Task WriteResponse(HttpContext context, ResponseCode code, string message)
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        var body = ApiResponse<object>.Fail(code, message);
        await context.Response.WriteAsJsonAsync(body);
    }
}
