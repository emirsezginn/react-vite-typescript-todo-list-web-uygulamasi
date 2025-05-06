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
      <Title>Todo List Web App</Title>
      <Content>
        <p>
        Bu Todo List Uygulaması, günlük hayatınızdaki görevleri düzenlemek ve takip etmek için basit ama kullanışlı bir araçtır. React, TypeScript, ve Vite kullanarak geliştirilen bu uygulama, şık bir kullanıcı arayüzü ve etkili görev yönetimi sağlar.
        </p>
        <p>
        Uygulama, görevlerinizi eklemenize, düzenlemenize, silmenize ve tamamlamanıza olanak tanır. Ayrıca, görevlerinizi tamamlanmış, aktif ve tüm görevler olarak filtreleyebilirsiniz. Görevleriniz localStorage kullanılarak kalıcı hale gelir, böylece sayfayı yenileseniz ya da uygulamayı kapatsanız bile verileriniz kaybolmaz.
        </p>
        <p>
        styled-components ile modern bir stil yönetimi yapılmış olup, sweetalert2 ile şık bildirimler gösterilir. React Router ile sayfalar arası geçişler yapılır ve tüm bunlar TypeScript desteğiyle güçlü ve tip güvenli bir yapı oluşturulmuştur.
        </p>
        <p>
        Uygulama, görevlerinizi takip ederken işlerinizi daha verimli bir şekilde yapmanıza yardımcı olmak için tasarlanmıştır.
        </p>
      </Content>
    </AboutContainer>
  )
}

export default About