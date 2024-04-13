import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ConversationPage from "./pages/conversation";
import { RoutesPath } from './types/routes';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path={RoutesPath.Login} element={<LoginPage />} />
          <Route path={RoutesPath.Register} element={<RegisterPage />} />
          <Route path={RoutesPath.Conversation} element={<ConversationPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
