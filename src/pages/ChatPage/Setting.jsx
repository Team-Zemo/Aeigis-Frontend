import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  Divider,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  SecurityOutlined,
  ShieldOutlined,
  MonitorOutlined,
  NotificationsActiveOutlined,
  ReportProblemOutlined,
  StorageOutlined,
  ApiOutlined,
  AdminPanelSettingsOutlined,
  Logout,
  PersonOutline,
  HistoryOutlined,
  TuneOutlined,
} from '@mui/icons-material';
import { theme } from '../../theme';

const Setting = () => {
  const [settings, setSettings] = useState({
    realTimeMonitoring: true,
    autoMitigation: false,
    threatAlerts: true,
    dataRetention: true,
    apiLogging: true,
    alertSounds: true,
    emailReports: true,
    emergencyProtocol: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin Sarah Chen',
    email: 'admin@aiegis.security',
    role: 'Security Administrator',
  });

  const handleSettingChange = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const securitySettings = [
    {
      icon: <MonitorOutlined />,
      title: 'Real-time AI Monitoring',
      description: 'Continuously monitor AI systems for misuse patterns',
      key: 'realTimeMonitoring',
      critical: true,
    },
    {
      icon: <ShieldOutlined />,
      title: 'Automatic Mitigation',
      description: 'Auto-block detected threats without manual intervention',
      key: 'autoMitigation',
      critical: true,
    },
    {
      icon: <NotificationsActiveOutlined />,
      title: 'Threat Alerts',
      description: 'Instant notifications for security threats',
      key: 'threatAlerts',
    },
    {
      icon: <ReportProblemOutlined />,
      title: 'Emergency Protocol',
      description: 'Activate system-wide lockdown for critical threats',
      key: 'emergencyProtocol',
      critical: true,
    },
  ];

  const systemSettings = [
    {
      icon: <StorageOutlined />,
      title: 'Data Retention',
      description: 'Store logs and analytics for compliance',
      key: 'dataRetention',
    },
    {
      icon: <ApiOutlined />,
      title: 'API Request Logging',
      description: 'Log all API requests for audit trails',
      key: 'apiLogging',
    },
    {
      icon: <HistoryOutlined />,
      title: 'Email Reports',
      description: 'Daily security reports via email',
      key: 'emailReports',
    },
  ];

  const adminActions = [
    { icon: <AdminPanelSettingsOutlined />, title: 'Security Configuration', action: () => {} },
    { icon: <TuneOutlined />, title: 'Detection Thresholds', action: () => {} },
    { icon: <PersonOutline />, title: 'User Management', action: () => {} },
    { icon: <Logout />, title: 'Secure Logout', action: () => {}, danger: true },
  ];

  return (
    <Box className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Box className="flex items-center mb-8">
          <IconButton
            className="mr-3"
            sx={{ color: '#6b7280' }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h5" className="font-medium text-gray-900">
              Settings
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
              AI misuse detection and mitigation controls
            </Typography>
          </Box>
        </Box>

        {/* Admin Profile Section */}
        <Card className="mb-6" sx={{ boxShadow: 'none', border: '1px solid #f3f4f6' }}>
          <CardContent className="p-6">
            <Box className="flex items-center justify-between mb-4">
              <Typography variant="subtitle1" className="text-gray-900 font-medium">
                Administrator
              </Typography>
              <IconButton
                onClick={() => setIsEditing(!isEditing)}
                size="small"
                sx={{ color: '#6b7280' }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Box>

            <Box className="flex items-center space-x-4">
              <Avatar
                sx={{
                  bgcolor: '#f3f4f6',
                  color: '#6b7280',
                  width: 48,
                  height: 48,
                }}
              >
                {adminInfo.name.charAt(6)}
              </Avatar>

              <Box className="flex-1">
                {isEditing ? (
                  <Box className="space-y-3">
                    <TextField
                      fullWidth
                      size="small"
                      value={adminInfo.name}
                      onChange={(e) => setAdminInfo((prev) => ({ ...prev, name: e.target.value }))}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      size="small"
                      value={adminInfo.email}
                      onChange={(e) => setAdminInfo((prev) => ({ ...prev, email: e.target.value }))}
                      variant="outlined"
                    />
                    <Box className="flex space-x-2">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => setIsEditing(false)}
                        sx={{
                          bgcolor: '#374151',
                          color: 'white',
                          textTransform: 'none',
                          '&:hover': { bgcolor: '#111827' },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => setIsEditing(false)}
                        sx={{ textTransform: 'none', color: '#6b7280' }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" className="text-gray-900 font-medium">
                      {adminInfo.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {adminInfo.email}
                    </Typography>
                    <Chip
                      label={adminInfo.role}
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor: '#f9fafb',
                        color: '#374151',
                        border: '1px solid #e5e7eb',
                        fontSize: '0.75rem',
                      }}
                    />
                  </>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="mb-6" sx={{ boxShadow: 'none', border: '1px solid #f3f4f6' }}>
          <CardContent className="p-6">
            <Typography variant="subtitle1" className="text-gray-900 font-medium mb-4">
              Security & Protection
            </Typography>

            <Box className="space-y-4">
              {securitySettings.map((item, index) => (
                <Box key={item.key} className="flex items-center justify-between">
                  <Box className="flex items-center space-x-3">
                    <Box sx={{ color: '#9ca3af' }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Box className="flex items-center space-x-2">
                        <Typography variant="body2" className="text-gray-900">
                          {item.title}
                        </Typography>
                        {item.critical && (
                          <Box className="w-2 h-2 bg-red-400 rounded-full"></Box>
                        )}
                      </Box>
                      <Typography variant="caption" className="text-gray-500">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Switch
                    checked={settings[item.key]}
                    onChange={() => handleSettingChange(item.key)}
                    size="small"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#374151',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#374151',
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="mb-6" sx={{ boxShadow: 'none', border: '1px solid #f3f4f6' }}>
          <CardContent className="p-6">
            <Typography variant="subtitle1" className="text-gray-900 font-medium mb-4">
              System Configuration
            </Typography>

            <Box className="space-y-4">
              {systemSettings.map((item) => (
                <Box key={item.key} className="flex items-center justify-between">
                  <Box className="flex items-center space-x-3">
                    <Box sx={{ color: '#9ca3af' }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" className="text-gray-900">
                        {item.title}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Switch
                    checked={settings[item.key]}
                    onChange={() => handleSettingChange(item.key)}
                    size="small"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#374151',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#374151',
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <Card sx={{ boxShadow: 'none', border: '1px solid #f3f4f6' }}>
          <CardContent className="p-6">
            <Typography variant="subtitle1" className="text-gray-900 font-medium mb-4">
              Actions
            </Typography>

            <Box className="space-y-3">
              {adminActions.map((item) => (
                <Box
                  key={item.title}
                  className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-50 px-2 -mx-2 rounded"
                  onClick={item.action}
                >
                  <Box sx={{ color: item.danger ? '#ef4444' : '#9ca3af' }}>
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: item.danger ? '#ef4444' : '#374151' }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default Setting;
