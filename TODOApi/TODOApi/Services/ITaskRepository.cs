using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TODOApi.Models;
using TODOSApi.Helpers;

namespace TODOSApi.Services
{
    public interface ITaskRepository
    {
        PagedList<TodoItem> GetTodoItems(TodosResourceParameters todosResourceParameters);
        TodoItem GetTodoItem(long id);
        void AddTodoItem(TodoItem todoItem);
        void UpdateTodoItem(TodoItem todoItem);
        bool Save();
    }
}
