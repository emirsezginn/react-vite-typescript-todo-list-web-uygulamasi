import { Todo } from '../types/todo'

// Local storageda yapılacaklar listesine erişmek için kullanılan  anahtar.
const STORAGE_KEY = 'todos-react-ts'

// Todosu almak için kullanılan fonksiyon.
export const getTodos = (): Todo[] => {
  // localStoragedan kaydedilmiş veriyi alır.
  const todos = localStorage.getItem(STORAGE_KEY)

  // Eğer todos verisi mevcutsa.
  if (todos) {
    try {
      // Veriyi json formatından JavaScript objelerine dönüştürür.
      const parsed = JSON.parse(todos)
      
      return parsed.map((todo: any) => ({
        // Her 'todo' objesine mevcut 'createdAt' ve completedAt tarihlerini Date objelerine dönüştürür.
        ...todo,
        createdAt: new Date(todo.createdAt),
        // Eğer completedAt bilgisi varsa, onu da Date objesine çevirir.
        completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined
      }))
    } catch (error) {
      // json.parse işlemi başarısız olursa hata mesajı.
      console.error('Error parsing todos from localStorage', error)
      return [] // Hata durumunda boş bir array döndürür.
    }
  }
  
  // Eğer 'todos' verisi yoksa, boş bir array döndürür.
  return []
}

// Todosu localStorage kaydetmek için kullanılan fonksiyon.
export const saveTodos = (todos: Todo[]): void => {
  // todos arrayini json formatına dönüştürüp, localStorage kaydediyoruz.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
