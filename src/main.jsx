import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { seedDatabase } from './db/database'
import App from './App.jsx'

// Seed initial data before render
try { seedDatabase(); } catch (e) { console.warn('Seed failed:', e.message); }

// Error boundary to prevent blank screen from unhandled errors
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('App error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#000e10', color: '#00bbc4', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏨 Hotel Chandamama</h1>
          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Something went wrong loading the page.</p>
          <button onClick={() => window.location.reload()} style={{ background: 'linear-gradient(135deg,#00bbc4,#006b71)', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '0.75rem', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre style={{ marginTop: '2rem', fontSize: '0.75rem', opacity: 0.5, maxWidth: '600px', overflow: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
