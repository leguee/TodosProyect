using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TODOApi.Models;
using TODOSApi.Helpers;

namespace TODOSApi.Services
{
    /// <summary>
    /// implemetacion de los metodos de la API
    /// </summary>
    public class TaskRepository : ITaskRepository
    {
        private TodoContext _context;

        public TaskRepository(TodoContext context)
        {
            _context = context;
        }

        /// <summary>
        /// obtiene el listado de Todos segun los filtros y la paginacion
        /// </summary>
        /// <param name="todosResourceParameters"></param>
        /// <returns></returns>
        public PagedList<TodoItem> GetTodoItems(TodosResourceParameters todosResourceParameters)
        {
            var collectionBeforePaging =
             _context.TodoItems
             .OrderBy(a => a.ID)
             .AsQueryable();

            if (!string.IsNullOrEmpty(todosResourceParameters.Id.ToString()))
            {
                collectionBeforePaging = collectionBeforePaging
                    .Where(a => a.ID == todosResourceParameters.Id);
            }

            if (!string.IsNullOrEmpty(todosResourceParameters.Descripcion))
            {
                // trim & ignore casing
                var descriptionForWhereClause = todosResourceParameters.Descripcion
                    .Trim().ToLowerInvariant();
                collectionBeforePaging = collectionBeforePaging
                    .Where(a => a.Descripcion.ToLowerInvariant() == descriptionForWhereClause);
            }

            if (!string.IsNullOrEmpty(todosResourceParameters.Estado))
            {
                // trim & ignore casing
                var estadoForWhereClause = todosResourceParameters.Estado
                    .Trim().ToLowerInvariant();
                collectionBeforePaging = collectionBeforePaging
                    .Where(a => a.Estado.ToLowerInvariant() == estadoForWhereClause);
            }

            return PagedList<TodoItem>.Create(collectionBeforePaging,
                todosResourceParameters.PageNumber,
                todosResourceParameters.PageSize);
        }

        /// <summary>
        /// metodo que agrega un nuevo todo a la coleccion
        /// </summary>
        /// <param name="todoItem"></param>
        public void AddTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
        }

        /// <summary>
        /// obtiene el todo dado el id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public TodoItem GetTodoItem(long id)
        {
            return _context.TodoItems.FirstOrDefault(a => a.ID == id);
        }
        
        /// <summary>
        /// actualiza el item dado
        /// </summary>
        /// <param name="todoItem"></param>
        public void UpdateTodoItem(TodoItem todoItem)
        {
            _context.Entry(todoItem).State = EntityState.Modified;
        }

        /// <summary>
        /// consulta si se registró la transaccion
        /// </summary>
        /// <returns></returns>
        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
