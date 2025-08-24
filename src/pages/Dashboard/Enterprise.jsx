import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChartRenderer from '../../components/ChartRenderer';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

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

// StatCard Component
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

// ChartCard Component
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
const ChartDropdown = ({ visibleCharts, onToggleChart, onToggleAll, chartConfigs }) => {
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

const Enterprise = () => {
  const [realTimeData, setRealTimeData] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(true);
  
  // Add analytics state management
  const { analytics, fetchAnalytics, loading, error, logout, initializeAuth, user } = useAuthStore();

  // Fetch analytics data on component mount
  useEffect(() => {
    initializeAuth();
    const fetchData = async () => {
      const result = await fetchAnalytics();
      if (!result) {
        setApiAvailable(false);
      }
    };
    fetchData();
  }, []);

  // Auto-refresh analytics data
  useEffect(() => {
    if (realTimeData && apiAvailable) {
      const interval = setInterval(() => {
        fetchAnalytics();
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [realTimeData, apiAvailable]);

  // Create dynamic chart configs based on real data
  const chartConfigs = analytics ? [
    {
      id: 'daily_trends',
      title: 'Daily Query Trends',
      type: 'line',
      data: [
        {
          id: 'daily_queries',
          data: Object.entries(analytics.dailyQueryCounts || {}).map(([date, count]) => ({ x: date, y: count }))
        }
      ],
      icon: FiTrendingUp,
      description: 'Track daily query patterns across the organization'
    },
    {
      id: 'employee_analytics',
      title: 'Employee Query Distribution',
      type: 'bar',
      data: (analytics.employeeAnalytics || []).map(emp => ({
        id: emp.employeeName,
        value: emp.totalQueries,
        safeQueries: emp.safeQueries,
        warningQueries: emp.warningQueries,
        severeQueries: emp.severeQueries
      })),
      icon: FiUsers,
      description: 'Individual employee query counts and safety levels'
    },
    {
      id: 'query_safety',
      title: 'Query Safety Breakdown',
      type: 'pie',
      data: analytics.overallStats ? [
        { id: 'safe', label: 'Safe Queries', value: analytics.overallStats.safeQueries, color: '#10b981' },
        { id: 'warning', label: 'Warning Queries', value: analytics.overallStats.warningQueries, color: '#f59e0b' },
        { id: 'severe', label: 'Severe Queries', value: analytics.overallStats.severeQueries, color: '#ef4444' }
      ] : [],
      icon: FiPieChart,
      description: 'Distribution of query safety levels'
    },
    {
      id: 'weekly_trends',
      title: 'Weekly Query Monitoring',
      type: 'bar',
      data: Object.entries(analytics.weeklyQueryCounts || {}).map(([week, count]) => ({
        id: week,
        value: count
      })),
      icon: FiActivity,
      description: 'Weekly query volume tracking'
    },
    {
      id: 'monthly_trends',
      title: 'Monthly Query Analysis',
      type: 'line',
      data: [
        {
          id: 'monthly_queries',
          data: Object.entries(analytics.monthlyQueryCounts || {}).map(([month, count]) => ({ x: month, y: count }))
        }
      ],
      icon: FiBarChart2,
      description: 'Monthly query volume and trend analysis'
    }
  ] : [];

  // Initialize visibleCharts state after chartConfigs is defined
  const [visibleCharts, setVisibleCharts] = useState(
    chartConfigs.reduce((acc, chart) => ({ ...acc, [chart.id]: true }), {})
  );

  // Update visibleCharts when chartConfigs changes
  useEffect(() => {
    if (chartConfigs.length > 0) {
      setVisibleCharts(prev => {
        const newState = chartConfigs.reduce((acc, chart) => ({ 
          ...acc, 
          [chart.id]: prev[chart.id] !== undefined ? prev[chart.id] : true 
        }), {});
        return newState;
      });
    }
  }, [analytics]);

  // Update stats to use real data
  const stats = analytics ? [
    {
      icon: FiAlertTriangle,
      title: 'Severe Queries',
      value: analytics.overallStats.severeQueries.toString(),
      change: analytics.overallStats.severePercentage || 0,
      color: 'bg-red-500',
      status: analytics.overallStats.severeQueries > 10 ? 'Critical' : analytics.overallStats.severeQueries > 5 ? 'High' : 'Low',
      isAnimating: analytics.overallStats.severeQueries > 0
    },
    {
      icon: FiShield,
      title: 'Safe Queries',
      value: analytics.overallStats.safeQueries.toString(),
      change: analytics.overallStats.safePercentage || 0,
      color: 'bg-emerald-500',
      status: 'Good'
    },
    {
      icon: FiUsers,
      title: 'Total Employees',
      value: analytics.overallStats.totalEmployees.toString(),
      change: 0,
      color: 'bg-blue-500',
      status: 'Active'
    },
    {
      icon: FiActivity,
      title: 'Total Queries',
      value: analytics.overallStats.totalQueries.toString(),
      change: 0,
      color: 'bg-purple-500',
      status: 'Monitoring'
    }
  ] : [];

  const handleRefresh = async () => {
    const result = await fetchAnalytics();
    if (!result) {
      setApiAvailable(false);
    } else {
      setApiAvailable(true);
    }
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
    if (!analytics) return;

    const workbook = XLSX.utils.book_new();

    // Employee analytics sheet
    const employeeData = (analytics.employeeAnalytics || []).map(emp => ({
      'Employee Email': emp.employeeEmail,
      'Employee Name': emp.employeeName,
      'Total Queries': emp.totalQueries,
      'Safe Queries': emp.safeQueries,
      'Warning Queries': emp.warningQueries,
      'Severe Queries': emp.severeQueries,
      'Safe Percentage': emp.safePercentage,
      'Warning Percentage': emp.warningPercentage,
      'Severe Percentage': emp.severePercentage,
      'Last Query Date': emp.lastQueryDate
    }));

    // Overall stats sheet
    const overallData = [{
      'Total Employees': analytics.overallStats.totalEmployees,
      'Total Queries': analytics.overallStats.totalQueries,
      'Safe Queries': analytics.overallStats.safeQueries,
      'Warning Queries': analytics.overallStats.warningQueries,
      'Severe Queries': analytics.overallStats.severeQueries,
      'Safe Percentage': analytics.overallStats.safePercentage,
      'Warning Percentage': analytics.overallStats.warningPercentage,
      'Severe Percentage': analytics.overallStats.severePercentage
    }];

    // Recent queries sheets
    const severeQueriesData = (analytics.recentSevereQueries || []).map((query, index) => ({
      'Query #': index + 1,
      'Content': query.content || 'N/A',
      'Employee': query.employee || 'N/A',
      'Date': query.date || 'N/A',
      'Risk Level': 'Severe'
    }));

    const warningQueriesData = (analytics.recentWarningQueries || []).map((query, index) => ({
      'Query #': index + 1,
      'Content': query.content || 'N/A',
      'Employee': query.employee || 'N/A',
      'Date': query.date || 'N/A',
      'Risk Level': 'Warning'
    }));

    // Daily counts sheet
    const dailyData = Object.entries(analytics.dailyQueryCounts || {}).map(([date, count]) => ({
      'Date': date,
      'Query Count': count
    }));

    const employeeSheet = XLSX.utils.json_to_sheet(employeeData);
    const overallSheet = XLSX.utils.json_to_sheet(overallData);
    const severeSheet = XLSX.utils.json_to_sheet(severeQueriesData);
    const warningSheet = XLSX.utils.json_to_sheet(warningQueriesData);
    const dailySheet = XLSX.utils.json_to_sheet(dailyData);

    XLSX.utils.book_append_sheet(workbook, overallSheet, 'Overall Stats');
    XLSX.utils.book_append_sheet(workbook, employeeSheet, 'Employee Analytics');
    XLSX.utils.book_append_sheet(workbook, severeSheet, 'Severe Queries');
    XLSX.utils.book_append_sheet(workbook, warningSheet, 'Warning Queries');
    XLSX.utils.book_append_sheet(workbook, dailySheet, 'Daily Counts');

    XLSX.writeFile(workbook, `AI_Analytics_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const navigate = useNavigate();
  
  useEffect(() => {
      // Initialize auth state from localStorage when component mounts
      initializeAuth();
  }, []);
  
  const handleLogout = () => {
      logout();
      navigate('/home/enterprise');
  };

  // Show loading state
  if (loading && !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
          {!apiAvailable && (
            <p className="text-orange-600 text-sm mt-2">
              API unavailable - using demo data
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  // Show error state only if we don't have any data at all
  if (error && !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Analytics</h2>
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-orange-600 text-sm mb-6">
            This may be due to CORS policy or network connectivity issues.
          </p>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* API Status Banner */}
        {!apiAvailable && analytics && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-700 text-sm font-medium">
                API temporarily unavailable - displaying demo data
              </span>
              <motion.button
                onClick={handleRefresh}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs rounded-lg transition-colors"
              >
                Retry Connection
              </motion.button>
            </div>
          </motion.div>
        )}

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
              🛡️ AI Query Analytics
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Real-time monitoring and analytics across your organization
            </motion.p>
            <div className="flex items-center gap-2 mt-3">
              <div className={`w-2 h-2 rounded-full ${
                realTimeData && apiAvailable ? 'bg-green-400' : 'bg-red-400'
              } animate-pulse`} />
              <span className="text-sm text-gray-500 font-medium">
                {realTimeData && apiAvailable ? 'Live Monitoring' : 
                 !apiAvailable ? 'Demo Mode' : 'Monitoring Offline'}
              </span>
              {analytics && (
                <span className="text-sm text-gray-400 ml-4">
                  {analytics.overallStats.totalEmployees} employees monitored
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6 lg:mt-0 flex-wrap">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-sm"
            >
              Logout
            </motion.button>

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
              chartConfigs={chartConfigs}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {chartConfigs.map((chart, index) => (
            <motion.div
              key={chart.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ChartCard
                chart={chart}
                isVisible={visibleCharts[chart.id]}
                onToggle={toggleChart}
              />
            </motion.div>
          ))}
        </div>

        {/* Recent Queries Section */}
        {analytics && (analytics.recentSevereQueries.length > 0 || analytics.recentWarningQueries.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiAlertTriangle className="w-5 h-5 text-red-500" />
              Recent High-Risk Queries
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analytics.recentSevereQueries.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Severe Queries</h4>
                  <div className="space-y-2">
                    {analytics.recentSevereQueries.slice(0, 3).map((query, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-gray-600">Query content would be displayed here</p>
                        <p className="text-xs text-gray-400 mt-1">Employee: {query.employee || 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {analytics.recentWarningQueries.length > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-600 mb-2">Warning Queries</h4>
                  <div className="space-y-2">
                    {analytics.recentWarningQueries.slice(0, 3).map((query, index) => (
                      <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-gray-600">Query content would be displayed here</p>
                        <p className="text-xs text-gray-400 mt-1">Employee: {query.employee || 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

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
                {analytics ? analytics.overallStats.totalEmployees : 0} Employees Monitored
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

export default Enterprise;