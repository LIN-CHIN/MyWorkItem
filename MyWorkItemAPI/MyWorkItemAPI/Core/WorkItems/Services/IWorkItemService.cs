using MyWorkItemAPI.Core.WorkItems.DTOs;

namespace MyWorkItemAPI.Core.WorkItems.Services;

public interface IWorkItemService
{
    /// <summary>
    /// 取得所有 WorkItem
    /// </summary>
    /// <returns></returns>
    IEnumerable<WorkItem> GetAll();

    /// <summary>
    /// 根據id取得 WorkItem
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    WorkItem? GetById(int id);

    /// <summary>
    /// 新增 WorkItem
    /// </summary>
    /// <param name="workItem"></param>
    /// <returns></returns>
    WorkItem Create(CreateWorkItemDto dto);

    /// <summary>
    /// 修改 WorkItem
    /// </summary>
    /// <param name="id">要修改的id</param>
    /// <param name="workItem"></param>
    /// <returns></returns>
    WorkItem? Update(int id, UpdateWorkItemDto dto);

    /// <summary>
    /// 刪除 WorkItem
    /// </summary>
    /// <param name="id">要刪除的id</param>
    /// <returns></returns>
    bool Delete(int id);
}
