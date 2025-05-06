import styled from 'styled-components'

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;
`

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => (props.active ? '#4a6fa5' : '#ddd')};
  background-color: ${props => (props.active ? '#4a6fa5' : 'white')};
  color: ${props => (props.active ? 'white' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #4a6fa5;
    background-color: ${props => (props.active ? '#4a6fa5' : 'rgba(74, 111, 165, 0.1)')};
  }
`

// FilterTodos bileşenine gönderilecek propsları tanımlar
interface FilterTodosProps {
  currentFilter: 'all' | 'completed' | 'active'  //seçili olan filtre durumu
  onFilterChange: (filter: 'all' | 'completed' | 'active') => void  // Filtre değişikliğinde çağrılacak fonksiyon
}


//Yapılacaklar listesini filtrelemek için butonlar içeriyor
const FilterTodos: React.FC<FilterTodosProps> = ({ currentFilter, onFilterChange }) => {

  return (
    <FilterContainer>
      <FilterButton
        active={currentFilter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        Hepsi
      </FilterButton>
      <FilterButton
        active={currentFilter === 'active'}
        onClick={() => onFilterChange('active')}
      >
        Aktif
      </FilterButton>
      <FilterButton
        active={currentFilter === 'completed'}
        onClick={() => onFilterChange('completed')}
      >
        Tamamlanan
      </FilterButton>
    </FilterContainer>
  )
}

export default FilterTodos