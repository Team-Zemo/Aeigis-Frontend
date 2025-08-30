import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';

function EmployeeDetails() {
  const { employees, loading, error, fetchEmployees, fetchEmployeeAnalytics, selectedEmployeeAnalytics, clearSelectedEmployeeAnalytics } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleViewDetails = async (email) => {
    setModalLoading(true);
    setShowModal(true);
    const success = await fetchEmployeeAnalytics(email);
    setModalLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    clearSelectedEmployeeAnalytics();
  };

  // Filter and sort employees
  const filteredEmployees = employees
    .filter(emp => 
      emp.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.employee.name.localeCompare(b.employee.name);
        case 'email':
          return a.employee.email.localeCompare(b.employee.email);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
          <button 
            onClick={fetchEmployees}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Details</h1>
          <p className="text-gray-600">Manage and view your team members</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => emp.employee.active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified Employees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => emp.employee.emailVerified).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="date">Join Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employee Cards */}
        {filteredEmployees.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by inviting your first employee.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employeeData) => (
              <div key={employeeData.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Employee Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {employeeData.employee.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">{employeeData.employee.name}</h3>
                        <p className="text-sm text-gray-500">Employee</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {employeeData.employee.active ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Employee Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{employeeData.employee.email}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 11-4 0 2 2 0 014 0zM8 7h8m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <span>Joined {formatDate(employeeData.createdAt)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Email {employeeData.employee.emailVerified ? 'Verified' : 'Unverified'}</span>
                      </div>
                      {employeeData.employee.emailVerified ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-600">✗</span>
                      )}
                    </div>
                  </div>

                  {/* Admin Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Managed by: <span className="font-medium">{employeeData.admin.name}</span>
                      </p>
                      <button
                        onClick={() => handleViewDetails(employeeData.employee.email)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Employee Details Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Employee Analytics</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {modalLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="ml-3 text-gray-600">Loading employee analytics...</p>
                  </div>
                ) : selectedEmployeeAnalytics ? (
                  <div className="space-y-6">
                    {/* Employee Info */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                        {selectedEmployeeAnalytics.employeeName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{selectedEmployeeAnalytics.employeeName}</h3>
                        <p className="text-gray-600">{selectedEmployeeAnalytics.employeeEmail}</p>
                        <p className="text-sm text-gray-500">
                          Last Query: {selectedEmployeeAnalytics.lastQueryDate === "Never" ? "Never" : formatDate(selectedEmployeeAnalytics.lastQueryDate)}
                        </p>
                      </div>
                    </div>

                    {/* Query Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{selectedEmployeeAnalytics.totalQueries}</p>
                        <p className="text-sm text-gray-600">Total Queries</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{selectedEmployeeAnalytics.safeQueries}</p>
                        <p className="text-sm text-gray-600">Safe Queries</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-600">{selectedEmployeeAnalytics.warningQueries}</p>
                        <p className="text-sm text-gray-600">Warning Queries</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-red-600">{selectedEmployeeAnalytics.severeQueries}</p>
                        <p className="text-sm text-gray-600">Severe Queries</p>
                      </div>
                    </div>

                    {/* Percentage Breakdown */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900">Query Distribution</h4>
                      
                      {/* Safe Queries */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Safe Queries</span>
                          <span className="text-sm text-gray-600">{selectedEmployeeAnalytics.safePercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedEmployeeAnalytics.safePercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Warning Queries */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Warning Queries</span>
                          <span className="text-sm text-gray-600">{selectedEmployeeAnalytics.warningPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedEmployeeAnalytics.warningPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Severe Queries */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Severe Queries</span>
                          <span className="text-sm text-gray-600">{selectedEmployeeAnalytics.severePercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedEmployeeAnalytics.severePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Failed to load employee analytics</p>
                    <button
                      onClick={closeModal}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetails;
