import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { Todo } from '../types/todo'
import { getTodos, saveTodos } from '../utils/storage'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import FilterTodos from '../components/FillterTodos'

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #2c7be5;
  font-size: 2rem;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
`

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c7be5;
  margin-bottom: 5px;
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #6c757d;
`

//Yapılacaklar listesi sayfasının ana işlevlerini içeriyor.
const Home: React.FC = () => {
  // todos tüm görevleri saklar, filter aktif, tamamlanmış veya tüm görevleri filtrelemek için.
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all')

  // Component ilk yüklendiğinde boş gelir
  // localStoragedan todosları alır ve tarihleri işler.
  useEffect(() => {
    const storedTodos = getTodos()
    const parsedTodos = storedTodos.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt), 
      completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined // tamamlanma tarihini  çevirir
    }))
    setTodos(parsedTodos) // tamamlanmış todoları statee kaydeder
  }, []) // Yalnızca ilk yüklendiğinde çalışır

  // Yeni todo ekler. görev metni boşsa hata mesajı gösterir.
  const addTodo = (text: string) => {
    if (!text.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Görev metni boş olamaz!',
      })
      return
    }

    const newTodo: Todo = {
      id: Date.now().toString(), 
      text,
      completed: false,
      createdAt: new Date(),
    }

    const updatedTodos = [newTodo, ...todos] // Yeni todoyu başta ekler
    setTodos(updatedTodos) // State güncellenir
    saveTodos(updatedTodos) // Güncellenen todolar localStoragea kaydedilir

    // todo eklendiğinde eklendi mesajını gösterir.
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Görev eklendi!',
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    })
  }

  //todoların tamamlanma durumunu değiştirir.
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed, // Tamamlanmışı tersine çevirir
          completedAt: !todo.completed ? new Date() : undefined // Tamamlanma zamanı  için 
        }
      }
      return todo
    })
    setTodos(updatedTodos) // güncellenen todoslar state kaydedilir
    saveTodos(updatedTodos) // güncellenen todoslar localStorage kaydedilir
  }

  //todo düzenlemek için. Yeni metin geçerli değilse işlem yapmaz.
  const editTodo = (id: string, newText: string) => {
    if (!newText.trim()) return // yeni metin boşsa işlem yapmaz

    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo // Yalnızca düzenlenen todoyu günceller
    )
    setTodos(updatedTodos) 
    saveTodos(updatedTodos) 

    // todo güncellenince başarılı mesajı gösterilir.
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Görev güncellendi!',
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    })
  }

  //todoları silmek için. Kullanıcıdan onay alır.
  const deleteTodo = (id: string) => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Bu görevi silmek istediğinizden emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2c7be5',
      cancelButtonColor: '#e63757',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter(todo => todo.id !== id) // Silinen todoyu listeden çıkarır
        setTodos(updatedTodos) 
        saveTodos(updatedTodos) 

        // Silme işlemi başarılı olduğunda kullanıcıya bildirim gösterir.
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Görev silindi!',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        })
      }
    })
  }

  // Filtreleme işlemi için.
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'active') return !todo.completed
    return true 
  })

  // Tamamlanan ve tamamlanmayan todoların sayısını hesaplar.
  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <HomeContainer>
      <Title>Yapılacaklar Listesi</Title>

      
      <StatsContainer>
        <StatCard>
          <StatNumber>{todos.length}</StatNumber>
          <StatLabel>Toplam Görev</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{activeCount}</StatNumber>
          <StatLabel>Aktif</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{completedCount}</StatNumber>
          <StatLabel>Tamamlanan</StatLabel>
        </StatCard>
      </StatsContainer>

      {/* Yeni görev eklemek için*/}
      <AddTodo onAdd={addTodo} />
      {/* Görevleri filtrelemek  */}
      <FilterTodos currentFilter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </HomeContainer>
  )
}

export default Home
