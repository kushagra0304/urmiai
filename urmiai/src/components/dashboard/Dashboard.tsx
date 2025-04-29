import { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [dateRange] = useState('03/05/2025 - 04/05/2025');
  const [groupedBy] = useState('Day');
  const [assistantFilter] = useState('All Assistants');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data for charts
  const callMinutesData = [
    { date: '2025-03-15', minutes: 10 },
    { date: '2025-03-17', minutes: 0 },
    { date: '2025-03-19', minutes: 1.2 },
    { date: '2025-03-21', minutes: 0.5 },
    { date: '2025-03-23', minutes: 2.5 },
    { date: '2025-03-25', minutes: 0 },
    { date: '2025-03-27', minutes: 4 },
    { date: '2025-03-29', minutes: 1 },
    { date: '2025-03-31', minutes: 30.8 },
  ];

  const numberOfCallsData = [
    { date: '2025-03-15', calls: 10 },
    { date: '2025-03-17', calls: 0 },
    { date: '2025-03-19', calls: 1 },
    { date: '2025-03-21', calls: 1 },
    { date: '2025-03-23', calls: 2 },
    { date: '2025-03-25', calls: 0 },
    { date: '2025-03-27', calls: 6 },
    { date: '2025-03-29', calls: 2 },
    { date: '2025-03-31', calls: 4 },
  ];

  const totalSpentData = [
    { date: '2025-03-15', amount: 1 },
    { date: '2025-03-17', amount: 0 },
    { date: '2025-03-19', amount: 0.05 },
    { date: '2025-03-21', amount: 0.1 },
    { date: '2025-03-23', amount: 0.15 },
    { date: '2025-03-25', amount: 0.2 },
    { date: '2025-03-27', amount: 0.35 },
    { date: '2025-03-29', amount: 0.32 },
    { date: '2025-03-31', amount: 0.25 },
  ];

  const averageCostData = [
    { date: '2025-03-15', cost: 0.1 },
    { date: '2025-03-17', cost: 0 },
    { date: '2025-03-19', cost: 0.05 },
    { date: '2025-03-21', cost: 0.1 },
    { date: '2025-03-23', cost: 0.075 },
    { date: '2025-03-25', cost: 0 },
    { date: '2025-03-27', cost: 0.058 },
    { date: '2025-03-29', cost: 0.16 },
    { date: '2025-03-31', cost: 0.0625 },
  ];

  const callEndReasonData = [
    { name: 'Mar 14', 'customer-ended-call': 0, 'silence-timed-out': 0, 'customer-did-not-answer': 0 },
    { name: 'Mar 16', 'customer-ended-call': 0, 'silence-timed-out': 0, 'customer-did-not-answer': 0 },
    { name: 'Mar 18', 'customer-ended-call': 0, 'silence-timed-out': 0, 'customer-did-not-answer': 0 },
    { name: 'Mar 20', 'customer-ended-call': 1, 'silence-timed-out': 0, 'customer-did-not-answer': 0 },
    { name: 'Mar 22', 'customer-ended-call': 0, 'silence-timed-out': 1, 'customer-did-not-answer': 0 },
    { name: 'Mar 24', 'customer-ended-call': 0, 'silence-timed-out': 1, 'customer-did-not-answer': 1 },
    { name: 'Mar 26', 'customer-ended-call': 3, 'silence-timed-out': 2, 'customer-did-not-answer': 1 },
    { name: 'Mar 28', 'customer-ended-call': 2, 'silence-timed-out': 0, 'customer-did-not-answer': 0 },
    { name: 'Mar 30', 'customer-ended-call': 1, 'silence-timed-out': 3, 'customer-did-not-answer': 2 },
    { name: 'Apr 01', 'customer-ended-call': 0, 'silence-timed-out': 0, 'customer-did-not-answer': 0 },
  ];

  const callDurationData = [
    { name: 'Mar 14', Mary: 0, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
    { name: 'Mar 16', Mary: 0, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
    { name: 'Mar 18', Mary: 0, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
    { name: 'Mar 20', Mary: 0, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
    { name: 'Mar 22', Mary: 0, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
    { name: 'Mar 24', Mary: 1.8, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
    { name: 'Mar 26', Mary: 0, Alex: 0.8, Robin: 0.6, 'Unknown Assistant': 0 },
    { name: 'Mar 28', Mary: 0.8, Alex: 0, Robin: 1.1, 'Unknown Assistant': 0 },
    { name: 'Mar 30', Mary: 0.8, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
    { name: 'Apr 01', Mary: 0, Alex: 0, Robin: 0, 'Unknown Assistant': 0 },
  ];

  const costBreakdownData = [
    { name: 'Mar 14', LLM: 0, STT: 0, TTS: 0, VAPI: 0 },
    { name: 'Mar 16', LLM: 0, STT: 0, TTS: 0, VAPI: 0 },
    { name: 'Mar 18', LLM: 0, STT: 0, TTS: 0, VAPI: 0 },
    { name: 'Mar 20', LLM: 0, STT: 0, TTS: 0, VAPI: 0 },
    { name: 'Mar 22', LLM: 0, STT: 0.2, TTS: 0, VAPI: 0 },
    { name: 'Mar 24', LLM: 0, STT: 0, TTS: 0.3, VAPI: 0 },
    { name: 'Mar 26', LLM: 0, STT: 0, TTS: 0.5, VAPI: 0 },
    { name: 'Mar 28', LLM: 0, STT: 0, TTS: 0, VAPI: 0.3 },
    { name: 'Mar 30', LLM: 0, STT: 0, TTS: 0, VAPI: 0.4 },
    { name: 'Apr 01', LLM: 0, STT: 0, TTS: 0, VAPI: 0 },
  ];

  const successEvaluationData = [
    { name: 'Mar 14', true: 0, unknown: 0, false: 0 },
    { name: 'Mar 16', true: 0, unknown: 0, false: 0 },
    { name: 'Mar 18', true: 0, unknown: 0, false: 0 },
    { name: 'Mar 20', true: 0, unknown: 0, false: 0 },
    { name: 'Mar 22', true: 1, unknown: 0, false: 0 },
    { name: 'Mar 24', true: 0, unknown: 1, false: 1 },
    { name: 'Mar 26', true: 0, unknown: 6, false: 3 },
    { name: 'Mar 28', true: 0, unknown: 2, false: 0 },
    { name: 'Mar 30', true: 0, unknown: 3, false: 3 },
    { name: 'Apr 01', true: 0, unknown: 0, false: 0 },
  ];

  const unsuccessfulCalls = [
    { id: 1, assistant: "Mary", date: "2 Apr, 17:16", phone: "+919958154630", status: "Failed" },
    { id: 2, assistant: "Mary", date: "2 Apr, 17:15", phone: "+919958154630", status: "Failed" },
    { id: 3, assistant: "Mary", date: "2 Apr, 17:14", phone: "+919958154630", status: "Failed" },
    { id: 4, assistant: "Mary", date: "27 Mar, 17:51", phone: "+918882006988", status: "Failed" },
    { id: 5, assistant: "Mary", date: "27 Mar, 17:50", phone: "+918882006988", status: "Failed" },
  ];

  const concurrentCallsData = [
    { time: '2025-03-23 05:30', calls: 1 },
    { time: '2025-03-27 05:30', calls: 1 },
    { time: '2025-03-28 05:30', calls: 2 },
    { time: '2025-04-01 05:30', calls: 2 },
    { time: '2025-04-02 05:30', calls: 1 },
  ];

  const handleLogout = () => {
    // Placeholder for logout functionality
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">Urmi AI</h1>
          <button className="close-sidebar" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <Link to="/dashboard" className="sidebar-link active">
              <span className="icon">📊</span>
              <span className="text">Dashboard</span>
            </Link>
            <Link to="/calls" className="sidebar-link">
              <span className="icon">📞</span>
              <span className="text">Calls</span>
            </Link>
            <Link to="/assistants" className="sidebar-link">
              <span className="icon">🤖</span>
              <span className="text">Assistants</span>
            </Link>
            <Link to="/transcripts" className="sidebar-link">
              <span className="icon">📝</span>
              <span className="text">Transcripts</span>
            </Link>
            <Link to="/settings" className="sidebar-link">
              <span className="icon">⚙️</span>
              <span className="text">Settings</span>
            </Link>
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="icon">🚪</span>
              <span className="text">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {/* Mobile navbar */}
        <nav className="mobile-navbar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="navbar-right">
            <span className="page-title">Overview</span>
          </div>
        </nav>

        <header className="dashboard-header">
          <button className="mobile-nav-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="title">
            <h2>Overview</h2>
          </div>
          <div className="filters">
            <div className="date-range">
              <span>📅 {dateRange}</span>
            </div>
            <div className="filter-options">
              <span>grouped by</span>
              <div className="dropdown">
                <span className="selected">{groupedBy}</span>
                <span className="arrow">▼</span>
              </div>
              <span>filtered by</span>
              <div className="dropdown">
                <span className="selected">{assistantFilter}</span>
                <span className="arrow">▼</span>
              </div>
            </div>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>📞 Total Call Minutes</h3>
            <div className="stat-value">12.91</div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={callMinutesData}>
                  <Line type="monotone" dataKey="minutes" stroke="#FF335F" dot={false} />
                  <XAxis dataKey="date" hide={true} />
                  <YAxis hide={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card">
            <h3>📊 Number of Calls</h3>
            <div className="stat-value">19</div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={numberOfCallsData}>
                  <Line type="monotone" dataKey="calls" stroke="#6366F1" dot={false} />
                  <XAxis dataKey="date" hide={true} />
                  <YAxis hide={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card">
            <h3>💵 Total Spent</h3>
            <div className="stat-value">$1.32</div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalSpentData}>
                  <Line type="monotone" dataKey="amount" stroke="#F97316" dot={false} />
                  <XAxis dataKey="date" hide={true} />
                  <YAxis hide={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card">
            <h3>⚖️ Average Cost per Call</h3>
            <div className="stat-value">$0.07</div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={averageCostData}>
                  <Line type="monotone" dataKey="cost" stroke="#0EA5E9" dot={false} />
                  <XAxis dataKey="date" hide={true} />
                  <YAxis hide={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="section-title">
          <h2>Call Analysis</h2>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>📋 Reason Call Ended</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callEndReasonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customer-ended-call" stackId="a" fill="#6366F1" />
                  <Bar dataKey="silence-timed-out" stackId="a" fill="#22C55E" />
                  <Bar dataKey="customer-did-not-answer" stackId="a" fill="#EAB308" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#6366F1" }}></div>
                <span>Customer Ended</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#22C55E" }}></div>
                <span>Silence Timeout</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#EAB308" }}></div>
                <span>No Answer</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>⏱️ Call Duration by Assistant</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callDurationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Mary" stackId="a" fill="#6366F1" />
                  <Bar dataKey="Alex" stackId="a" fill="#22C55E" />
                  <Bar dataKey="Robin" stackId="a" fill="#EAB308" />
                  <Bar dataKey="Unknown Assistant" stackId="a" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#6366F1" }}></div>
                <span>Mary</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#22C55E" }}></div>
                <span>Alex</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#EAB308" }}></div>
                <span>Robin</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#F97316" }}></div>
                <span>Unknown</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>💰 Cost Breakdown</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="LLM" fill="#6366F1" />
                  <Bar dataKey="STT" fill="#22C55E" />
                  <Bar dataKey="TTS" fill="#EAB308" />
                  <Bar dataKey="VAPI" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#6366F1" }}></div>
                <span>LLM</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#22C55E" }}></div>
                <span>STT</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#EAB308" }}></div>
                <span>TTS</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#F97316" }}></div>
                <span>VAPI</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>✅ Success Evaluation</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={successEvaluationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="true" stackId="a" fill="#22C55E" />
                  <Bar dataKey="unknown" stackId="a" fill="#6366F1" />
                  <Bar dataKey="false" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#22C55E" }}></div>
                <span>true</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#6366F1" }}></div>
                <span>Unknown</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#EF4444" }}></div>
                <span>false</span>
              </div>
            </div>
          </div>

          <div className="chart-card unsuccessful-calls">
            <h3>❌ Unsuccessful calls</h3>
            <div className="calls-list">
              {unsuccessfulCalls.map((call) => (
                <div className="call-item" key={call.id}>
                  <div className="call-details">
                    <div className="assistant-name">{call.assistant}</div>
                    <div className="call-info">{call.date} • {call.phone}</div>
                  </div>
                  <div className="call-status failed">{call.status}</div>
                </div>
              ))}
            </div>
            <div className="view-more">
              <button>View More</button>
            </div>
          </div>

          <div className="chart-card">
            <div className="card-header">
              <h3>🔄 Number of Concurrent Calls</h3>
              <div className="dropdown">
                <button className="dropdown-btn">Day</button>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={concurrentCallsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calls" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="ask-ai">
          <button className="ask-ai-btn">
            🤖 Ask AI
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 