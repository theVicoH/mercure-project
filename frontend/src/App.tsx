import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ConversationPage from "./pages/conversation";
import { RoutesPath } from './types/routes';
import ToasterProvider from './features/toaster/toasterProviders';
import { useSelector } from 'react-redux';
import { RootState } from './stores/store';

function App() {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  return (
    <ToasterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to={RoutesPath.Login} />} />
          {!authToken ? <Route path={RoutesPath.Login} element={<LoginPage />} /> : <Route path={RoutesPath.Login} element={<Navigate to={RoutesPath.Conversation} />} />}
          {!authToken ? <Route path={RoutesPath.Register} element={<RegisterPage />} /> : <Route path={RoutesPath.Register} element={<Navigate to={RoutesPath.Conversation} />} />}
          {authToken && <Route path={RoutesPath.Conversation} element={<ConversationPage />} /> }
        </Routes>
      </Router>
    </ToasterProvider>
  )
}

export default App
