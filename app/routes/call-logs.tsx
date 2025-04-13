import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import './call-logs.css';

// Call log data interface
interface CallLog {
  id: string;
  assistant: string;
  assistantPhoneNumber: string;
  customerPhoneNumber: string;
  customerPhoneType: string;
  endedReason: string;
  successEvaluation: string;
  startTime: string;
  duration: string;
  cost: string;
}

export function loader() {
  // This would be replaced with actual API calls
  return {
    stats: {
      all: 64,
      transferred: 0,
      successful: 54,
      failed: 0
    },
    logs: [
      {
        id: "5f59b8e4-4c4...",
        assistant: "Mary",
        assistantPhoneNumber: "N/A",
        customerPhoneNumber: "N/A",
        customerPhoneType: "Web",
        endedReason: "Customer Ended Call",
        successEvaluation: "N/A",
        startTime: "2 Apr 2025 at 17:55",
        duration: "22s",
        cost: "$0.03"
      },
      {
        id: "26c0de6c-5ef...",
        assistant: "No Assistant Assigned",
        assistantPhoneNumber: "N/A",
        customerPhoneNumber: "N/A",
        customerPhoneType: "Web",
        endedReason: "Customer Ended Call",
        successEvaluation: "N/A",
        startTime: "2 Apr 2025 at 17:53",
        duration: "28s",
        cost: "$0.03"
      },
      {
        id: "1e2ac879-24f...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (99581) 54630",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "Fail",
        startTime: "2 Apr 2025 at 17:16",
        duration: "2m 25s",
        cost: "$0.19"
      },
      {
        id: "2df83bbb-957...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (99581) 54630",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "Fail",
        startTime: "2 Apr 2025 at 17:15",
        duration: "19s",
        cost: "$0.03"
      },
      {
        id: "179e5f8e-457...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (99581) 54630",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "Fail",
        startTime: "2 Apr 2025 at 17:14",
        duration: "42s",
        cost: "$0.06"
      },
      {
        id: "47ffff96-88a...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (99581) 54630",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "N/A",
        startTime: "2 Apr 2025 at 17:11",
        duration: "9s",
        cost: "$0.01"
      },
      {
        id: "83631632-28c...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (88820) 06988",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "Fail",
        startTime: "27 Mar 2025 at 17:51",
        duration: "26s",
        cost: "$0.04"
      },
      {
        id: "b96abc7e-457...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (88820) 06988",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "Fail",
        startTime: "27 Mar 2025 at 17:50",
        duration: "24s",
        cost: "$0.04"
      },
      {
        id: "4e9ceb21-afa...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (88820) 06988",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "Fail",
        startTime: "27 Mar 2025 at 17:48",
        duration: "15s",
        cost: "$0.03"
      },
      {
        id: "988cbb23-718...",
        assistant: "Mary",
        assistantPhoneNumber: "+1 (503) 741 2418",
        customerPhoneNumber: "+91 (99581) 54630",
        customerPhoneType: "Outbound",
        endedReason: "Customer Ended Call",
        successEvaluation: "Pass",
        startTime: "27 Mar 2025 at 16:33",
        duration: "1m 13s",
        cost: "$0.12"
      }
    ]
  };
}

export default function CallLogs() {
  const { stats, logs } = useLoaderData() as { 
    stats: { all: number; transferred: number; successful: number; failed: number },
    logs: CallLog[] 
  };
  const [selectedFilters, setSelectedFilters] = useState({
    date: true,
    cost: true,
    callType: true,
    assistant: true,
    callId: true,
    successEvaluation: true,
    endedReason: true
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const CallLogsContent = () => (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h1>URMI</h1>
          </div>
          <button className="sidebar-close" onClick={toggleSidebar}>×</button>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">ORGANIZATION</h3>
          <div className="sidebar-email">
            <span>mail@gmail.com</span>
            <span>📧</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <Link to="/" className="sidebar-link">
              <span className="sidebar-icon">🏠</span>
              <span>Overview</span>
            </Link>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">BUILD</h3>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">👤</span>
              <span>Assistants</span>
            </a>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">⚙️</span>
              <span>Workflows</span>
            </a>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">📱</span>
              <span>Phone Numbers</span>
            </a>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">🔧</span>
              <span>Tools</span>
            </a>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">📁</span>
              <span>Files</span>
            </a>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">👥</span>
              <span>Squads</span>
            </a>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">🔑</span>
              <span>Provider Keys</span>
            </a>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">TEST</h3>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">OBSERVE</h3>
            <Link to="/call-logs" className="sidebar-link active">
              <span className="sidebar-icon">📞</span>
              <span>Call Logs</span>
            </Link>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">📊</span>
              <span>API Logs</span>
            </a>
            <a href="#" className="sidebar-link">
              <span className="sidebar-icon">🔔</span>
              <span>Webhook Logs</span>
            </a>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">COMMUNITY</h3>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">ORG SETTINGS</h3>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">ACCOUNT SETTINGS</h3>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <a href="#" className="sidebar-help">
            <span className="sidebar-icon">❓</span>
            <span>Help</span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Mobile navbar */}
        <nav className="mobile-navbar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
         
          <div className="navbar-right">
            <span className="page-title">Call Logs</span>
          </div>
        </nav>

        <div className="call-logs-page">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Call Logs</span>
          </div>

          <div className="logs-content">
            <h2 className="logs-title">Logs</h2>
            
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-name">All</div>
                <div className="stat-value">{stats.all}</div>
              </div>
              <div className="stat-card">
                <div className="stat-name">Transferred</div>
                <div className="stat-value">{stats.transferred}</div>
              </div>
              <div className="stat-card">
                <div className="stat-name">Successful</div>
                <div className="stat-value">{stats.successful}</div>
              </div>
              <div className="stat-card">
                <div className="stat-name">Failed</div>
                <div className="stat-value">{stats.failed}</div>
              </div>
            </div>
            
            <div className="filter-row">
              <div className="filter-pills">
                <div className={`filter-pill ${selectedFilters.date ? 'active' : ''}`}>
                  <span className="pill-icon">○</span>
                  <span>Date and Time</span>
                </div>
                <div className={`filter-pill ${selectedFilters.cost ? 'active' : ''}`}>
                  <span className="pill-icon">○</span>
                  <span>Cost</span>
                </div>
                <div className={`filter-pill ${selectedFilters.callType ? 'active' : ''}`}>
                  <span className="pill-icon">○</span>
                  <span>Call Type</span>
                </div>
                <div className={`filter-pill ${selectedFilters.assistant ? 'active' : ''}`}>
                  <span className="pill-icon">○</span>
                  <span>Assistant</span>
                </div>
                <div className={`filter-pill ${selectedFilters.callId ? 'active' : ''}`}>
                  <span className="pill-icon">○</span>
                  <span>Call ID</span>
                </div>
                <div className={`filter-pill ${selectedFilters.successEvaluation ? 'active' : ''}`}>
                  <span className="pill-icon">○</span>
                  <span>Success Evaluation</span>
                </div>
                <div className={`filter-pill ${selectedFilters.endedReason ? 'active' : ''}`}>
                  <span className="pill-icon">○</span>
                  <span>Ended Reason</span>
                </div>
              </div>
              
              <div className="export-button">
                <span>Export to CSV</span>
                <span className="export-icon">⬇</span>
              </div>
            </div>
            
            <div className="logs-table-wrapper">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input type="checkbox" />
                    </th>
                    <th>Call ID</th>
                    <th>Assistant</th>
                    <th>Assistant Phone Number</th>
                    <th>Customer Phone Number</th>
                    <th>Ended Reason</th>
                    <th>Success Evaluation</th>
                    <th>
                      <div className="sortable">
                        Start Time
                        <span className="sort-icon">▼</span>
                      </div>
                    </th>
                    <th>Duration</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="log-item">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <div className="id-cell">
                          <span className="id-text">{log.id}</span>
                          <button className="copy-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M8 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V8M8 3V8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td>
                        {log.assistant === "Mary" ? (
                          <div className="assistant-cell">
                            <div className="assistant-name">{log.assistant}</div>
                            <div className="assistant-id">g9f983ec-c6db-4645-b...</div>
                          </div>
                        ) : (
                          log.assistant
                        )}
                      </td>
                      <td>
                        {log.assistantPhoneNumber !== "N/A" ? (
                          <div className="phone-cell">
                            <div className="phone-number">{log.assistantPhoneNumber}</div>
                            <div className="phone-type">Inbound paid</div>
                          </div>
                        ) : (
                          <span className="na-text">N/A</span>
                        )}
                      </td>
                      <td>
                        {log.customerPhoneNumber !== "N/A" ? (
                          <div className="customer-phone-wrapper">
                            <div className="customer-phone-badge">
                              <span className="channel-icon">
                                {log.customerPhoneType === "Web" ? (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="currentColor"/>
                                  </svg>
                                ) : (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 4L4 20M8 4C8 6.20914 9.79086 8 12 8C14.2091 8 16 6.20914 16 4M4 8C6.20914 8 8 9.79086 8 12C8 14.2091 6.20914 16 4 16M16 12C16 9.79086 17.7909 8 20 8C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16M8 20C8 17.7909 9.79086 16 12 16C14.2091 16 16 17.7909 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </span>
                              <span className="channel-text">{log.customerPhoneType}</span>
                            </div>
                            {log.customerPhoneNumber !== "N/A" && log.customerPhoneType === "Outbound" && (
                              <div className="phone-number">{log.customerPhoneNumber}</div>
                            )}
                          </div>
                        ) : (
                          <div className="customer-phone-wrapper">
                            <div className="customer-phone-badge">
                              <span className="channel-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="currentColor"/>
                                </svg>
                              </span>
                              <span className="channel-text">Web</span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="ended-reason">{log.endedReason}</span>
                      </td>
                      <td>
                        {log.successEvaluation === "Fail" ? (
                          <span className="eval-badge fail">Fail</span>
                        ) : log.successEvaluation === "Pass" ? (
                          <span className="eval-badge pass">Pass</span>
                        ) : (
                          <span className="na-text">N/A</span>
                        )}
                      </td>
                      <td>{log.startTime}</td>
                      <td>{log.duration}</td>
                      <td>{log.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="ask-ai">
          <button className="ask-ai-btn">
            Ask AI <span className="avatar">V</span>
          </button>
        </div>
      </main>
    </div>
  );

  return (
    <ProtectedRoute>
      <CallLogsContent />
    </ProtectedRoute>
  );
} 