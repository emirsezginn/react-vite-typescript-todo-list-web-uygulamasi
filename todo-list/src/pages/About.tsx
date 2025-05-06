import styled from 'styled-components'

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #4a6fa5;
`

const Content = styled.div`
  line-height: 1.8;

  p {
    margin-bottom: 20px;
  }
`
const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>About Todo List App</Title>
      <Content>
        <p>
          This is a simple Todo List application built with React, TypeScript, and styled-components.
          It allows you to add, edit, delete, and mark todos as completed.
        </p>
        <p>
          The application uses localStorage to persist your todos between sessions, so your tasks
          won't disappear when you refresh the page or close the browser.
        </p>
        <p>
          You can also filter your todos by their completion status to better organize your tasks.
        </p>
        <p>
          This project demonstrates modern React development practices including functional
          components, hooks, TypeScript integration, and styled-components for CSS-in-JS styling.
        </p>
      </Content>
    </AboutContainer>
  )
}

export default About