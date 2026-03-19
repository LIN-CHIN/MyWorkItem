using MyWorkItemAPI.Models;

namespace MyWorkItemAPI.Repositories;

public interface IWorkItemRepository
{
    IEnumerable<WorkItem> GetAll();
    WorkItem? GetById(int id);
    WorkItem Create(WorkItem workItem);
    WorkItem? Update(int id, WorkItem workItem);
    bool Delete(int id);
}
