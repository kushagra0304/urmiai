import { useState, useEffect } from 'react';
import { FiCalendar, FiFilter, FiDownload, FiChevronDown, FiSearch, FiPhone, FiClock } from 'react-icons/fi';

// Define the Call type
interface Call {
  id: string;
  date: string;
  phone: string;
  assistant: string;
  duration: string;
  status: string;
  reason: string;
  cost: string;
}

const CallLogs = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Mock data for demo purposes
  useEffect(() => {
    // In a real app, this would be an API call
    const mockCalls: Call[] = [
      {
        id: '1',
        date: '2023-05-01 14:30',
        phone: '+1 (555) 123-4567',
        assistant: 'Mary',
        duration: '3m 45s',
        status: 'Completed',
        reason: 'Customer ended call',
        cost: '$0.75'
      },
      {
        id: '2',
        date: '2023-05-01 15:22',
        phone: '+1 (555) 987-6543',
        assistant: 'Alex',
        duration: '2m 10s',
        status: 'Completed',
        reason: 'Customer ended call',
        cost: '$0.43'
      },
      {
        id: '3',
        date: '2023-05-02 09:15',
        phone: '+1 (555) 456-7890',
        assistant: 'Robin',
        duration: '1m 30s',
        status: 'Failed',
        reason: 'Silence timed out',
        cost: '$0.30'
      },
      {
        id: '4',
        date: '2023-05-02 11:45',
        phone: '+1 (555) 234-5678',
        assistant: 'Mary',
        duration: '5m 15s',
        status: 'Completed',
        reason: 'Customer ended call',
        cost: '$1.05'
      },
      {
        id: '5',
        date: '2023-05-03 13:20',
        phone: '+1 (555) 345-6789',
        assistant: 'Alex',
        duration: '0m 45s',
        status: 'Failed',
        reason: 'Customer did not answer',
        cost: '$0.15'
      },
      {
        id: '6',
        date: '2023-05-03 16:10',
        phone: '+1 (555) 567-8901',
        assistant: 'Robin',
        duration: '4m 20s',
        status: 'Completed',
        reason: 'Customer ended call',
        cost: '$0.87'
      },
      {
        id: '7',
        date: '2023-05-04 10:30',
        phone: '+1 (555) 678-9012',
        assistant: 'Mary',
        duration: '2m 55s',
        status: 'Completed',
        reason: 'Customer ended call',
        cost: '$0.59'
      },
      {
        id: '8',
        date: '2023-05-04 14:45',
        phone: '+1 (555) 789-0123',
        assistant: 'Alex',
        duration: '1m 15s',
        status: 'Failed',
        reason: 'Silence timed out',
        cost: '$0.25'
      }
    ];
    
    setTimeout(() => {
      setCalls(mockCalls);
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);
  
  // Filter calls based on search term and status
  const filteredCalls = calls.filter(call => {
    const matchesSearch = 
      call.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.assistant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || call.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Call Logs</h1>
          <p className="mt-2 text-sm text-gray-600">View and analyze your recent call history</p>
        </div>
        
        {/* Filters and actions */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative inline-block">
              <button className="py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FiCalendar className="mr-2 h-4 w-4 text-gray-500" />
                {dateRange}
                <FiChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
            
            <div className="relative inline-block">
              <button className="py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FiFilter className="mr-2 h-4 w-4 text-gray-500" />
                Status: {statusFilter}
                <FiChevronDown className="ml-2 h-4 w-4" />
              </button>
              <div className="hidden absolute z-10 mt-1 w-48 bg-white shadow-lg rounded-md py-1">
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setStatusFilter('All')}
                >
                  All
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setStatusFilter('Completed')}
                >
                  Completed
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setStatusFilter('Failed')}
                >
                  Failed
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 pr-3"
                placeholder="Search calls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FiDownload className="mr-2 h-4 w-4 text-gray-500" />
              Export
            </button>
          </div>
        </div>
        
        {/* Call logs table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading call logs...
                  </td>
                </tr>
              ) : filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No call logs found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                      <FiPhone className="mr-2 h-4 w-4 text-gray-500" />
                      {call.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.assistant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                      <FiClock className="mr-2 h-4 w-4 text-gray-500" />
                      {call.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        call.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.cost}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="mt-5 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCalls.length}</span> of{' '}
            <span className="font-medium">{calls.length}</span> results
          </div>
          <div className="flex-1 flex justify-end">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLogs; 