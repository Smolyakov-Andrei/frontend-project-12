import { Navbar, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext.jsx'

const ChatNavbar = () => {
  const { t } = useTranslation()
  const auth = useAuth()

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('hexletChat')}</Navbar.Brand>
        {auth.user && <Button onClick={auth.logOut}>{t('logout')}</Button>}
      </Container>
    </Navbar>
  )
}

export default ChatNavbar
