using MyWorkItemAPI.Core.WorkItems.DTOs;
using MyWorkItemAPI.Core.WorkItems.Repositories;

namespace MyWorkItemAPI.Core.WorkItems.Services;

public class WorkItemService : IWorkItemService
{
    private readonly IWorkItemRepository _repository;

    public WorkItemService(IWorkItemRepository repository)
    {
        _repository = repository;
    }

    ///<inheritdoc/>
    public IEnumerable<WorkItem> GetAll()
    {
        return _repository.GetAll();
    }

    ///<inheritdoc/>
    public WorkItem? GetById(int id) 
    {
        return _repository.GetById(id);
    }

    ///<inheritdoc/>
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

    ///<inheritdoc/>
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

    ///<inheritdoc/>
    public bool Delete(int id) 
    {
        return _repository.Delete(id);
    }
}
