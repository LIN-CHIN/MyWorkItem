namespace MyWorkItemAPI.Common;

public class ApiException : Exception
{
    public ResponseCode Code { get; }

    public ApiException(ResponseCode code, string message) : base(message)
    {
        Code = code;
    }
}
