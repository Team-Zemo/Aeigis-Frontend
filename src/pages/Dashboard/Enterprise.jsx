import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

import {
  FiShield,
  FiUsers,
  FiAlertTriangle,
  FiActivity,
  FiDownload
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

const Enterprise = () => {
  const [realTimeData, setRealTimeData] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(true);
  
  // Add analytics state management
  const { analytics, fetchAnalytics, loading, error, initializeAuth, user } = useAuthStore();

  // Add percentage formatting utility
  const formatPercentage = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '0.00';
    return Number(value).toFixed(2);
  };

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
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
    }
  }, [realTimeData, apiAvailable]);

  // Update stats to use real data with formatted percentages
  const stats = analytics ? [
    {
      icon: FiAlertTriangle,
      title: 'Severe Queries',
      value: analytics.overallStats.severeQueries.toString(),
      change: formatPercentage(analytics.overallStats.severePercentage || 0),
      color: 'bg-red-500',
      status: analytics.overallStats.severeQueries > 10 ? 'Critical' : analytics.overallStats.severeQueries > 5 ? 'High' : 'Low',
      isAnimating: analytics.overallStats.severeQueries > 0
    },
    {
      icon: FiShield,
      title: 'Safe Queries',
      value: analytics.overallStats.safeQueries.toString(),
      change: formatPercentage(analytics.overallStats.safePercentage || 0),
      color: 'bg-emerald-500',
      status: 'Good'
    },
    {
      icon: FiUsers,
      title: 'Total Employees',
      value: analytics.overallStats.totalEmployees.toString(),
      change: formatPercentage(
        analytics.employeeAnalytics && analytics.employeeAnalytics.length > 0 
          ? (analytics.employeeAnalytics.filter(emp => emp.totalQueries > 0).length / analytics.overallStats.totalEmployees) * 100
          : 0
      ),
      color: 'bg-blue-500',
      status: 'Active'
    },
    {
      icon: FiActivity,
      title: 'Total Queries',
      value: analytics.overallStats.totalQueries.toString(),
      change: formatPercentage(
        analytics.overallStats.totalQueries > 0 && analytics.overallStats.totalEmployees > 0
          ? (analytics.overallStats.totalQueries / analytics.overallStats.totalEmployees)
          : 0
      ),
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

  const exportToExcel = () => {
    if (!analytics) return;

    const workbook = XLSX.utils.book_new();

    // Enhanced Employee analytics sheet with more details
    const employeeData = (analytics.employeeAnalytics || []).map(emp => ({
      'Employee Email': emp.employeeEmail,
      'Employee Name': emp.employeeName,
      'Total Queries': emp.totalQueries,
      'Safe Queries': emp.safeQueries,
      'Warning Queries': emp.warningQueries,
      'Severe Queries': emp.severeQueries,
      'Safe Percentage': formatPercentage(emp.safePercentage),
      'Warning Percentage': formatPercentage(emp.warningPercentage),
      'Severe Percentage': formatPercentage(emp.severePercentage),
      'Last Query Date': emp.lastQueryDate,
      'Risk Level': emp.severeQueries > 5 ? 'High Risk' : emp.warningQueries > 10 ? 'Medium Risk' : 'Low Risk',
      'Status': emp.totalQueries > 0 ? 'Active' : 'Inactive',
      'Safety Score': formatPercentage(emp.safePercentage || 0)
    }));

    // Employee Summary Statistics
    const employeeSummary = (analytics.employeeAnalytics || []).map(emp => ({
      'Employee Name': emp.employeeName,
      'Email': emp.employeeEmail,
      'Query Count': emp.totalQueries,
      'Risk Assessment': emp.severeQueries > 5 ? 'High Risk' : emp.warningQueries > 10 ? 'Medium Risk' : 'Low Risk',
      'Last Active': emp.lastQueryDate || 'N/A',
      'Safety Rating': emp.safePercentage > 80 ? 'Excellent' : emp.safePercentage > 60 ? 'Good' : emp.safePercentage > 40 ? 'Fair' : 'Poor'
    }));

    // Top Risk Employees
    const topRiskEmployees = (analytics.employeeAnalytics || [])
      .filter(emp => emp.severeQueries > 0 || emp.warningQueries > 0)
      .sort((a, b) => (b.severeQueries + b.warningQueries) - (a.severeQueries + a.warningQueries))
      .slice(0, 10)
      .map((emp, index) => ({
        'Rank': index + 1,
        'Employee Name': emp.employeeName,
        'Email': emp.employeeEmail,
        'Severe Queries': emp.severeQueries,
        'Warning Queries': emp.warningQueries,
        'Total Risk Queries': emp.severeQueries + emp.warningQueries,
        'Risk Percentage': formatPercentage(((emp.severeQueries + emp.warningQueries) / emp.totalQueries) * 100),
        'Action Required': emp.severeQueries > 5 ? 'Immediate Training' : emp.warningQueries > 10 ? 'Monitoring' : 'Review'
      }));

    // Employee Activity Timeline
    const employeeActivity = (analytics.employeeAnalytics || []).map(emp => ({
      'Employee': emp.employeeName,
      'Email': emp.employeeEmail,
      'First Query': 'N/A', // This would need to be added to your analytics data
      'Last Query': emp.lastQueryDate,
      'Days Active': 'N/A', // Calculate based on date range
      'Average Queries Per Day': emp.totalQueries > 0 ? Math.round(emp.totalQueries / 30) : 0, // Assuming 30-day period
      'Trend': emp.totalQueries > 50 ? 'High Usage' : emp.totalQueries > 20 ? 'Medium Usage' : 'Low Usage'
    }));

    // Overall stats sheet with formatted percentages
    const overallData = [{
      'Total Employees': analytics.overallStats.totalEmployees,
      'Active Employees': (analytics.employeeAnalytics || []).filter(emp => emp.totalQueries > 0).length,
      'Inactive Employees': analytics.overallStats.totalEmployees - (analytics.employeeAnalytics || []).filter(emp => emp.totalQueries > 0).length,
      'Total Queries': analytics.overallStats.totalQueries,
      'Safe Queries': analytics.overallStats.safeQueries,
      'Warning Queries': analytics.overallStats.warningQueries,
      'Severe Queries': analytics.overallStats.severeQueries,
      'Safe Percentage': formatPercentage(analytics.overallStats.safePercentage),
      'Warning Percentage': formatPercentage(analytics.overallStats.warningPercentage),
      'Severe Percentage': formatPercentage(analytics.overallStats.severePercentage),
      'High Risk Employees': (analytics.employeeAnalytics || []).filter(emp => emp.severeQueries > 5).length,
      'Medium Risk Employees': (analytics.employeeAnalytics || []).filter(emp => emp.warningQueries > 10 && emp.severeQueries <= 5).length,
      'Low Risk Employees': (analytics.employeeAnalytics || []).filter(emp => emp.warningQueries <= 10 && emp.severeQueries === 0).length
    }];

    // Recent queries sheets
    const severeQueriesData = (analytics.recentSevereQueries || []).map((query, index) => ({
      'Query #': index + 1,
      'Content': query.content || 'Content not available',
      'Employee': query.employee || 'N/A',
      'Employee Email': query.employeeEmail || 'N/A',
      'Date': query.date || new Date().toLocaleDateString(),
      'Time': query.time || new Date().toLocaleTimeString(),
      'Risk Level': 'Severe',
      'Action Required': 'Immediate Review',
      'Category': query.category || 'General'
    }));

    const warningQueriesData = (analytics.recentWarningQueries || []).map((query, index) => ({
      'Query #': index + 1,
      'Content': query.content || 'Content not available',
      'Employee': query.employee || 'N/A',
      'Employee Email': query.employeeEmail || 'N/A',
      'Date': query.date || new Date().toLocaleDateString(),
      'Time': query.time || new Date().toLocaleTimeString(),
      'Risk Level': 'Warning',
      'Action Required': 'Monitor',
      'Category': query.category || 'General'
    }));

    // Daily counts sheet
    const dailyData = Object.entries(analytics.dailyQueryCounts || {}).map(([date, count]) => ({
      'Date': date,
      'Query Count': count,
      'Day of Week': new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
      'Trend': count > 100 ? 'High' : count > 50 ? 'Medium' : 'Low'
    }));

    // Weekly and Monthly data
    const weeklyData = Object.entries(analytics.weeklyQueryCounts || {}).map(([week, count]) => ({
      'Week': week,
      'Query Count': count,
      'Average Daily': Math.round(count / 7)
    }));

    const monthlyData = Object.entries(analytics.monthlyQueryCounts || {}).map(([month, count]) => ({
      'Month': month,
      'Query Count': count,
      'Average Daily': Math.round(count / 30),
      'Trend': count > 3000 ? 'High' : count > 1500 ? 'Medium' : 'Low'
    }));

    // Create sheets
    const overallSheet = XLSX.utils.json_to_sheet(overallData);
    const employeeSheet = XLSX.utils.json_to_sheet(employeeData);
    const employeeSummarySheet = XLSX.utils.json_to_sheet(employeeSummary);
    const topRiskSheet = XLSX.utils.json_to_sheet(topRiskEmployees);
    const employeeActivitySheet = XLSX.utils.json_to_sheet(employeeActivity);
    const severeSheet = XLSX.utils.json_to_sheet(severeQueriesData);
    const warningSheet = XLSX.utils.json_to_sheet(warningQueriesData);
    const dailySheet = XLSX.utils.json_to_sheet(dailyData);
    const weeklySheet = XLSX.utils.json_to_sheet(weeklyData);
    const monthlySheet = XLSX.utils.json_to_sheet(monthlyData);

    // Append sheets to workbook
    XLSX.utils.book_append_sheet(workbook, overallSheet, 'Overall Stats');
    XLSX.utils.book_append_sheet(workbook, employeeSummarySheet, 'Employee Summary');
    XLSX.utils.book_append_sheet(workbook, employeeSheet, 'Detailed Employee Data');
    XLSX.utils.book_append_sheet(workbook, topRiskSheet, 'Top Risk Employees');
    XLSX.utils.book_append_sheet(workbook, employeeActivitySheet, 'Employee Activity');
    XLSX.utils.book_append_sheet(workbook, severeSheet, 'Severe Queries');
    XLSX.utils.book_append_sheet(workbook, warningSheet, 'Warning Queries');
    XLSX.utils.book_append_sheet(workbook, dailySheet, 'Daily Trends');
    XLSX.utils.book_append_sheet(workbook, weeklySheet, 'Weekly Trends');
    XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Monthly Trends');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    XLSX.writeFile(workbook, `AEGIS_Analytics_Report_${timestamp}.xlsx`);
  };

  
  useEffect(() => {
      // Initialize auth state from localStorage when component mounts
      initializeAuth();
  }, []);

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
      <div className="max-w-7xl mx-auto mt-5">
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
              onClick={exportToExcel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
            >
              <FiDownload className="w-4 h-4" />
              Export Data
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

        {/* Footer */}
        {/* <motion.div
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
        </motion.div> */}
      </div>
    </div>
  );
};

export default Enterprise;