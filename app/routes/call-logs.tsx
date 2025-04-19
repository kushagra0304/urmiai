import { useState, useEffect } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import "./call-logs.css";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import axios from "axios";

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

// API response interfaces
interface ApiCallObject {
  answer_time: string;
  bill_duration: number;
  call_duration: number;
  call_id: string;
  call_uuid: string;
  call_direction: string;
  end_time: string;
  from_number: string;
  to_number: string;
  hangup_cause_name: string;
  hangup_source: string;
  total_amount: string;
  [key: string]: any;
}

interface ApiResponse {
  api_id: string;
  meta: {
    limit: number;
    offset: number;
    total_count: number;
    previous: string;
    next: string;
  };
  objects: ApiCallObject[];
}

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} at ${hours}:${minutes}`;
}

// Helper function to format duration
function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
}

// Helper function to determine customer phone type
function getCustomerPhoneType(callDirection: string): string {
  if (callDirection === "outbound") {
    return "Outbound";
  } else if (callDirection === "inbound") {
    return "Inbound";
  } else {
    return "Web";
  }
}

// Helper function to map API call object to our CallLog format
function mapApiCallToCallLog(apiCall: ApiCallObject): CallLog {
  const customerPhoneType = getCustomerPhoneType(apiCall.call_direction);

  // For demo purposes, assign some calls to Mary
  const assistantName =
    apiCall.call_id.charAt(0) < "M" ? "Mary" : "No Assistant Assigned";

  // For demo purposes, assign some success evaluations randomly
  const successOptions = ["Pass", "Fail", "N/A"];
  const successEvaluation =
    successOptions[Math.floor(Math.random() * successOptions.length)];

  return {
    id: apiCall.call_uuid.substring(0, 16) + "...",
    assistant: assistantName,
    assistantPhoneNumber: apiCall.from_number || "N/A",
    customerPhoneNumber: apiCall.to_number || "N/A",
    customerPhoneType: customerPhoneType,
    endedReason:
      apiCall.hangup_source === "customer"
        ? "Customer Ended Call"
        : "System Ended Call",
    successEvaluation: successEvaluation,
    startTime: formatDate(apiCall.answer_time),
    duration: formatDuration(apiCall.call_duration),
    cost: "$" + parseFloat(apiCall.total_amount).toFixed(2),
  };
}

export async function loader() {
  try {
    // Fetch data from your API
    const response = await axios.get("http://localhost:3001/api/calls");
    const apiData: ApiResponse = response.data;

    // Map API data to our CallLog format
    const logs = apiData.objects.map(mapApiCallToCallLog);

    // Calculate stats
    const successful = logs.filter(
      (log) => log.successEvaluation === "Pass"
    ).length;
    const failed = logs.filter(
      (log) => log.successEvaluation === "Fail"
    ).length;

    return {
      stats: {
        all: apiData.meta.total_count || logs.length,
        transferred: 0,
        successful: successful,
        failed: failed,
      },
      logs: logs,
    };
  } catch (error) {
    console.error("Failed to load call logs:", error);

    // Return fallback data in case of error
    return {
      stats: {
        all: 64,
        transferred: 0,
        successful: 54,
        failed: 0,
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
          cost: "$0.03",
        },
        // ... rest of your fallback data
      ],
    };
  }
}

export default function CallLogs() {
  const { stats, logs } = useLoaderData() as {
    stats: {
      all: number;
      transferred: number;
      successful: number;
      failed: number;
    };
    logs: CallLog[];
  };
  const [selectedFilters, setSelectedFilters] = useState({
    date: true,
    cost: true,
    callType: true,
    assistant: true,
    callId: true,
    successEvaluation: true,
    endedReason: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<CallLog | null>(null);
  const [activeTab, setActiveTab] = useState("logs");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openModal = (log: CallLog) => {
    setSelectedLog(log);
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  // Mock data for the modal content
  const transcriptData = [
    { speaker: "User", message: "Hi, I want to book an appointment" },
    {
      speaker: "Assistant",
      message:
        "Hello! I'd be happy to help you book an appointment. What type of appointment are you looking for?",
    },
    {
      speaker: "User",
      message: "I need to see Dr. Gupta for a follow-up visit",
    },
    {
      speaker: "Assistant",
      message:
        "Great, I can help you with that. Dr. Gupta has availability this Thursday at 2:00 PM and Friday at 10:00 AM. Would either of those times work for you?",
    },
    { speaker: "User", message: "Thursday at 2 PM works for me" },
    {
      speaker: "Assistant",
      message:
        "Perfect! I've booked your appointment with Dr. Gupta on Thursday at 2:00 PM. You'll receive a confirmation email shortly with all the details. Is there anything else you need help with today?",
    },
    { speaker: "User", message: "No, that's all. Thank you!" },
    {
      speaker: "Assistant",
      message:
        "You're welcome! If you have any questions before your appointment, feel free to call us back. Have a great day!",
    },
  ];

  const timelineData = [
    {
      time: "11:46:19.380",
      description:
        "Voice cached: Hello, this is Urmi from Dr. Gupta's Clinic. How can I help you today?",
      code: "LOG",
    },
    {
      time: "11:46:19.473",
      description: "Assistant speech started",
      code: "CHECKPOINT",
    },
    {
      time: "11:46:23.529",
      description: "Assistant speech stopped",
      code: "CHECKPOINT",
    },
    {
      time: "11:46:25.600",
      description: "User speech possibly starting",
      code: "CHECKPOINT",
    },
    {
      time: "11:46:25.720",
      description: "User speech started",
      code: "CHECKPOINT",
    },
    {
      time: "11:46:26.800",
      description: "User speech possibly stopping",
      code: "CHECKPOINT",
    },
    {
      time: "11:46:28.260",
      description: "User speech stopped",
      code: "CHECKPOINT",
    },
    {
      time: "11:46:28.852",
      description: "Transcriber output: Hi, I want to book an appointment",
      code: "LOG",
    },
    {
      time: "11:46:30.383",
      description: "Model request started",
      code: "CHECKPOINT",
    },
    {
      time: "11:46:30.385",
      description:
        "Model request started (attempt #1, chatgpt-4o-latest, openai)",
      code: "LOG",
    },
    {
      time: "11:46:33.148",
      description:
        "Model request started (attempt #2, gpt-4o-2024-05-13-global, azure-openai, westus)",
      code: "LOG",
    },
  ];

  const CallLogsModal = () => {
    if (!selectedLog) return null;

    return (
      <div
        className={`modal-overlay ${modalOpen ? "active" : ""}`}
        onClick={closeModal}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">
              Call Details
              {selectedLog.successEvaluation === "Pass" && (
                <span className="badge badge-success">Pass</span>
              )}
              {selectedLog.successEvaluation === "Fail" && (
                <span className="badge badge-fail">Fail</span>
              )}
            </div>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
          </div>

          {/* Recording Section */}
          <div className="recording-section">
            <div className="recording-title">Recording</div>
            <div className="recording-container">
              <div className="waveform-container">
                <div className="waveform-top">
                  <div className="waveform-visualization">
                    {Array.from({ length: 50 }).map((_, i) => {
                      // Generating random bar heights with some patterns
                      const height =
                        i % 9 === 0
                          ? "large"
                          : i % 5 === 0
                          ? "medium"
                          : i % 3 === 0
                          ? "small"
                          : "tiny";
                      return (
                        <div
                          key={`top-${i}`}
                          className={`waveform-bar top-band ${height}`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div className="waveform-bottom">
                  <div className="waveform-visualization">
                    {Array.from({ length: 50 }).map((_, i) => {
                      // Generating random bar heights with some patterns
                      const height =
                        i % 7 === 0
                          ? "large"
                          : i % 4 === 0
                          ? "medium"
                          : i % 2 === 0
                          ? "small"
                          : "tiny";
                      return (
                        <div
                          key={`bottom-${i}`}
                          className={`waveform-bar bottom-band ${height}`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div className="waveform-time-markers">
                  {[
                    "",
                    "10",
                    "20",
                    "30",
                    "40",
                    "50",
                    "1:00",
                    "1:10",
                    "1:20",
                    "1:30",
                    "1:40",
                    "1:50",
                    "2:00",
                    "2:10",
                    "2:25",
                  ].map((time, i) => (
                    <div key={`marker-${i}`} className="timeline-marker">
                      {time}
                    </div>
                  ))}
                </div>
              </div>
              <div className="playback-controls">
                <button className="play-button">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 4L18 12L6 20V4Z" fill="currentColor" />
                  </svg>
                </button>
                <div className="audio-label">
                  <span className="audio-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                        fill="currentColor"
                      />
                      <path d="M16 12L10 7V17L16 12Z" fill="currentColor" />
                    </svg>
                  </span>
                  Audio
                </div>
              </div>
            </div>
          </div>

          {/* Call Tabs */}
          <div className="call-tabs-container">
            <div
              className={`call-tab ${activeTab === "logs" ? "active" : ""}`}
              onClick={() => changeTab("logs")}
            >
              Logs
            </div>
            <div
              className={`call-tab ${
                activeTab === "transcript" ? "active" : ""
              }`}
              onClick={() => changeTab("transcript")}
            >
              Transcript
            </div>
            <div
              className={`call-tab ${activeTab === "analysis" ? "active" : ""}`}
              onClick={() => changeTab("analysis")}
            >
              Analysis
            </div>
            <div
              className={`call-tab ${activeTab === "messages" ? "active" : ""}`}
              onClick={() => changeTab("messages")}
            >
              Messages
            </div>
            <div
              className={`call-tab ${activeTab === "cost" ? "active" : ""}`}
              onClick={() => changeTab("cost")}
            >
              Call Cost
            </div>
          </div>

          {/* Tab Contents */}
          <div
            className={`tab-content ${activeTab === "logs" ? "active" : ""}`}
          >
            <div className="modal-body">
              {timelineData.map((event, index) => (
                <div key={index} className="timeline-event">
                  <div className="event-time">{event.time}</div>
                  <div className="event-description">
                    {event.description}
                    <span className="event-code">{event.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`tab-content ${
              activeTab === "transcript" ? "active" : ""
            }`}
          >
            <div className="transcript-container">
              <div className="transcript-header">Transcript</div>
              <div className="transcript-content">
                {transcriptData.map((entry, index) => (
                  <div key={index} className="transcript-entry">
                    <div className={`speaker ${entry.speaker.toLowerCase()}`}>
                      {entry.speaker}
                    </div>
                    <div className="message">{entry.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`tab-content ${
              activeTab === "analysis" ? "active" : ""
            }`}
          >
            <div className="modal-body">
              <div className="detail-section">
                <div className="section-title">Call Analysis</div>
                <p>Call sentiment: Positive</p>
                <p>Main topics: Appointment booking, Doctor availability</p>
                <p>Resolution: Appointment successfully booked</p>
              </div>
            </div>
          </div>

          <div
            className={`tab-content ${
              activeTab === "messages" ? "active" : ""
            }`}
          >
            <div className="modal-body">
              <div className="detail-section">
                <div className="section-title">System Messages</div>
                <p>No system messages for this call.</p>
              </div>
            </div>
          </div>

          <div
            className={`tab-content ${activeTab === "cost" ? "active" : ""}`}
          >
            <div className="modal-body">
              <div className="detail-section">
                <div className="section-title">Cost Breakdown</div>
                <div className="detail-item">
                  <div className="item-label">Total Cost</div>
                  <div className="item-value">{selectedLog.cost}</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Speech-to-Text</div>
                  <div className="item-value">$0.03</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Text-to-Speech</div>
                  <div className="item-value">$0.05</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">LLM</div>
                  <div className="item-value">$0.11</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-body call-details-section"
            style={{ display: activeTab === "details" ? "block" : "none" }}
          >
            <div className="call-details-grid">
              <div className="detail-section">
                <div className="section-title">Call Information</div>
                <div className="detail-item">
                  <div className="item-label">Call ID</div>
                  <div className="item-value monospace-text">
                    {selectedLog.id}
                    <button className="copy-id-btn">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3H5C3.89543 3 3 3.89543 3 5V8M8 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V8M8 3V8H3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Start Time</div>
                  <div className="item-value">{selectedLog.startTime}</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Duration</div>
                  <div className="item-value">{selectedLog.duration}</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Cost</div>
                  <div className="item-value">{selectedLog.cost}</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Ended Reason</div>
                  <div className="item-value">{selectedLog.endedReason}</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Success Evaluation</div>
                  <div className="item-value">
                    {selectedLog.successEvaluation === "Pass" && (
                      <span className="badge badge-success">Pass</span>
                    )}
                    {selectedLog.successEvaluation === "Fail" && (
                      <span className="badge badge-fail">Fail</span>
                    )}
                    {selectedLog.successEvaluation === "N/A" && (
                      <span className="na-text">N/A</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <div className="section-title">Participant Information</div>
                <div className="detail-item">
                  <div className="item-label">Assistant</div>
                  <div className="item-value">{selectedLog.assistant}</div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Assistant ID</div>
                  <div className="item-value monospace-text">
                    {selectedLog.assistant === "Mary"
                      ? "g9f983ec-c6db-4645-b..."
                      : "N/A"}
                  </div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Assistant Phone Number</div>
                  <div className="item-value">
                    {selectedLog.assistantPhoneNumber}
                  </div>
                </div>
                <div className="detail-item">
                  <div className="item-label">Customer Phone Number</div>
                  <div className="item-value">
                    {selectedLog.customerPhoneNumber !== "N/A" ? (
                      <div className="customer-phone-wrapper">
                        <div className="customer-phone-badge">
                          <span className="channel-text">
                            {selectedLog.customerPhoneType}
                          </span>
                        </div>
                        {selectedLog.customerPhoneNumber !== "N/A" &&
                          selectedLog.customerPhoneType === "Outbound" && (
                            <div className="phone-number">
                              {selectedLog.customerPhoneNumber}
                            </div>
                          )}
                      </div>
                    ) : (
                      <span className="na-text">N/A</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CallLogsContent = () => (
    <DashboardLayout pageTitle="Call Logs">
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
              <div
                className={`filter-pill ${
                  selectedFilters.date ? "active" : ""
                }`}
              >
                <span className="pill-icon">○</span>
                <span>Date and Time</span>
              </div>
              <div
                className={`filter-pill ${
                  selectedFilters.cost ? "active" : ""
                }`}
              >
                <span className="pill-icon">○</span>
                <span>Cost</span>
              </div>
              <div
                className={`filter-pill ${
                  selectedFilters.callType ? "active" : ""
                }`}
              >
                <span className="pill-icon">○</span>
                <span>Call Type</span>
              </div>
              <div
                className={`filter-pill ${
                  selectedFilters.assistant ? "active" : ""
                }`}
              >
                <span className="pill-icon">○</span>
                <span>Assistant</span>
              </div>
              <div
                className={`filter-pill ${
                  selectedFilters.callId ? "active" : ""
                }`}
              >
                <span className="pill-icon">○</span>
                <span>Call ID</span>
              </div>
              <div
                className={`filter-pill ${
                  selectedFilters.successEvaluation ? "active" : ""
                }`}
              >
                <span className="pill-icon">○</span>
                <span>Success Evaluation</span>
              </div>
              <div
                className={`filter-pill ${
                  selectedFilters.endedReason ? "active" : ""
                }`}
              >
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
                  <tr
                    key={log.id}
                    className="log-item"
                    onClick={() => openModal(log)}
                    style={{ cursor: "pointer" }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="id-cell">
                        <span className="id-text">{log.id}</span>
                        <button
                          className="copy-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(log.id);
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3H5C3.89543 3 3 3.89543 3 5V8M8 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V8M8 3V8H3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td>
                      {log.assistant === "Mary" ? (
                        <div className="assistant-cell">
                          <div className="assistant-name">{log.assistant}</div>
                          <div className="assistant-id">
                            g9f983ec-c6db-4645-b...
                          </div>
                        </div>
                      ) : (
                        log.assistant
                      )}
                    </td>
                    <td>
                      {log.assistantPhoneNumber !== "N/A" ? (
                        <div className="phone-cell">
                          <div className="phone-number">
                            {log.assistantPhoneNumber}
                          </div>
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
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 4L4 20M8 4C8 6.20914 9.79086 8 12 8C14.2091 8 16 6.20914 16 4M4 8C6.20914 8 8 9.79086 8 12C8 14.2091 6.20914 16 4 16M16 12C16 9.79086 17.7909 8 20 8C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16M8 20C8 17.7909 9.79086 16 12 16C14.2091 16 16 17.7909 16 20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="channel-text">
                              {log.customerPhoneType}
                            </span>
                          </div>
                          {log.customerPhoneNumber !== "N/A" &&
                            log.customerPhoneType === "Outbound" && (
                              <div className="phone-number">
                                {log.customerPhoneNumber}
                              </div>
                            )}
                        </div>
                      ) : (
                        <div className="customer-phone-wrapper">
                          <div className="customer-phone-badge">
                            <span className="channel-icon">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
                                  fill="currentColor"
                                />
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

      <CallLogsModal />
    </DashboardLayout>
  );

  return (
    <ProtectedRoute>
      <CallLogsContent />
    </ProtectedRoute>
  );
}
