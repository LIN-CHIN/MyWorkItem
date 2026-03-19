using MyWorkItemAPI.Core.WorkItems.Enums;

namespace MyWorkItemAPI.Core.WorkItems;

/// <summary>
/// 工作項目實體，代表系統中的一筆任務記錄。
/// </summary>
public class WorkItem
{
    /// <summary>
    /// 系統流水號 id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// 工作項目標題
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// 工作項目描述
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// 目前狀態
    /// </summary>
    public WorkItemStatus Status { get; set; } = WorkItemStatus.Todo;

    /// <summary>
    /// 優先度
    /// </summary>
    public Priority Priority { get; set; } = Priority.Medium;

    /// <summary>
    /// 建立時間，以 UTC 記錄
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// 最後更新時間，以 UTC 記錄
    /// </summary>
    public DateTime? UpdatedAt { get; set; }
}
