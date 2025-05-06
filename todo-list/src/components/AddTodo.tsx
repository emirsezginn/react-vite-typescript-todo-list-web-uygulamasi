import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  margin-bottom: 30px;
`

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a6fa5;
  }
`

const Button = styled.button`
  padding: 12px 20px;
  background-color: #4a6fa5;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a5a8a;
  }
`

// Bu bileşene prop olarak bir metin alıp işleyecek onAdd fonksiyonu gider
interface AddTodoProps {
  onAdd: (text: string) => void  // Metini alıp herhangi bir şey döndürmeyen fonksiyon
}


// addtodo ile kullanıcının yeni bir madde eklemesini sağladım.
const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  // Kullanıcının input'a yazdığı metni tutmak için state
  const [text, setText] = useState('')

  // Form gönderildiğinde çağrılır
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()      // Sayfanın yenilenmesini engeller
    onAdd(text)             // prop olarak gelen onAdd fonksiyonuna metni gönderir
    setText('')             // Input alanını temizler
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Yeni bir todo ekleyin"
      />
      <Button type="submit">Ekle</Button>
    </Form>
  )
}

export default AddTodo