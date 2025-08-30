import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

function Policies() {
  const { 
    policies, 
    loading, 
    error, 
    successMessage, 
    createPolicies, 
    fetchPolicies,
    clearMessages 
  } = useAuthStore();

  const [newPolicy, setNewPolicy] = useState('');
  const [policyList, setPolicyList] = useState([]);
  const [isAddingMode, setIsAddingMode] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  useEffect(() => {
    if (policies && Array.isArray(policies)) {
      setPolicyList([...policies]);
    } else {
      setPolicyList([]);
    }
  }, [policies]);

  const handleAddPolicy = () => {
    if (newPolicy.trim()) {
      setPolicyList([...policyList, newPolicy.trim()]);
      setNewPolicy('');
    }
  };

  const handleRemovePolicy = (index) => {
    setPolicyList(policyList.filter((_, i) => i !== index));
  };

  const handleSavePolicies = async () => {
    if (policyList.length > 0) {
      const success = await createPolicies(policyList);
      if (success) {
        setIsAddingMode(false);
        setPolicyList([]);
      }
    }
  };

  const handleCancel = () => {
    setIsAddingMode(false);
    setPolicyList(policies && Array.isArray(policies) ? [...policies] : []);
    setNewPolicy('');
    clearMessages();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPolicy();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Company Policies</h1>
              <p className="text-gray-600 mt-1">Manage and update your organization's policies</p>
            </div>
            {!isAddingMode && (
              <button
                onClick={() => setIsAddingMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Policies
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {isAddingMode ? (
            // Add Policies Mode
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Add New Policies</h3>
                <p className="text-blue-700 text-sm">Enter your policies one by one. Each policy will be added to the list below.</p>
              </div>

              {/* Add Policy Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newPolicy}
                  onChange={(e) => setNewPolicy(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a new policy..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <button
                  onClick={handleAddPolicy}
                  disabled={!newPolicy.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Add
                </button>
              </div>

              {/* Policy List */}
              {policyList.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Policies to be saved:</h4>
                  <div className="space-y-2">
                    {policyList.map((policy, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                        <span className="text-gray-800">{index + 1}. {policy}</span>
                        <button
                          onClick={() => handleRemovePolicy(index)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleSavePolicies}
                  disabled={policyList.length === 0 || loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  {loading && (
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  Save Policies ({policyList.length})
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Policies Mode
            <div>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-600">Loading policies...</span>
                  </div>
                </div>
              ) : policies && policies.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Policies</h3>
                  <div className="grid gap-3">
                    {policies.map((policy, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start gap-3">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                            {index + 1}
                          </span>
                          <p className="text-gray-800 flex-1">{policy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
                  <p className="text-gray-600 mb-6">Get started by creating your first company policy.</p>
                  <button
                    onClick={() => setIsAddingMode(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Create First Policy
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Policies;