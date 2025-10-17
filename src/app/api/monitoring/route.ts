import { NextRequest, NextResponse } from 'next/server';

interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  network: {
    inbound: number;
    outbound: number;
  };
  uptime: number;
  timestamp: string;
}

interface ApplicationMetrics {
  requests: {
    total: number;
    success: number;
    error: number;
    rate: number;
  };
  response_time: {
    average: number;
    p95: number;
    p99: number;
  };
  database: {
    connections: number;
    queries: number;
    slow_queries: number;
  };
  users: {
    active: number;
    total: number;
  };
  timestamp: string;
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

// Simulate system metrics collection
function collectSystemMetrics(): SystemMetrics {
  return {
    cpu: {
      usage: Math.random() * 100,
      cores: 4
    },
    memory: {
      total: 16 * 1024 * 1024 * 1024, // 16GB
      used: Math.random() * 8 * 1024 * 1024 * 1024, // Up to 8GB
      free: 8 * 1024 * 1024 * 1024,
      usage: Math.random() * 50 + 25 // 25-75%
    },
    disk: {
      total: 500 * 1024 * 1024 * 1024, // 500GB
      used: Math.random() * 200 * 1024 * 1024 * 1024, // Up to 200GB
      free: 300 * 1024 * 1024 * 1024,
      usage: Math.random() * 40 + 10 // 10-50%
    },
    network: {
      inbound: Math.random() * 1000000, // 1MB/s
      outbound: Math.random() * 1000000
    },
    uptime: process.uptime() * 1000,
    timestamp: new Date().toISOString()
  };
}

// Simulate application metrics collection
function collectApplicationMetrics(): ApplicationMetrics {
  return {
    requests: {
      total: Math.floor(Math.random() * 10000) + 1000,
      success: Math.floor(Math.random() * 9500) + 950,
      error: Math.floor(Math.random() * 50),
      rate: Math.random() * 100 + 50 // requests per minute
    },
    response_time: {
      average: Math.random() * 200 + 50, // 50-250ms
      p95: Math.random() * 500 + 200, // 200-700ms
      p99: Math.random() * 1000 + 500 // 500-1500ms
    },
    database: {
      connections: Math.floor(Math.random() * 50) + 10,
      queries: Math.floor(Math.random() * 10000) + 1000,
      slow_queries: Math.floor(Math.random() * 10)
    },
    users: {
      active: Math.floor(Math.random() * 500) + 100,
      total: Math.floor(Math.random() * 5000) + 1000
    },
    timestamp: new Date().toISOString()
  };
}

// Generate sample alerts
function generateAlerts(): Alert[] {
  return [
    {
      id: '1',
      type: 'info',
      title: 'System Health Check',
      message: 'All systems operational',
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      resolved: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'High Memory Usage',
      message: 'Memory usage exceeds 80% threshold',
      timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
      resolved: false
    },
    {
      id: '3',
      type: 'error',
      title: 'Database Connection Timeout',
      message: 'Multiple database connection timeouts detected',
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      resolved: true
    }
  ];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    switch (type) {
      case 'system':
        const systemMetrics = collectSystemMetrics();
        return NextResponse.json(systemMetrics);

      case 'application':
        const appMetrics = collectApplicationMetrics();
        return NextResponse.json(appMetrics);

      case 'alerts':
        const alerts = generateAlerts();
        return NextResponse.json(alerts);

      case 'health':
        const health = {
          status: 'healthy',
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
          timestamp: new Date().toISOString(),
          checks: {
            database: 'healthy',
            redis: 'healthy',
            external_apis: 'healthy'
          }
        };
        return NextResponse.json(health);

      default:
        // Return all metrics
        return NextResponse.json({
          system: collectSystemMetrics(),
          application: collectApplicationMetrics(),
          alerts: generateAlerts(),
          health: {
            status: 'healthy',
            timestamp: new Date().toISOString()
          }
        });
    }
  } catch (error) {
    console.error('Monitoring endpoint error:', error);
    return NextResponse.json(
      { error: 'Failed to collect metrics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json();

    switch (action) {
      case 'create_alert':
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: data.type || 'info',
          title: data.title || 'New Alert',
          message: data.message || 'Alert message',
          timestamp: new Date().toISOString(),
          resolved: false
        };
        
        // In production, this would save to database and trigger notifications
        console.log('New alert created:', newAlert);
        
        return NextResponse.json({ success: true, alert: newAlert });

      case 'resolve_alert':
        // In production, this would update the alert in database
        console.log('Alert resolved:', data.alertId);
        
        return NextResponse.json({ success: true });

      case 'system_restart':
        // In production, this would trigger system restart procedures
        console.log('System restart initiated');
        
        return NextResponse.json({ 
          success: true, 
          message: 'System restart initiated' 
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Monitoring action error:', error);
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    );
  }
}