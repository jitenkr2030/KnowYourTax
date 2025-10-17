'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  Globe, 
  Shield, 
  Server, 
  Cloud, 
  RefreshCw,
  Download,
  Upload,
  Settings,
  TrendingUp,
  TrendingDown,
  Users
} from 'lucide-react';

interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  message: string;
  details?: any;
}

interface HealthStatus {
  timestamp: string;
  overall_status: 'healthy' | 'unhealthy';
  checks: {
    database: HealthCheck;
    api: HealthCheck;
    external_services: HealthCheck;
    memory: HealthCheck;
    disk: HealthCheck;
    network: HealthCheck;
  };
  metrics: any;
}

interface Alert {
  type: string;
  message: string;
  severity: 'warning' | 'critical';
}

interface DeploymentStatus {
  environment: string;
  version: string;
  deployed_at: string;
  uptime: number;
  node_version: string;
  platform: string;
  architecture: string;
}

interface BackupStatus {
  last_backup: string;
  backup_size: number;
  backup_status: string;
  next_backup: string;
  retention_days: number;
}

interface SecurityStatus {
  ssl_certificate: {
    valid: boolean;
    expires: string;
  };
  firewall: {
    enabled: boolean;
    blocked_requests: number;
  };
  authentication: {
    active_sessions: number;
    failed_logins: number;
  };
  encryption: {
    enabled: boolean;
    algorithm: string;
  };
}

export default function ProductionMonitoring() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus | null>(null);
  const [backupStatus, setBackupStatus] = useState<BackupStatus | null>(null);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductionData();
    const interval = setInterval(fetchProductionData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchProductionData = async () => {
    try {
      const [health, alertsData, deployment, backup, security] = await Promise.all([
        fetch('/api/production?action=health'),
        fetch('/api/production?action=alerts'),
        fetch('/api/production?action=deployment'),
        fetch('/api/production?action=backup'),
        fetch('/api/production?action=security')
      ]);

      setHealthStatus(await health.json());
      setAlerts(await alertsData.json());
      setDeploymentStatus(await deployment.json());
      setBackupStatus(await backup.json());
      setSecurityStatus(await security.json());
    } catch (error) {
      console.error('Failed to fetch production data:', error);
    }
  };

  const handleAction = async (action: string, data?: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/production', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, data }),
      });

      const result = await response.json();
      console.log(`${action} result:`, result);
      
      // Refresh data after action
      await fetchProductionData();
    } catch (error) {
      console.error(`Failed to execute ${action}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'unhealthy':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="default" className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'unhealthy':
        return <Badge variant="destructive">Unhealthy</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAlertSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Production Monitoring</h2>
          <p className="text-muted-foreground">
            Monitor system health, performance, and deployment status
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchProductionData} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => handleAction('backup')} disabled={loading}>
            <Download className="h-4 w-4 mr-2" />
            Backup
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health Checks</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                {healthStatus ? getStatusIcon(healthStatus.overall_status) : <Activity className="h-4 w-4" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus ? healthStatus.overall_status.toUpperCase() : 'LOADING'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {healthStatus ? new Date(healthStatus.timestamp).toLocaleString() : 'Checking...'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alerts.length}</div>
                <p className="text-xs text-muted-foreground">
                  {alerts.filter(a => a.severity === 'critical').length} critical
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Server className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {deploymentStatus ? `${Math.floor(deploymentStatus.uptime / 3600)}h` : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {deploymentStatus ? deploymentStatus.environment : 'Unknown'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backup Status</CardTitle>
                <Database className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {backupStatus ? backupStatus.backup_status.toUpperCase() : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {backupStatus ? `${backupStatus.backup_size} MB` : 'Unknown'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {alerts.slice(0, 5).map((alert, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                      <AlertTriangle className="h-4 w-4" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.type}</p>
                      </div>
                      {getAlertSeverityBadge(alert.severity)}
                    </div>
                  ))}
                  {alerts.length === 0 && (
                    <p className="text-sm text-muted-foreground">No active alerts</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Metrics</CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthStatus?.metrics && (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Memory Usage</span>
                          <span>{healthStatus.metrics.memory_usage?.toFixed(1)}%</span>
                        </div>
                        <Progress value={healthStatus.metrics.memory_usage || 0} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU Usage</span>
                          <span>{healthStatus.metrics.cpu_usage?.toFixed(1)}%</span>
                        </div>
                        <Progress value={healthStatus.metrics.cpu_usage || 0} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Active Users</span>
                          <span>{healthStatus.metrics.active_users}</span>
                        </div>
                        <Progress value={(healthStatus.metrics.active_users || 0) / 1000 * 100} className="h-2" />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          {healthStatus && (
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(healthStatus.checks).map(([key, check]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(check.status)}
                      {key.replace('_', ' ').toUpperCase()}
                      {getStatusBadge(check.status)}
                    </CardTitle>
                    <CardDescription>{check.message}</CardDescription>
                  </CardHeader>
                  {check.details && (
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        {Object.entries(check.details).map(([detailKey, detailValue]) => (
                          <div key={detailKey} className="flex justify-between">
                            <span className="text-muted-foreground">{detailKey.replace('_', ' ')}:</span>
                            <span>{String(detailValue)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Current alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <Alert key={index} className={alert.severity === 'critical' ? 'border-red-200' : 'border-yellow-200'}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <span>{alert.message}</span>
                          {getAlertSeverityBadge(alert.severity)}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-muted-foreground">No active alerts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Information</CardTitle>
                <CardDescription>Current deployment status and details</CardDescription>
              </CardHeader>
              <CardContent>
                {deploymentStatus && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Environment:</span>
                      <Badge>{deploymentStatus.environment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span>{deploymentStatus.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deployed At:</span>
                      <span>{new Date(deploymentStatus.deployed_at).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Node Version:</span>
                      <span>{deploymentStatus.node_version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform:</span>
                      <span>{deploymentStatus.platform}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup Status</CardTitle>
                <CardDescription>System backup information</CardDescription>
              </CardHeader>
              <CardContent>
                {backupStatus && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Backup:</span>
                      <span>{new Date(backupStatus.last_backup).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Backup Size:</span>
                      <span>{backupStatus.backup_size} MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={backupStatus.backup_status === 'completed' ? 'default' : 'secondary'}>
                        {backupStatus.backup_status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Backup:</span>
                      <span>{new Date(backupStatus.next_backup).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Retention:</span>
                      <span>{backupStatus.retention_days} days</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          {securityStatus && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    SSL Certificate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valid:</span>
                      <Badge variant={securityStatus.ssl_certificate.valid ? 'default' : 'destructive'}>
                        {securityStatus.ssl_certificate.valid ? 'Valid' : 'Invalid'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span>{new Date(securityStatus.ssl_certificate.expires).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Firewall
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Enabled:</span>
                      <Badge variant={securityStatus.firewall.enabled ? 'default' : 'destructive'}>
                        {securityStatus.firewall.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blocked Requests:</span>
                      <span>{securityStatus.firewall.blocked_requests}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Sessions:</span>
                      <span>{securityStatus.authentication.active_sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Failed Logins:</span>
                      <span>{securityStatus.authentication.failed_logins}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Encryption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Enabled:</span>
                      <Badge variant={securityStatus.encryption.enabled ? 'default' : 'destructive'}>
                        {securityStatus.encryption.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Algorithm:</span>
                      <span>{securityStatus.encryption.algorithm}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}