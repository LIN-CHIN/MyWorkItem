using MyWorkItemAPI.Models;
using MyWorkItemAPI.Repositories;

namespace MyWorkItemAPI.Services;

public class WorkItemService : IWorkItemService
{
    private readonly IWorkItemRepository _repository;

    public WorkItemService(IWorkItemRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<WorkItem> GetAll() => _repository.GetAll();

    public WorkItem? GetById(int id) => _repository.GetById(id);

    public WorkItem Create(CreateWorkItemDto dto)
    {
        var workItem = new WorkItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority
        };
        return _repository.Create(workItem);
    }

    public WorkItem? Update(int id, UpdateWorkItemDto dto)
    {
        var updated = new WorkItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority
        };
        return _repository.Update(id, updated);
    }

    public bool Delete(int id) => _repository.Delete(id);
}
