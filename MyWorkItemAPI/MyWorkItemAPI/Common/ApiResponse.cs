namespace MyWorkItemAPI.Common;

public class ApiResponse<T> : ApiResponseBase
{
    public T? Content { get; set; }

    public static ApiResponse<T> Success(T content) => new()
    {
        Code = ResponseCode.Success,
        Message = "Success",
        Content = content
    };

    public static ApiResponse<T> Fail(ResponseCode code, string message) => new()
    {
        Code = code,
        Message = message
    };
}
