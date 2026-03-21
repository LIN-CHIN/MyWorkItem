namespace MyWorkItemAPI.Common;

public class ApiResponseBase
{
    public ResponseCode Code { get; set; }
    public string Message { get; set; } = string.Empty;
}
