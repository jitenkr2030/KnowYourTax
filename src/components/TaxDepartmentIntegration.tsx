'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Link, Unlink, CheckCircle, XCircle, AlertTriangle, Shield, Database, FileText, Truck, Users } from 'lucide-react';

interface TaxPortal {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnected?: string;
}

interface ConnectionFormData {
  username?: string;
  password?: string;
  gstin?: string;
  pan?: string;
  dob?: string;
  ieCode?: string;
  apiKey?: string;
  tan?: string;
}

export default function TaxDepartmentIntegration() {
  const [portals, setPortals] = useState<TaxPortal[]>([]);
  const [selectedPortal, setSelectedPortal] = useState<TaxPortal | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<{[key: string]: any}>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPortals();
  }, []);

  const fetchPortals = async () => {
    try {
      const response = await fetch('/api/tax-department');
      const data = await response.json();
      
      const portalList: TaxPortal[] = data.portals.map((portal: any) => ({
        ...portal,
        status: 'disconnected' as const
      }));
      
      setPortals(portalList);
    } catch (error) {
      console.error('Failed to fetch tax portals:', error);
    }
  };

  const connectToPortal = async (portalId: string, credentials: ConnectionFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/tax-department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portal: portalId,
          credentials,
          action: 'connect'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Update portal status
        setPortals(prev => prev.map(portal => 
          portal.id === portalId 
            ? { ...portal, status: 'connected', lastConnected: new Date().toISOString() }
            : portal
        ));
        
        setConnectionStatus(prev => ({
          ...prev,
          [portalId]: { status: 'success', message: 'Connected successfully', data: result }
        }));
      } else {
        setConnectionStatus(prev => ({
          ...prev,
          [portalId]: { status: 'error', message: result.error || 'Connection failed' }
        }));
      }
    } catch (error) {
      console.error('Failed to connect to portal:', error);
      setConnectionStatus(prev => ({
        ...prev,
        [portalId]: { status: 'error', message: 'Connection failed' }
      }));
    } finally {
      setLoading(false);
    }
  };

  const disconnectFromPortal = async (portalId: string) => {
    try {
      // Update portal status
      setPortals(prev => prev.map(portal => 
        portal.id === portalId 
          ? { ...portal, status: 'disconnected', lastConnected: undefined }
          : portal
      ));
      
      setConnectionStatus(prev => ({
        ...prev,
        [portalId]: { status: 'disconnected', message: 'Disconnected successfully' }
      }));
    } catch (error) {
      console.error('Failed to disconnect from portal:', error);
    }
  };

  const getPortalIcon = (portalId: string) => {
    switch (portalId) {
      case 'gst':
        return <FileText className="h-5 w-5" />;
      case 'incometax':
        return <Users className="h-5 w-5" />;
      case 'customs':
        return <Shield className="h-5 w-5" />;
      case 'ewaybill':
        return <Truck className="h-5 w-5" />;
      case 'tds':
        return <Database className="h-5 w-5" />;
      default:
        return <Link className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Disconnected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const ConnectionForm = ({ portal }: { portal: TaxPortal }) => {
    const form = useForm<ConnectionFormData>();

    const onSubmit = (data: ConnectionFormData) => {
      connectToPortal(portal.id, data);
    };

    const renderFormFields = () => {
      switch (portal.id) {
        case 'gst':
          return (
            <>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter GST portal username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTIN</FormLabel>
                    <FormControl>
                      <Input placeholder="29ABCDE1234F1Z5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        case 'incometax':
          return (
            <>
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN</FormLabel>
                    <FormControl>
                      <Input placeholder="ABCDE1234F" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        case 'customs':
          return (
            <>
              <FormField
                control={form.control}
                name="ieCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IE Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Importer-Exporter Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter API key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        case 'ewaybill':
          return (
            <>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter E-Way Bill username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTIN</FormLabel>
                    <FormControl>
                      <Input placeholder="29ABCDE1234F1Z5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        case 'tds':
          return (
            <>
              <FormField
                control={form.control}
                name="tan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TAN</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter TAN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          );
        default:
          return null;
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderFormFields()}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Connecting...' : 'Connect'}
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tax Department Integration</h2>
          <p className="text-muted-foreground">
            Connect to official tax department portals for seamless compliance
          </p>
        </div>
      </div>

      <Tabs defaultValue="portals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portals">Available Portals</TabsTrigger>
          <TabsTrigger value="connections">Active Connections</TabsTrigger>
          <TabsTrigger value="status">Connection Status</TabsTrigger>
        </TabsList>

        <TabsContent value="portals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {portals.map((portal) => (
              <Card key={portal.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getPortalIcon(portal.id)}
                    {portal.name}
                    {getStatusBadge(portal.status)}
                  </CardTitle>
                  <CardDescription>{portal.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Base URL: {portal.baseUrl}</p>
                    {portal.lastConnected && (
                      <p>Last connected: {new Date(portal.lastConnected).toLocaleString()}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {portal.status === 'connected' ? (
                      <Button
                        variant="outline"
                        onClick={() => disconnectFromPortal(portal.id)}
                        className="flex-1"
                      >
                        <Unlink className="h-4 w-4 mr-2" />
                        Disconnect
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1">
                            <Link className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Connect to {portal.name}</DialogTitle>
                            <DialogDescription>
                              Enter your credentials to connect to {portal.name}
                            </DialogDescription>
                          </DialogHeader>
                          <ConnectionForm portal={portal} />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  {connectionStatus[portal.id] && (
                    <Alert className={connectionStatus[portal.id].status === 'error' ? 'border-red-200' : 'border-green-200'}>
                      {connectionStatus[portal.id].status === 'error' ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>
                        {connectionStatus[portal.id].message}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          {portals.filter(p => p.status === 'connected').length > 0 ? (
            <div className="space-y-4">
              {portals.filter(p => p.status === 'connected').map((portal) => (
                <Card key={portal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getPortalIcon(portal.id)}
                      {portal.name}
                      <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                    </CardTitle>
                    <CardDescription>
                      Connected since {portal.lastConnected ? new Date(portal.lastConnected).toLocaleString() : 'Unknown'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => disconnectFromPortal(portal.id)}
                      >
                        <Unlink className="h-4 w-4 mr-2" />
                        Disconnect
                      </Button>
                      <Button variant="secondary">
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <Unlink className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">No active connections</p>
                  <p className="text-sm text-muted-foreground">
                    Connect to tax department portals from the Available Portals tab
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Status Overview</CardTitle>
              <CardDescription>
                Monitor the status of all tax department integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {portals.filter(p => p.status === 'connected').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {portals.filter(p => p.status === 'disconnected').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Disconnected</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {portals.filter(p => p.status === 'error').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Error</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Connection Health</h4>
                <div className="space-y-1">
                  {portals.map((portal) => (
                    <div key={portal.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        {getPortalIcon(portal.id)}
                        <span className="font-medium">{portal.name}</span>
                      </div>
                      {getStatusBadge(portal.status)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}