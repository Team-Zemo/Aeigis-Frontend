import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChartRenderer from '../../components/ChartRenderer';
import {
  FiShield,
  FiUsers,
  FiAlertTriangle,
  FiActivity,
  FiBarChart2,
  FiPieChart,
  FiGrid,
  FiDownload,
  FiEye,
  FiEyeOff,
  FiTrendingUp,
  FiClock,
  FiTarget,
  FiChevronDown,
  FiCheck,
  FiSettings
} from 'react-icons/fi';
import * as XLSX from 'xlsx';

// AI Misuse Detection Sample Data
const aiMisuseData = {
  // Monthly misuse trends for all employees
  monthlyMisuse: [
    { month: 'Jan', violations: 45, severity: 'Medium', prevented: 38 },
    { month: 'Feb', violations: 52, severity: 'High', prevented: 45 },
    { month: 'Mar', violations: 38, severity: 'Low', prevented: 35 },
    { month: 'Apr', violations: 67, severity: 'High', prevented: 58 },
    { month: 'May', violations: 41, severity: 'Medium', prevented: 39 },
    { month: 'Jun', violations: 29, severity: 'Low', prevented: 27 }
  ],

  // Per employee misuse data
  employeeMisuse: [
    { id: 'emp_001', name: 'John Smith', department: 'Engineering', violations: 12, riskLevel: 'High', lastIncident: '2025-08-23' },
    { id: 'emp_002', name: 'Sarah Johnson', department: 'Marketing', violations: 8, riskLevel: 'Medium', lastIncident: '2025-08-22' },
    { id: 'emp_003', name: 'Mike Davis', department: 'Sales', violations: 15, riskLevel: 'Critical', lastIncident: '2025-08-24' },
    { id: 'emp_004', name: 'Emily Chen', department: 'HR', violations: 3, riskLevel: 'Low', lastIncident: '2025-08-20' },
    { id: 'emp_005', name: 'David Wilson', department: 'Finance', violations: 6, riskLevel: 'Medium', lastIncident: '2025-08-21' },
    { id: 'emp_006', name: 'Lisa Brown', department: 'Engineering', violations: 18, riskLevel: 'Critical', lastIncident: '2025-08-24' }
  ],

  // Violation types distribution
  violationTypes: [
    { id: 'unauthorized_access', label: 'Unauthorized AI Access', value: 35, color: '#ef4444' },
    { id: 'data_misuse', label: 'Data Misuse', value: 28, color: '#f97316' },
    { id: 'policy_violation', label: 'Policy Violations', value: 22, color: '#eab308' },
    { id: 'prompt_injection', label: 'Prompt Injection', value: 15, color: '#8b5cf6' }
  ],

  // Real-time threat levels
  threatLevels: [
    { time: '00:00', critical: 2, high: 5, medium: 8, low: 12 },
    { time: '04:00', critical: 1, high: 3, medium: 6, low: 15 },
    { time: '08:00', critical: 4, high: 8, medium: 12, low: 18 },
    { time: '12:00', critical: 6, high: 12, medium: 15, low: 22 },
    { time: '16:00', critical: 3, high: 9, medium: 14, low: 20 },
    { time: '20:00', critical: 2, high: 6, medium: 10, low: 16 }
  ],

  // Department risk analysis
  departmentRisk: [
    { department: 'Engineering', riskScore: 85, incidents: 45, employees: 120 },
    { department: 'Marketing', riskScore: 62, incidents: 28, employees: 85 },
    { department: 'Sales', riskScore: 71, incidents: 35, employees: 95 },
    { department: 'HR', riskScore: 43, incidents: 18, employees: 45 },
    { department: 'Finance', riskScore: 55, incidents: 22, employees: 65 }
  ],

  // AI model usage patterns
  modelUsage: [
    { model: 'GPT-4', usage: 45, misuse: 12, efficiency: 85 },
    { model: 'Claude', usage: 32, misuse: 8, efficiency: 92 },
    { model: 'Gemini', usage: 28, misuse: 15, efficiency: 78 },
    { model: 'Llama', usage: 22, misuse: 6, efficiency: 88 },
    { model: 'Custom AI', usage: 18, misuse: 9, efficiency: 75 }
  ]
};

const chartConfigs = [
  {
    id: 'monthly_trends',
    title: 'Monthly AI Misuse Trends',
    type: 'line',
    data: aiMisuseData.monthlyMisuse.map(item => ({
      id: 'violations',
      data: aiMisuseData.monthlyMisuse.map(d => ({ x: d.month, y: d.violations }))
    })),
    icon: FiTrendingUp,
    description: 'Track monthly violation patterns across the organization'
  },
  {
    id: 'employee_violations',
    title: 'Employee Violation Distribution',
    type: 'bar',
    data: aiMisuseData.employeeMisuse.map(emp => ({
      id: emp.name,
      value: emp.violations,
      department: emp.department,
      riskLevel: emp.riskLevel
    })),
    icon: FiUsers,
    description: 'Individual employee violation counts and risk levels'
  },
  {
    id: 'violation_types',
    title: 'Violation Types Breakdown',
    type: 'pie',
    data: aiMisuseData.violationTypes,
    icon: FiPieChart,
    description: 'Distribution of different types of AI misuse violations'
  },
  {
    id: 'threat_levels',
    title: 'Real-time Threat Monitoring',
    type: 'stream',
    data: aiMisuseData.threatLevels,
    icon: FiActivity,
    description: '24-hour threat level monitoring and incident tracking'
  },
  {
    id: 'department_risk',
    title: 'Department Risk Analysis',
    type: 'radar',
    data: aiMisuseData.departmentRisk.map(dept => ({
      metric: dept.department,
      value: dept.riskScore
    })),
    icon: FiTarget,
    description: 'Risk assessment across different organizational departments'
  },
  {
    id: 'model_usage',
    title: 'AI Model Usage & Misuse',
    type: 'bar',
    data: aiMisuseData.modelUsage.map(model => ({
      id: model.model,
      usage: model.usage,
      misuse: model.misuse,
      efficiency: model.efficiency
    })),
    icon: FiGrid,
    description: 'Usage patterns and misuse rates for different AI models'
  }
];

const StatCard = ({ icon: Icon, title, value, change, color, status, isAnimating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-all duration-300"
  >
    {isAnimating && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"
        animate={{ x: [-100, 400] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    )}
    <div className="flex items-center justify-between relative z-10">
      <div className="flex-1">
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
        <div className="flex items-center gap-2">
          <p className={`text-sm font-medium ${change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </p>
          {status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === 'Critical' ? 'bg-red-50 text-red-600' :
              status === 'High' ? 'bg-orange-50 text-orange-600' :
              status === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
              'bg-green-50 text-green-600'
            }`}>
              {status}
            </span>
          )}
        </div>
      </div>
      <motion.div
        className={`p-4 rounded-xl ${color} relative`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
    </div>
  </motion.div>
);

const ChartCard = ({ chart, isVisible, onToggle }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-xl">
              <chart.icon className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
              <p className="text-sm text-gray-500">{chart.description}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(chart.id)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
          >
            <FiEyeOff className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.div
          className="h-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ChartRenderer type={chart.type} data={chart.data} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Chart Dropdown Component
const ChartDropdown = ({ visibleCharts, onToggleChart, onToggleAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleCount = Object.values(visibleCharts).filter(Boolean).length;
  const totalCharts = chartConfigs.length;
  const allVisible = visibleCount === totalCharts;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors min-w-[180px] shadow-sm"
      >
        <FiSettings className="w-4 h-4" />
        <span className="flex-1 text-left text-sm font-medium">
          Charts ({visibleCount}/{totalCharts})
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-semibold flex items-center gap-2 text-sm">
                  <FiGrid className="w-4 h-4" />
                  Chart Visibility
                </h3>
                <motion.button
                  onClick={onToggleAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    allVisible
                      ? 'bg-red-50 hover:bg-red-100 text-red-600'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                  }`}
                >
                  {allVisible ? 'Hide All' : 'Show All'}
                </motion.button>
              </div>
            </div>

            {/* Chart List */}
            <div className="max-h-80 overflow-y-auto">
              {chartConfigs.map((chart, index) => (
                <motion.div
                  key={chart.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <motion.button
                    onClick={() => onToggleChart(chart.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center gap-3 text-left"
                  >
                    {/* Checkbox */}
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      visibleCharts[chart.id]
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      {visibleCharts[chart.id] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiCheck className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Chart Icon */}
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <chart.icon className="w-3.5 h-3.5 text-gray-600" />
                    </div>

                    {/* Chart Info */}
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-medium text-sm">{chart.title}</h4>
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{chart.description}</p>
                    </div>

                    {/* Status Indicator */}
                    <div className={`w-2 h-2 rounded-full ${
                      visibleCharts[chart.id] ? 'bg-green-400' : 'bg-gray-300'
                    }`} />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Showing {visibleCount} of {totalCharts} charts</span>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Done
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DashBoard = () => {
  const [visibleCharts, setVisibleCharts] = useState(
    chartConfigs.reduce((acc, chart) => ({ ...acc, [chart.id]: true }), {})
  );
  const [realTimeData, setRealTimeData] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (realTimeData) {
      const interval = setInterval(() => {
        // Simulate data updates
        setTimeout(() => {}, 1000);
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [realTimeData]);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const toggleChart = (chartId) => {
    setVisibleCharts(prev => ({
      ...prev,
      [chartId]: !prev[chartId]
    }));
  };

  const toggleAllCharts = () => {
    const allVisible = Object.values(visibleCharts).every(visible => visible);
    const newState = chartConfigs.reduce((acc, chart) => ({
      ...acc,
      [chart.id]: !allVisible
    }), {});
    setVisibleCharts(newState);
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Employee violations sheet
    const employeeData = aiMisuseData.employeeMisuse.map(emp => ({
      'Employee ID': emp.id,
      'Name': emp.name,
      'Department': emp.department,
      'Violations': emp.violations,
      'Risk Level': emp.riskLevel,
      'Last Incident': emp.lastIncident
    }));

    // Monthly trends sheet
    const monthlyData = aiMisuseData.monthlyMisuse.map(item => ({
      'Month': item.month,
      'Violations': item.violations,
      'Severity': item.severity,
      'Prevented': item.prevented
    }));

    // Department risk sheet
    const departmentData = aiMisuseData.departmentRisk.map(dept => ({
      'Department': dept.department,
      'Risk Score': dept.riskScore,
      'Incidents': dept.incidents,
      'Employees': dept.employees
    }));

    const employeeSheet = XLSX.utils.json_to_sheet(employeeData);
    const monthlySheet = XLSX.utils.json_to_sheet(monthlyData);
    const departmentSheet = XLSX.utils.json_to_sheet(departmentData);

    XLSX.utils.book_append_sheet(workbook, employeeSheet, 'Employee Violations');
    XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Monthly Trends');
    XLSX.utils.book_append_sheet(workbook, departmentSheet, 'Department Risk');

    XLSX.writeFile(workbook, `AI_Misuse_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const stats = [
    {
      icon: FiAlertTriangle,
      title: 'Active Threats',
      value: '23',
      change: 15.2,
      color: 'bg-red-500',
      status: 'Critical',
      isAnimating: true
    },
    {
      icon: FiShield,
      title: 'Threats Prevented',
      value: '1,847',
      change: -8.5,
      color: 'bg-emerald-500',
      status: 'Good'
    },
    {
      icon: FiUsers,
      title: 'At-Risk Employees',
      value: '156',
      change: 5.1,
      color: 'bg-amber-500',
      status: 'Medium'
    },
    {
      icon: FiActivity,
      title: 'System Health',
      value: '98.2%',
      change: -0.8,
      color: 'bg-blue-500',
      status: 'Excellent'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              🛡️ AI Misuse Detection
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Real-time monitoring and mitigation across your organization
            </motion.p>
            <div className="flex items-center gap-2 mt-3">
              <div className={`w-2 h-2 rounded-full ${realTimeData ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              <span className="text-sm text-gray-500 font-medium">
                {realTimeData ? 'Live Monitoring' : 'Monitoring Offline'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-6 lg:mt-0 flex-wrap">
            <motion.button
              onClick={exportToExcel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
            >
              <FiDownload className="w-4 h-4" />
              Export Data
            </motion.button>

            <ChartDropdown
              visibleCharts={visibleCharts}
              onToggleChart={toggleChart}
              onToggleAll={toggleAllCharts}
            />

            <motion.button
              onClick={() => setRealTimeData(!realTimeData)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors shadow-sm ${
                realTimeData 
                  ? 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <FiClock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {realTimeData ? 'Live' : 'Paused'}
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={`stat-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chartConfigs.map((chart, index) => (
            <motion.div
              key={chart.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08 }}
            >
              <ChartCard
                chart={chart}
                isVisible={visibleCharts[chart.id]}
                onToggle={toggleChart}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-3">
              Last updated: {new Date().toLocaleString()}
            </p>
            <div className="flex justify-center items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                System Operational
              </span>
              <span className="flex items-center gap-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                {aiMisuseData.employeeMisuse.length} Employees Monitored
              </span>
              <span className="flex items-center gap-2 text-purple-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                AI Protection Active
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashBoard;
