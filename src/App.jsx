import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Hostel from './pages/Hostel';
import Timetable from './pages/Timetable';
import Contacts from './pages/Contacts';
import Fees from './pages/Fees';
import Complaints from './pages/Complaints';
import Students from './pages/Students';
import Classes from './pages/Classes';

// Guard: redirects to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null; // wait for Firebase to resolve
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"  element={<Dashboard />} />
            <Route path="hostel"     element={<Hostel />} />
            <Route path="timetable"  element={<Timetable />} />
            <Route path="contacts"   element={<Contacts />} />
            <Route path="students"   element={<Students />} />
            <Route path="classes"    element={<Classes />} />
            <Route path="fees"       element={<Fees />} />
            <Route path="complaints" element={<Complaints />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;