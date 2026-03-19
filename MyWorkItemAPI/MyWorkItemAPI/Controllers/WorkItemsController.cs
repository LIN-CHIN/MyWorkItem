using Microsoft.AspNetCore.Mvc;
using MyWorkItemAPI.Models;
using MyWorkItemAPI.Services;

namespace MyWorkItemAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkItemsController : ControllerBase
{
    private readonly IWorkItemService _service;

    public WorkItemsController(IWorkItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<IEnumerable<WorkItem>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<WorkItem> GetById(int id)
    {
        var item = _service.GetById(id);
        if (item is null) return NotFound(new { message = $"WorkItem {id} 不存在" });
        return Ok(item);
    }

    [HttpPost]
    public ActionResult<WorkItem> Create([FromBody] CreateWorkItemDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest(new { message = "Title 為必填欄位" });

        var created = _service.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public ActionResult<WorkItem> Update(int id, [FromBody] UpdateWorkItemDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            return BadRequest(new { message = "Title 為必填欄位" });

        var updated = _service.Update(id, dto);
        if (updated is null) return NotFound(new { message = $"WorkItem {id} 不存在" });
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var success = _service.Delete(id);
        if (!success) return NotFound(new { message = $"WorkItem {id} 不存在" });
        return NoContent();
    }
}
