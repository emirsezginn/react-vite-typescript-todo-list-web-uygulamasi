import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Todo } from '../types/todo'

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 15px;
  margin-top: 3px;
  cursor: pointer;
  min-width: 18px;
  min-height: 18px;
`

const ContentWrapper = styled.div`
  flex: 1;
`

const Text = styled.div<{ completed: boolean }>`
  color: ${props => (props.completed ? '#777' : '#333')};
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  margin-bottom: 5px;
  word-break: break-word;
`

const DateInfo = styled.div`
  display: flex;
  gap: 15px;
  font-size: 0.75rem;
  color: #888;
`

const DateItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    font-size: 0.9em;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 10px;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  color: #555;

  &:hover {
    background: #f0f0f0;
    color: #222;
  }
`

const EditButton = styled(Button)`
  color: #2c7be5;

  &:hover {
    background: #e6f0ff;
    color: #2c7be5;
  }
`

const DeleteButton = styled(Button)`
  color: #e63757;

  &:hover {
    background: #ffe6ea;
    color: #e63757;
  }
`

const EditInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 8px;
`

// TodoItem bileşeninin alacağı prop
interface TodoItemProps {
  todo: Todo  
  onToggle: (id: string) => void  // Tamamlanma durumu için değiştirme fonksiyonu
  onEdit: (id: string, text: string) => void  // Metni güncelleme fonksiyonu
  onDelete: (id: string) => void  // Silme fonksiyonu
}

// TodoItem component fonksiyonu
  const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
     // Düzenleme modunu kontrol eden state
  const [isEditing, setIsEditing] = useState(false)
  // Düzenleme sırasında kullanılacak metin
  const [editText, setEditText] = useState(todo.text)
   // Input elemanına erişim için 
  const inputRef = useRef<HTMLInputElement>(null)

  // Eğer düzenleme moduna geçilmişse input alanına focus verilmesi için efekt
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

   // Düzenleme moduna geçişi tetikleyen fonksiyon
  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  // Değişiklikleri kaydetmek için kullanılan fonksiyon
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') setIsEditing(false)
  }

  const formatDate = (date?: Date) => {
    if (!date) return ''
    return new Date(date).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Item>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <ContentWrapper>
        {isEditing ? (
          <>
            <EditInput
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
            />
            <DateInfo>
              <DateItem title="Oluşturulma Tarihi">
                <span>📅</span>
                {formatDate(todo.createdAt)}
              </DateItem>
              {todo.completedAt && (
                <DateItem title="Tamamlanma Tarihi">
                  <span>✅</span>
                  {formatDate(todo.completedAt)}
                </DateItem>
              )}
            </DateInfo>
          </>
        ) : (
          <>
            <Text completed={todo.completed}>{todo.text}</Text>
            <DateInfo>
              <DateItem title="Oluşturulma Tarihi">
                <span>📅</span>
                {formatDate(todo.createdAt)}
              </DateItem>
              {todo.completed && todo.completedAt && (
                <DateItem title="Tamamlanma Tarihi">
                  <span>✅</span>
                  {formatDate(todo.completedAt)}
                </DateItem>
              )}
            </DateInfo>
          </>
        )}
      </ContentWrapper>

      {!isEditing && (
        <ButtonGroup>
          <EditButton onClick={handleEdit}>Düzenle</EditButton>
          <DeleteButton onClick={() => onDelete(todo.id)}>Sil</DeleteButton>
        </ButtonGroup>
      )}
    </Item>
  )
}

export default TodoItem