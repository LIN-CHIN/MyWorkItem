using MyWorkItemAPI.Core.WorkItems.Enums;

namespace MyWorkItemAPI.Core.WorkItems.Repositories;

public class WorkItemRepository : IWorkItemRepository
{
    private readonly List<WorkItem> _items = new();
    private int _nextId = 1;

    public WorkItemRepository()
    {
        _items.AddRange(new[]
        {
            new WorkItem { Id = _nextId++, Title = "設計資料庫 Schema", Description = "規劃 WorkItem 相關資料表結構", Status = WorkItemStatus.Done, Priority = Priority.High, CreatedAt = DateTime.UtcNow.AddDays(-5) },
            new WorkItem { Id = _nextId++, Title = "實作後端 API", Description = "建立 RESTful API 端點", Status = WorkItemStatus.InProgress, Priority = Priority.High, CreatedAt = DateTime.UtcNow.AddDays(-3) },
            new WorkItem { Id = _nextId++, Title = "建立前端 UI", Description = "使用 React + Tailwind 建立介面", Status = WorkItemStatus.Todo, Priority = Priority.Medium, CreatedAt = DateTime.UtcNow.AddDays(-1) },
            new WorkItem { Id = _nextId++, Title = "撰寫單元測試", Description = "為 Service 層撰寫測試", Status = WorkItemStatus.Todo, Priority = Priority.Low, CreatedAt = DateTime.UtcNow },
        });
    }

    ///<inheritdoc/>
    public IEnumerable<WorkItem> GetAll()
    {
        return _items.OrderByDescending(x => x.CreatedAt);
    }
        

    ///<inheritdoc/>
    public WorkItem? GetById(int id)
    {
        return _items.FirstOrDefault(x => x.Id == id);
    }

    ///<inheritdoc/>
    public WorkItem Create(WorkItem workItem)
    {
        workItem.Id = _nextId++;
        workItem.CreatedAt = DateTime.UtcNow;
        _items.Add(workItem);
        return workItem;
    }

    ///<inheritdoc/>
    public WorkItem? Update(int id, WorkItem updated)
    {
        var existing = _items.FirstOrDefault(x => x.Id == id);
        if (existing is null) return null;

        existing.Title = updated.Title;
        existing.Description = updated.Description;
        existing.Status = updated.Status;
        existing.Priority = updated.Priority;
        existing.UpdatedAt = DateTime.UtcNow;
        return existing;
    }

    ///<inheritdoc/>
    public bool Delete(int id)
    {
        var item = _items.FirstOrDefault(x => x.Id == id);
        if (item is null) return false;
        _items.Remove(item);
        return true;
    }
}
