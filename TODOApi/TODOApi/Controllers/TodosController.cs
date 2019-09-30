using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODOApi.Models;
using TODOSApi.Helpers;
using TODOSApi.Services;

namespace TODOApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private ITaskRepository _taskRepository;
        private IUrlHelper _urlHelper;

        public TodosController(ITaskRepository taskRepository, IUrlHelper urlHelper)
        {
            _taskRepository = taskRepository;
            _urlHelper = urlHelper;
        }

        // GET api/Todo
        [HttpGet(Name = "GetTodoItems")]
        public IActionResult GetTodoItems([FromQuery] TodosResourceParameters todosResourceParameters)
        {
            var todosFromRepo = _taskRepository.GetTodoItems(todosResourceParameters);

            // genera el link de pagina previa en el paginado
            var previousPageLink = todosFromRepo.HasPrevious ?
                CreateTodosResourceUri(todosResourceParameters,
                ResourceUriType.PreviousPage) : null;

            // genera link de pagina siguiente en el paginado
            var nextPageLink = todosFromRepo.HasNext ?
                CreateTodosResourceUri(todosResourceParameters,
                ResourceUriType.NextPage) : null;

            // se generan los datos opcionales a mandar en Header
            var paginationMetadata = new
            {
                totalCount = todosFromRepo.TotalCount,
                pageSize = todosFromRepo.PageSize,
                currentPage = todosFromRepo.CurrentPage,
                totalPages = todosFromRepo.TotalPages,
                previousPageLink = previousPageLink,
                nextPageLink = nextPageLink
            };

            Response.Headers.Add("X-Pagination",
                Newtonsoft.Json.JsonConvert.SerializeObject(paginationMetadata));
            
            return Ok(todosFromRepo);
            
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]TodoItem value)
        {
            if (value == null)
            {
                return BadRequest();
            }
            
            _taskRepository.AddTodoItem(value);

            if (!_taskRepository.Save())
            {
                throw new Exception("Fallo en la creacion del nuevo TODO.");
                // return StatusCode(500, "A problem happened with handling your request.");
            }

            // devuelve el item creado
            return CreatedAtRoute("GetTodoItem",
                new { id = value.ID },
                value);
        }

        // GET api/Todo/1
        [HttpGet("{id}", Name = "GetTodoItem")]
        public IActionResult GetTodoItem(long id)
        {
            var todoFromRepo = _taskRepository.GetTodoItem(id);

            if (todoFromRepo == null)
            {
                return NotFound();
            }
            
            return Ok(todoFromRepo);
        }
        
        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult UpdateTodoItem(long id, TodoItem value)
        {
            if (id != value.ID)
            {
                return BadRequest();
            }
          
            _taskRepository.UpdateTodoItem(value);

            if (!_taskRepository.Save())
            {
                throw new Exception("Fallo en la creacion del nuevo TODO.");
                // return StatusCode(500, "A problem happened with handling your request.");
            }

            // devuelve el item creado
            return CreatedAtRoute("GetTodoItem",
                new { id = value.ID },
                value);
            
            //return NoContent();
        }

        /// <summary>
        /// metodo de creacion de urls para paginado prev y next
        /// </summary>
        /// <param name="todosResourceParameters"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        private string CreateTodosResourceUri(
           TodosResourceParameters todosResourceParameters,
           ResourceUriType type)
        {
            switch (type)
            {
                case ResourceUriType.PreviousPage:
                    return _urlHelper.Link("GetTodoItems",
                      new
                      {
                          id = todosResourceParameters.Id,
                          estado = todosResourceParameters.Estado,
                          descripcion = todosResourceParameters.Descripcion,
                          pageNumber = todosResourceParameters.PageNumber - 1,
                          pageSize = todosResourceParameters.PageSize
                      });
                case ResourceUriType.NextPage:
                    return _urlHelper.Link("GetTodoItems",
                      new
                      {
                          id = todosResourceParameters.Id,
                          estado = todosResourceParameters.Estado,
                          descripcion = todosResourceParameters.Descripcion,
                          pageNumber = todosResourceParameters.PageNumber + 1,
                          pageSize = todosResourceParameters.PageSize
                      });

                default:
                    return _urlHelper.Link("GetTodoItems",
                    new
                    {
                        id = todosResourceParameters.Id,
                        estado = todosResourceParameters.Estado,
                        descripcion = todosResourceParameters.Descripcion,
                        pageNumber = todosResourceParameters.PageNumber,
                        pageSize = todosResourceParameters.PageSize
                    });
            }
        }
    }
}