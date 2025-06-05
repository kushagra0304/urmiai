import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import "./phone-numbers.css";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardLayout from "../components/dashboard/DashboardLayout";
// @ts-ignore
import * as XLSX from 'xlsx';
import { dispatchCall } from "../services";
import { Room } from "livekit-client";

// Sample prompts data
const samplePrompts = [
  {
    id: 1,
    title: "Customer Service",
    content: "You are a helpful customer service representative for our company. Assist customers with their inquiries professionally and courteously. If you need more information, ask clarifying questions. If you cannot resolve an issue, offer to escalate it to a human representative."
  },
  {
    id: 2,
    title: "Sales Representative",
    content: "You are a knowledgeable sales representative for our company. Help potential customers understand our products/services and address their concerns. Avoid being pushy but highlight the benefits that align with customer needs."
  },
  {
    id: 3,
    title: "Technical Support",
    content: "You are a technical support specialist. Help users troubleshoot problems with our product. Ask diagnostic questions to narrow down issues. Provide step-by-step instructions that are easy to follow. If the problem requires hardware intervention, guide them to contact our repair service."
  },
  {
    id: 4,
    title: "Appointment Scheduler",
    content: "You are an appointment scheduling assistant. Help callers book, reschedule, or cancel appointments. Collect necessary information including name, contact details, and reason for the appointment. Confirm all details before finalizing."
  },
  {
    id: 5,
    title: "Lead Qualification",
    content: "You are a lead qualification specialist. Ask questions to determine if callers are good candidates for our services. Collect information about their needs, budget, timeline, and decision-making process. Be professional and courteous to all callers."
  },
  {
    id: 6,
    title: "Product Information",
    content: "You are a product specialist. Provide detailed information about our products when customers call with questions. Explain features, benefits, pricing, and compatibility. If asked about comparisons with competitors, be factual and highlight our advantages without disparaging other companies."
  }
];

// Industry types for form dropdown
const industryTypes = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Media & Entertainment",
  "Consulting",
  "Transportation",
  "Energy",
  "Hospitality",
  "Other"
];

// Sample excel data for template
const excelSampleData = [
  {
    phoneNumber: "+1234567890",
    name: "John Doe",
    companyName: "Acme Corp",
    industryType: "Technology",
    designation: "Sales Manager",
    prompt: "You are a helpful customer service representative. Assist callers with their inquiries professionally."
  },
  {
    phoneNumber: "+0987654321",
    name: "Jane Smith",
    companyName: "XYZ Inc",
    industryType: "Healthcare",
    designation: "Operations Director",
    prompt: "You are a technical support specialist. Help users troubleshoot problems with our product."
  }
];

// Interface for Excel data entries
interface ExcelEntry {
  phoneNumber: string;
  name: string;
  companyName: string;
  industryType: string;
  designation: string;
  prompt: string;
  [key: string]: any;
}

/* Excel Modal Styles */
const styles = `
  /* Excel Modal Styles */
  .excel-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    backdrop-filter: blur(3px);
  }

  .excel-modal-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .excel-modal {
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    background-color: #1E1E1E;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateY(20px);
    border: 1px solid #2c2c2c;
    transition: transform 0.3s ease;
  }

  .excel-modal-overlay.open .excel-modal {
    transform: translateY(0);
  }

  .excel-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #2c2c2c;
    background-color: #1a1a1a;
  }

  .excel-modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #f1f1f1;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .excel-modal-title svg {
    width: 20px;
    height: 20px;
    color: #FF335F;
  }

  .excel-modal-close {
    background: none;
    border: none;
    font-size: 24px;
    color: #6b7280;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .excel-modal-close:hover {
    background-color: #2c2c2c;
    color: #FF335F;
  }

  .excel-modal-body {
    padding: 20px 24px;
    overflow-y: auto;
    flex: 1;
    background-color: #1E1E1E;
  }

  .excel-modal-subtitle {
    color: #aaa;
    margin: 0 0 16px 0;
    font-size: 14px;
  }

  .excel-entries-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid #333;
    border-radius: 6px;
    overflow: hidden;
  }

  .excel-entry {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #333;
    transition: background-color 0.2s ease;
    background-color: #252525;
    cursor: pointer;
  }

  .excel-entry:last-child {
    border-bottom: none;
  }

  .excel-entry:hover {
    background-color: #2a2a2a;
  }

  .excel-entry.selected {
    background-color: rgba(255, 51, 95, 0.1);
    border-left: 3px solid #FF335F;
  }

  .excel-entry-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #555;
    border-radius: 3px;
    margin-right: 16px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s;
  }

  .excel-entry-checkbox:checked {
    background-color: #FF335F;
    border-color: #FF335F;
  }

  .excel-entry-checkbox:checked::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .excel-entry-details {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    flex: 1;
  }

  .excel-entry-field {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 150px;
  }

  .excel-entry-label {
    font-size: 12px;
    font-weight: 500;
    color: #777;
    margin-bottom: 4px;
  }

  .excel-entry-value {
    font-size: 14px;
    color: #f1f1f1;
    font-weight: 500;
  }

  .excel-modal-footer {
    padding: 16px 24px;
    border-top: 1px solid #2c2c2c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1a1a1a;
  }

  .excel-modal-counter {
    font-size: 14px;
    color: #aaa;
  }

  .excel-modal-counter strong {
    color: #f1f1f1;
  }

  .excel-modal-actions {
    display: flex;
    gap: 12px;
  }

  .excel-modal-button {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .excel-modal-button.cancel {
    background-color: transparent;
    color: #f1f1f1;
    border: 1px solid #333;
  }

  .excel-modal-button.cancel:hover {
    background-color: #2a2a2a;
  }

  .excel-modal-button.confirm {
    background-color: #FF335F;
    color: white;
    border: 1px solid #FF335F;
  }

  .excel-modal-button.confirm:hover {
    background-color: #e62e56;
  }

  .excel-modal-button.confirm:disabled {
    background-color: rgba(255, 51, 95, 0.5);
    border-color: rgba(255, 51, 95, 0.5);
    cursor: not-allowed;
  }

  .excel-modal-button-icon {
    width: 18px;
    height: 18px;
  }

  /* Loaded entries pills styles */
  .loaded-entries-header {
    margin: 0 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #2c2c2c;
    font-size: 16px;
    font-weight: 600;
    color: #f1f1f1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .loaded-entries-header svg {
    width: 18px;
    height: 18px;
    color: #FF335F;
  }

  .loaded-entries-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  .entry-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background-color: #252525;
    border: 1px solid #333;
    border-radius: 20px;
    font-size: 13px;
    color: #f1f1f1;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .entry-pill:hover {
    background-color: #2a2a2a;
    border-color: #FF335F;
  }

  .entry-pill.active {
    background-color: rgba(255, 51, 95, 0.1);
    border-color: #FF335F;
  }

  .entry-pill-close {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: 10px;
    line-height: 1;
    color: #f1f1f1;
    transition: all 0.2s ease;
  }

  .entry-pill:hover .entry-pill-close {
    background-color: rgba(255, 51, 95, 0.2);
  }
`;

export default function PhoneNumbers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    companyName: "",
    industryType: "",
    designation: "",
    prompt: ""
  });
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [excelEntries, setExcelEntries] = useState<ExcelEntry[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
  const [loadedEntries, setLoadedEntries] = useState<ExcelEntry[]>([]); 
  const [activeEntryIndex, setActiveEntryIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSamplePromptClick = (promptContent: string) => {
    setFormData({
      ...formData,
      prompt: promptContent
    });
    
    // Scroll to the prompt textarea
    const promptTextarea = document.getElementById('prompt-textarea');
    if (promptTextarea) {
      promptTextarea.scrollIntoView({ behavior: 'smooth' });
      promptTextarea.focus();
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const result = await dispatchCall({
      phone_number: formData.phoneNumber,
      prompt: formData.prompt,
      name: formData.name
    });

    // console.log(import.meta.env.LIVEKIT_URL)

    console.log("Call dispatched:", result);

    // const room = new Room()
    // await room.connect("wss://zoomtest-gvgpc20k.livekit.cloud", result.)

    // await room.localParticipant.enableCameraAndMicrophone();

    // console.log(room.remoteParticipants.size)
    // let i = 0

    // while(room.remoteParticipants.size !== 0) {
    // while(true) {
    //   console.log(room.remoteParticipants)
    //   if(i > 90) {
    //     break
    //   }
    //   i++
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    // }

    // room.disconnect();

    // Reset form
    setFormData({
      phoneNumber: "",
      name: "",
      companyName: "",
      industryType: "",
      designation: "",
      prompt: ""
    });

  } catch (error) {
    console.error("Error dispatching call:", error);
    alert("Failed to start the call. Please try again.");
  }
};


  const handleExcelUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const result = event.target?.result;
          const workbook = XLSX.read(result, { type: 'binary' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet) as ExcelEntry[];
          
          if (data.length > 0) {
            if (data.length === 1) {
              // If there's only one entry, load it directly
              const entry = data[0];
              setFormData({
                phoneNumber: entry.phoneNumber || "",
                name: entry.name || "",
                companyName: entry.companyName || "",
                industryType: entry.industryType || "",
                designation: entry.designation || "",
                prompt: entry.prompt || ""
              });
              
              // Also add to loaded entries
              setLoadedEntries([entry]);
              setActiveEntryIndex(0);
              
              alert("Successfully loaded data from Excel.");
            } else {
              // If there are multiple entries, show selection modal
              setExcelEntries(data);
              setSelectedEntries([0]); // Select the first entry by default
              setShowExcelModal(true);
            }
          } else {
            alert("No data found in the Excel file");
          }
        } catch (error) {
          console.error("Error parsing Excel file:", error);
          alert("Error parsing Excel file. Please make sure it's in the correct format.");
        }
      };
      reader.onerror = (error) => {
        console.error("File reading error:", error);
        alert("Error reading file");
      };
      reader.readAsBinaryString(file);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadExcelTemplate = () => {
    // Create a workbook with a single worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelSampleData);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Phone Numbers");
    
    // Generate the Excel file as a binary string
    const excelBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    
    // Convert the binary string to a Blob
    const buffer = new ArrayBuffer(excelBinary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelBinary.length; i++) {
      view[i] = excelBinary.charCodeAt(i) & 0xFF;
    }
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    
    // Create a download link and trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phone_numbers_template.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const toggleEntrySelection = (index: number) => {
    setSelectedEntries(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleCloseModal = () => {
    setShowExcelModal(false);
    setExcelEntries([]);
    setSelectedEntries([]);
  };

  const handleConfirmSelections = () => {
    if (selectedEntries.length === 0) {
      alert("Please select at least one entry");
      return;
    }

    // Get all selected entries
    const selectedData = selectedEntries.map(index => excelEntries[index]);
    
    // Set the loaded entries
    setLoadedEntries(selectedData);
    
    // Set the active entry to the first one
    setActiveEntryIndex(0);
    
    // Fill the form with the first selected entry
    if (selectedData.length > 0) {
      const firstEntry = selectedData[0];
      setFormData({
        phoneNumber: firstEntry.phoneNumber || "",
        name: firstEntry.name || "",
        companyName: firstEntry.companyName || "",
        industryType: firstEntry.industryType || "",
        designation: firstEntry.designation || "",
        prompt: firstEntry.prompt || ""
      });
    }

    // Close the modal
    setShowExcelModal(false);
    
    // Display a success message
    const message = selectedData.length === 1 
      ? "Successfully loaded the selected entry."
      : `Successfully loaded ${selectedData.length} entries. Click on an entry pill to view its details.`;
    
    alert(message);
  };

  // New function to handle pill click
  const handlePillClick = (index: number) => {
    const entry = loadedEntries[index];
    setFormData({
      phoneNumber: entry.phoneNumber || "",
      name: entry.name || "",
      companyName: entry.companyName || "",
      industryType: entry.industryType || "",
      designation: entry.designation || "",
      prompt: entry.prompt || ""
    });
    setActiveEntryIndex(index);
  };

  // New function to remove an entry
  const removeEntry = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent pill click
    
    const newEntries = [...loadedEntries];
    newEntries.splice(index, 1);
    setLoadedEntries(newEntries);
    
    // If removing the active entry or the last entry
    if (activeEntryIndex === index || newEntries.length === 0) {
      if (newEntries.length > 0) {
        // Set to first entry if there are still entries
        const newActiveIndex = 0;
        setActiveEntryIndex(newActiveIndex);
        
        const nextEntry = newEntries[newActiveIndex];
        setFormData({
          phoneNumber: nextEntry.phoneNumber || "",
          name: nextEntry.name || "",
          companyName: nextEntry.companyName || "",
          industryType: nextEntry.industryType || "",
          designation: nextEntry.designation || "",
          prompt: nextEntry.prompt || ""
        });
      } else {
        // Clear the form if no entries left
        setActiveEntryIndex(null);
        setFormData({
          phoneNumber: "",
          name: "",
          companyName: "",
          industryType: "",
          designation: "",
          prompt: ""
        });
      }
    } else if (activeEntryIndex !== null && activeEntryIndex > index) {
      // Adjust active index if an entry before the active one was removed
      setActiveEntryIndex(activeEntryIndex - 1);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout pageTitle="Phone Numbers">
        <div className="phone-numbers-page">
          <div className="phone-numbers-content">
            <h1 className="phone-numbers-title">Configure Phone Number</h1>
            
            <div className="layout-container">
              <div className="form-container">
                <div className="form-header">
                  <svg className="form-header-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.3518 20.9581C3.31664 20.8902 2.62359 20.8562 2.1535 20.7726C1.87736 20.7186 1.54717 20.5689 1.33855 20.2451C1.13873 19.9369 1.09036 19.6022 1.07326 19.3049C1.02633 18.448 1.27317 17.5335 1.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12.7573 7.90306C13.1369 7.50858 13.1246 6.87985 12.73 6.50108C12.3355 6.1223 11.7068 6.13461 11.3273 6.52909L9.6273 8.31912C9.24774 8.71359 9.26004 9.34232 9.65462 9.7211C10.0492 10.0999 10.6779 10.0876 11.0573 9.69309L12.7573 7.90306Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12.7573 16.4339C13.1369 16.0394 13.1246 15.4107 12.73 15.0319C12.3355 14.6531 11.7068 14.6654 11.3273 15.0599L9.6273 16.8499C9.24774 17.2444 9.26004 17.8731 9.65462 18.2519C10.0492 18.6307 10.6779 18.6184 11.0573 18.2239L12.7573 16.4339Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9.5 12.2002H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16.5 9.2002L18.5 12.2002L16.5 15.2002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h2 className="form-title">Phone Number Details</h2>
                </div>
                
                <div className="form-body">
                  {loadedEntries.length > 0 && (
                    <>
                      <h3 className="loaded-entries-header">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M13 5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Loaded Entries ({loadedEntries.length})
                      </h3>
                      <div className="loaded-entries-pills">
                        {loadedEntries.map((entry, index) => (
                          <div 
                            key={index} 
                            className={`entry-pill ${activeEntryIndex === index ? 'active' : ''}`}
                            onClick={() => handlePillClick(index)}
                          >
                            {entry.name || `Entry ${index + 1}`}
                            <span 
                              className="entry-pill-close"
                              onClick={(e) => removeEntry(index, e)}
                            >×</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                          <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="form-input"
                            placeholder="Enter phone number (e.g., +1234567890)"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="companyName" className="form-label">Company Name</label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            className="form-input"
                            placeholder="Enter company name"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="industryType" className="form-label">Industry Type</label>
                          <select
                            id="industryType"
                            name="industryType"
                            className="form-select"
                            value={formData.industryType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="" disabled>Select industry type</option>
                            {industryTypes.map((type, index) => (
                              <option key={index} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="designation" className="form-label">Designation</label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          className="form-input"
                          placeholder="Enter designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="prompt" className="form-label">Prompt for LLM</label>
                        <textarea
                          id="prompt-textarea"
                          name="prompt"
                          className="form-textarea"
                          placeholder="Enter your prompt instructions for the AI..."
                          value={formData.prompt}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                      
                      <div className="form-actions">
                        <div className="excel-upload-container">
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            id="excel-upload" 
                            className="excel-upload-input" 
                            accept=".xlsx, .xls" 
                            onChange={handleExcelUpload}
                          />
                          <label htmlFor="excel-upload" className="form-button button-excel-upload">
                            <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            Load from Excel
                          </label>
                        </div>
                        <div className="form-actions-right">
                          {/* Cancel button commented out as requested */}
                          {/* <button type="button" className="form-button button-cancel">Cancel</button> */}
                          <button type="submit" className="form-button button-submit">
                            <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                              <path d="M10 16l-3-3 3-3"></path>
                              <path d="M17 16l-3-3 3-3"></path>
                            </svg>
                            Start Call
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="sample-prompts-section">
                <div className="sample-prompts-header">
                  <svg className="sample-prompts-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5 15.5V18.5C18.5 19.0523 18.0523 19.5 17.5 19.5H6.5C5.94772 19.5 5.5 19.0523 5.5 18.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8.5 15.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 11.4998L11.8308 5.56233C12.1925 5.24628 12.7616 5.25029 13.1185 5.57135L18.5 10.4998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M14.5 11.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <h3 className="sample-prompts-title">Sample Prompts</h3>
                </div>
                
                <div className="sample-prompts-body">
                  <p className="sample-prompts-description">
                    Click on any sample prompt below to automatically populate the Prompt for LLM field. These templates provide a starting point for your AI phone assistant configuration.
                  </p>
                  
                  <div className="sample-prompts-container">
                    {samplePrompts.map((prompt) => (
                      <div 
                        key={prompt.id} 
                        className="sample-prompt-card" 
                        onClick={() => handleSamplePromptClick(prompt.content)}
                      >
                        <h4 className="sample-prompt-title">
                          <svg className="sample-prompt-type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 8.5L15.6716 8.32843C15.2909 7.94774 14.7091 7.94774 14.3284 8.32843L14.5 8.5H15.5ZM20.5 13.5L20.6716 13.6716C21.0621 13.281 21.0621 12.719 20.6716 12.3284L20.5 13.5ZM14.5 18.5L14.3284 18.6716C14.7091 19.0523 15.2909 19.0523 15.6716 18.6716L14.5 18.5ZM9.5 13.5L9.32843 13.3284C8.93774 13.7091 8.93774 14.2909 9.32843 14.6716L9.5 13.5ZM20 16.5V16.5L19.5 16.5C19.5 16.7761 19.7239 17 20 17V16.5ZM21 16.5V16C20.7239 16 20.5 16.2239 20.5 16.5H21ZM15.3284 8.67157L20.3284 13.6716L20.6716 13.3284L15.6716 8.32843L15.3284 8.67157ZM20.3284 13.3284L15.3284 18.3284L15.6716 18.6716L20.6716 13.6716L20.3284 13.3284ZM14.6716 18.3284L9.67157 13.3284L9.32843 13.6716L14.3284 18.6716L14.6716 18.3284ZM9.67157 13.6716L14.6716 8.67157L14.3284 8.32843L9.32843 13.3284L9.67157 13.6716ZM4 8C4 5.79086 5.79086 4 8 4V3C5.23858 3 3 5.23858 3 8H4ZM4 12V8H3V12H4ZM8 16C5.79086 16 4 14.2091 4 12H3C3 14.7614 5.23858 17 8 17V16ZM19.5 15V16.5H20.5V15H19.5ZM20.5 17H21.5V16H20.5V17ZM21.5 17C22.3284 17 23 16.3284 23 15.5H22C22 15.7761 21.7761 16 21.5 16V17ZM20.5 15.5C20.5 16.3284 21.1716 17 22 17V16C21.7239 16 21.5 15.7761 21.5 15.5H20.5Z" fill="currentColor"/>
                          </svg>
                          {prompt.title}
                        </h4>
                        <p className="sample-prompt-content">{prompt.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="excel-template-section">
                <h3 className="excel-template-title">
                  <svg className="excel-template-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Excel Template Format
                </h3>
                <div className="excel-template-container">
                  <table className="excel-table">
                    <thead>
                      <tr>
                        <th>phoneNumber</th>
                        <th>name</th>
                        <th>companyName</th>
                        <th>industryType</th>
                        <th>designation</th>
                        <th>prompt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>+1234567890</td>
                        <td>John Doe</td>
                        <td>Acme Corp</td>
                        <td>Technology</td>
                        <td>Sales Manager</td>
                        <td>You are a helpful customer service representative...</td>
                      </tr>
                      <tr>
                        <td>+0987654321</td>
                        <td>Jane Smith</td>
                        <td>XYZ Inc</td>
                        <td>Healthcare</td>
                        <td>Operations Director</td>
                        <td>You are a technical support specialist...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); downloadExcelTemplate(); }} className="excel-download-link">
                  <svg className="excel-download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Excel Template
                </a>
              </div>
              
              
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Excel Entries Selection Modal */}
      <div className={`excel-modal-overlay ${showExcelModal ? 'open' : ''}`}>
        <div className="excel-modal">
          <div className="excel-modal-header">
            <h3 className="excel-modal-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Multiple Entries Found
            </h3>
            <button className="excel-modal-close" onClick={handleCloseModal}>&times;</button>
          </div>
          <div className="excel-modal-body">
            <p className="excel-modal-subtitle">
              Select the entries you want to load from the Excel file. You can select multiple entries to process them in batch.
            </p>
            <div className="excel-entries-list">
              {excelEntries.map((entry, index) => (
                <div
                  key={index}
                  className={`excel-entry ${selectedEntries.includes(index) ? 'selected' : ''}`}
                  onClick={() => toggleEntrySelection(index)}
                >
                  <input
                    type="checkbox"
                    className="excel-entry-checkbox"
                    checked={selectedEntries.includes(index)}
                    onChange={() => {}} // Handled by the div click
                  />
                  <div className="excel-entry-details">
                    <div className="excel-entry-field">
                      <div className="excel-entry-label">Phone Number</div>
                      <div className="excel-entry-value">{entry.phoneNumber}</div>
                    </div>
                    <div className="excel-entry-field">
                      <div className="excel-entry-label">Name</div>
                      <div className="excel-entry-value">{entry.name}</div>
                    </div>
                    <div className="excel-entry-field">
                      <div className="excel-entry-label">Company</div>
                      <div className="excel-entry-value">{entry.companyName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="excel-modal-footer">
            <div className="excel-modal-counter">
              <strong>{selectedEntries.length}</strong> out of <strong>{excelEntries.length}</strong> entries selected
            </div>
            <div className="excel-modal-actions">
              <button className="excel-modal-button cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button 
                className="excel-modal-button confirm" 
                onClick={handleConfirmSelections}
                disabled={selectedEntries.length === 0}
              >
                <svg className="excel-modal-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Load Selected
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Include the styles */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </ProtectedRoute>
  );
} 