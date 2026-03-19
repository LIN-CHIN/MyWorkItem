using MyWorkItemAPI.Core.WorkItems.Enums;
using System.ComponentModel.DataAnnotations;

namespace MyWorkItemAPI.Core.WorkItems.DTOs;

public class UpdateWorkItemDto
{
    [Required(ErrorMessage = "Title 為必填欄位")]
    [MinLength(1, ErrorMessage = "Title 不可為空白")]
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public WorkItemStatus Status { get; set; }
    public Priority Priority { get; set; }
}
