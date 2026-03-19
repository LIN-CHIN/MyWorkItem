using MyWorkItemAPI.Models;

namespace MyWorkItemAPI.Services;

public interface IWorkItemService
{
    IEnumerable<WorkItem> GetAll();
    WorkItem? GetById(int id);
    WorkItem Create(CreateWorkItemDto dto);
    WorkItem? Update(int id, UpdateWorkItemDto dto);
    bool Delete(int id);
}
