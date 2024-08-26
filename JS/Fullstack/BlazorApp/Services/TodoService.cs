namespace Nice;

public class TodoService
{
    private List<TodoItem> _todos = new List<TodoItem>();
    public List<TodoItem> GetTodos()
    {
        return _todos;
    }

    public void AddTodoItem(TodoItem todoItem)
    {
        _todos.Add(todoItem);
    }
    
}

