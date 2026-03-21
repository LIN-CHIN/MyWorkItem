namespace MyWorkItemAPI.Common;

public abstract class ApiResponseBase
{
    public ResponseCode Code { get; set; }
    public string Message { get; set; } = string.Empty;
}
