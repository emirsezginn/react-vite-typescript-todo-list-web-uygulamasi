import styled from 'styled-components'
import { Todo } from '../types/todo'
import TodoItem from './TodoItem'

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const EmptyMessage = styled.p`
  text-align: center;
  color: #888;
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
`

//TodoList componentine gelen propsları tanımlar
interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

// TodoList component fonksiyonu
const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onEdit, onDelete }) => {

    // Eğer todo listesi boşsa
  if (todos.length === 0) {
    return <EmptyMessage>Yeni bir todo ekleyin</EmptyMessage>
  }


    // Todo listesi varsa, her bir todo itemını listele
  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </List>
  )
}

export default TodoList