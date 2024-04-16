import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ChatPage from "./pages/chat";
import { RoutesPath } from './types/routes';
import ToasterProvider from './features/toaster/toasterProviders';
import { useSelector } from 'react-redux';
import { RootState } from './stores/store';
import UserProfil from './pages/userProfil';
import NotificationProvider from './features/notification/notificationProvider';

function App() {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  return (
    <NotificationProvider>
      <ToasterProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to={RoutesPath.Login} />} />
            {!authToken ? <Route path={RoutesPath.Login} element={<LoginPage />} /> : <Route path={RoutesPath.Login} element={<Navigate to={RoutesPath.Chat} />} />}
            {!authToken ? <Route path={RoutesPath.Register} element={<RegisterPage />} /> : <Route path={RoutesPath.Register} element={<Navigate to={RoutesPath.Chat} />} />}
            {authToken && <Route path={RoutesPath.Chat} element={<ChatPage />} /> }
            {authToken && <Route path={RoutesPath.UserProfil} element={<UserProfil />} /> }
          </Routes>
        </Router>
      </ToasterProvider>
    </NotificationProvider>
  )
}

export default App
