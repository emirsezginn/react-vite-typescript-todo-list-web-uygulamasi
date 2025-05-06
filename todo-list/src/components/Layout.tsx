import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const Header = styled.header`
  background-color: #4a6fa5;
  color: white;
  padding: 20px 0;
  margin-block: 40px;
  border-radius: 4px;
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
`

const NavLink = styled(Link)`
  color: white;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const Main = styled.main`
  min-height: calc(100vh - 160px);
`

const Footer = styled.footer`
  background-color: #4a6fa5;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
`

interface LayoutProps {
  children: React.ReactNode  // Bileşenin içine yerleştirilen tüm jsx içerikler
}

// Layout bileşeni: Sayfanın genel düzen yapısını (header, main, footer) tanımlar
export const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <Container>
      <Header>
        <Nav>
          <NavLink to="/">Anasayfa</NavLink>
          <NavLink to="/about">Hakkında</NavLink>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>Todo List App © {new Date().getFullYear()}</p>
      </Footer>
    </Container>
  )
}