namespace MyWorkItemAPI.Common;

public enum ResponseCode
{
    Success          = 0,
    SystemError      = 1,
    NotFoundId       = 2,
    ValidationError  = 3,
    Unauthorized     = 4,
    Forbidden        = 5,
    DuplicateEntry   = 6,
    InvalidOperation = 7,
}
