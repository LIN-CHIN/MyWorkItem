using Microsoft.AspNetCore.Mvc;
using MyWorkItemAPI.Common;
using MyWorkItemAPI.Core.WorkItems.DTOs;
using MyWorkItemAPI.Core.WorkItems.Services;

namespace MyWorkItemAPI.Core.WorkItems;

/// <summary>
/// 工作項目 API 控制器，提供 CRUD 操作端點。
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class WorkItemsController : ControllerBase
{
    private readonly IWorkItemService _service;

    /// <summary>
    /// 建構子，透過 DI 注入 <see cref="IWorkItemService"/>。
    /// </summary>
    public WorkItemsController(IWorkItemService service)
    {
        _service = service;
    }

    /// <summary>
    /// 取得所有工作項目。
    /// </summary>
    /// <returns>工作項目清單。</returns>
    [HttpGet]
    public ActionResult<ApiResponse<IEnumerable<WorkItem>>> GetAll()
    {
        return Ok(ApiResponse<IEnumerable<WorkItem>>.Success(_service.GetAll()));
    }

    /// <summary>
    /// 依 ID 取得單一工作項目。
    /// </summary>
    /// <param name="id">工作項目 ID。</param>
    /// <returns>對應的工作項目；若不存在則回傳 404。</returns>
    [HttpGet("{id}")]
    public ActionResult<ApiResponse<WorkItem>> GetById(int id)
    {
        var item = _service.GetById(id);
        if (item is null)
            throw new ApiException(ResponseCode.NotFoundId, $"WorkItem {id} 不存在");

        return Ok(ApiResponse<WorkItem>.Success(item));
    }

    /// <summary>
    /// 新增工作項目。
    /// </summary>
    /// <param name="dto">新增所需的欄位資料。</param>
    /// <returns>建立完成的工作項目，HTTP 201 含 Location header。</returns>
    [HttpPost]
    public ActionResult<ApiResponse<WorkItem>> Create([FromBody] CreateWorkItemDto dto)
    {
        var created = _service.Create(dto);
        return Ok(ApiResponse<WorkItem>.Success(created));
    }

    /// <summary>
    /// 更新指定工作項目的全部欄位。
    /// </summary>
    /// <param name="id">要更新的工作項目 ID。</param>
    /// <param name="dto">更新所需的欄位資料。</param>
    /// <returns>更新後的工作項目；若不存在則回傳 404。</returns>
    [HttpPut("{id}")]
    public ActionResult<ApiResponse<WorkItem>> Update(int id, [FromBody] UpdateWorkItemDto dto)
    {
        var updated = _service.Update(id, dto);
        if (updated is null)
            throw new ApiException(ResponseCode.NotFoundId, $"WorkItem {id} 不存在");

        return Ok(ApiResponse<WorkItem>.Success(updated));
    }

    /// <summary>
    /// 刪除指定工作項目。
    /// </summary>
    /// <param name="id">要刪除的工作項目 ID。</param>
    /// <returns>成功時回傳 204 No Content；若不存在則回傳 404。</returns>
    [HttpDelete("{id}")]
    public ActionResult<ApiResponse<bool>> Delete(int id)
    {
        var success = _service.Delete(id);
        if (!success)
            throw new ApiException(ResponseCode.NotFoundId, $"WorkItem {id} 不存在");

        return Ok(ApiResponse<bool>.Success(true));
    }
}
