'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface TestScenario {
  id: string;
  name: string;
  description: string;
  steps: string[];
}

interface TestResult {
  step: number;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  result?: 'pass' | 'fail';
  duration?: number;
}

interface TestExecution {
  testId: string;
  scenario: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  steps: TestResult[];
  overallResult?: {
    status: 'pass' | 'fail';
    score: number;
    issues: string[];
  };
}

export default function UserTestingFramework() {
  const [scenarios, setScenarios] = useState<TestScenario[]>([]);
  const [currentTest, setCurrentTest] = useState<TestExecution | null>(null);
  const [testHistory, setTestHistory] = useState<TestExecution[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestScenarios();
  }, []);

  const fetchTestScenarios = async () => {
    try {
      const response = await fetch('/api/testing');
      const data = await response.json();
      
      const scenarioList: TestScenario[] = Object.entries(data.scenarios).map(([key, value]: [string, any]) => ({
        id: key,
        name: value.name,
        description: value.description,
        steps: []
      }));
      
      setScenarios(scenarioList);
    } catch (error) {
      console.error('Failed to fetch test scenarios:', error);
    }
  };

  const runTestScenario = async (scenarioId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/testing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: scenarioId,
          testData: {
            // Sample test data
            business: {
              gstin: '29ABCDE1234F1Z5',
              name: 'Test Business Pvt Ltd'
            },
            period: {
              month: 'March',
              year: '2024'
            }
          }
        }),
      });

      const result = await response.json();
      
      if (result.testId) {
        const newTest: TestExecution = {
          testId: result.testId,
          scenario: result.scenario.name,
          status: 'running',
          steps: result.scenario.steps.map((step: string, index: number) => ({
            step: index + 1,
            description: step,
            status: index === 0 ? 'in_progress' : 'pending'
          }))
        };
        
        setCurrentTest(newTest);
        
        // Simulate test execution updates
        simulateTestExecution(result.testId, newTest);
      }
    } catch (error) {
      console.error('Failed to run test:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateTestExecution = (testId: string, test: TestExecution) => {
    let currentStep = 0;
    const totalSteps = test.steps.length;
    
    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        setCurrentTest(prev => {
          if (!prev) return null;
          
          const updatedSteps = [...prev.steps];
          updatedSteps[currentStep] = {
            ...updatedSteps[currentStep],
            status: 'completed',
            result: Math.random() > 0.1 ? 'pass' : 'fail',
            duration: Math.floor(Math.random() * 3000) + 1000
          };
          
          if (currentStep + 1 < totalSteps) {
            updatedSteps[currentStep + 1] = {
              ...updatedSteps[currentStep + 1],
              status: 'in_progress'
            };
          }
          
          currentStep++;
          
          return {
            ...prev,
            steps: updatedSteps,
            status: currentStep >= totalSteps ? 'completed' : 'running'
          };
        });
      } else {
        clearInterval(interval);
        
        // Set final result
        setCurrentTest(prev => {
          if (!prev) return null;
          
          const score = Math.floor(Math.random() * 20) + 80;
          const issues = Math.random() > 0.8 ? ['Minor validation error detected'] : [];
          
          return {
            ...prev,
            status: 'completed',
            overallResult: {
              status: score >= 80 ? 'pass' : 'fail',
              score,
              issues
            }
          };
        });
        
        // Add to history
        setTestHistory(prev => [currentTest!, ...prev]);
      }
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'running':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Running</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Testing Framework</h2>
          <p className="text-muted-foreground">
            Test platform functionality with real-world tax scenarios
          </p>
        </div>
      </div>

      <Tabs defaultValue="scenarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
          <TabsTrigger value="current">Current Test</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {scenarios.map((scenario) => (
              <Card key={scenario.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {scenario.name}
                    <Button
                      onClick={() => runTestScenario(scenario.id)}
                      disabled={loading}
                      size="sm"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run Test
                    </Button>
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Test Steps:</h4>
                    <ul className="space-y-1 text-sm">
                      {scenario.steps.map((step, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          {currentTest ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {currentTest.scenario}
                  {getStatusBadge(currentTest.status)}
                </CardTitle>
                <CardDescription>
                  Test ID: {currentTest.testId}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Test Progress</h4>
                  <div className="space-y-2">
                    {currentTest.steps.map((step) => (
                      <div key={step.step} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {getStatusIcon(step.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Step {step.step}</span>
                            {step.result && (
                              <Badge variant={step.result === 'pass' ? 'default' : 'destructive'}>
                                {step.result === 'pass' ? 'Pass' : 'Fail'}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {step.duration && (
                            <p className="text-xs text-muted-foreground">
                              Duration: {(step.duration / 1000).toFixed(1)}s
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {currentTest.overallResult && (
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">Overall Result</h4>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(currentTest.overallResult.status)}
                        <span className="font-medium">
                          {currentTest.overallResult.status === 'pass' ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Score:</span>
                        <Badge variant="outline">{currentTest.overallResult.score}%</Badge>
                      </div>
                    </div>
                    <Progress value={currentTest.overallResult.score} className="w-full" />
                    
                    {currentTest.overallResult.issues.length > 0 && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Issues Found:</strong>
                          <ul className="mt-2 space-y-1">
                            {currentTest.overallResult.issues.map((issue, index) => (
                              <li key={index} className="text-sm">• {issue}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">No test currently running</p>
                  <p className="text-sm text-muted-foreground">
                    Select a test scenario from the Test Scenarios tab to begin
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {testHistory.length > 0 ? (
            <div className="space-y-4">
              {testHistory.map((test) => (
                <Card key={test.testId}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {test.scenario}
                      {getStatusBadge(test.status)}
                    </CardTitle>
                    <CardDescription>
                      Test ID: {test.testId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {test.overallResult && (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(test.overallResult.status)}
                          <span className="font-medium">
                            {test.overallResult.status === 'pass' ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Score:</span>
                          <Badge variant="outline">{test.overallResult.score}%</Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">No test history available</p>
                  <p className="text-sm text-muted-foreground">
                    Run some test scenarios to see the results here
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}