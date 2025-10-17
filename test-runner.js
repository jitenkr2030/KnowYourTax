#!/usr/bin/env node

const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🧪 KnowYourTax.ai Test Runner')
console.log('==================================\n')

// Test results
const results = {
  unit: { passed: 0, failed: 0, total: 0 },
  integration: { passed: 0, failed: 0, total: 0 },
  functional: { passed: 0, failed: 0, total: 0 },
  e2e: { passed: 0, failed: 0, total: 0 }
}

// Run Jest tests
function runJestTests(testType, pattern) {
  return new Promise((resolve) => {
    console.log(`📋 Running ${testType} tests...`)
    
    const command = `npx jest ${pattern} --verbose --coverage --coverageDirectory=coverage/${testType}`
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ ${testType} tests failed:`, error.message)
        results[testType].failed++
      } else {
        console.log(`✅ ${testType} tests completed`)
        results[testType].passed++
      }
      
      results[testType].total++
      
      if (stdout) {
        console.log(stdout)
      }
      
      if (stderr) {
        console.error(stderr)
      }
      
      resolve()
    })
  })
}

// Run Cypress tests
function runCypressTests() {
  return new Promise((resolve) => {
    console.log('🌐 Running End-to-End tests...')
    
    const command = 'npx cypress run --e2e --browser chrome --headless'
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ E2E tests failed:', error.message)
        results.e2e.failed++
      } else {
        console.log('✅ E2E tests completed')
        results.e2e.passed++
      }
      
      results.e2e.total++
      
      if (stdout) {
        console.log(stdout)
      }
      
      if (stderr) {
        console.error(stderr)
      }
      
      resolve()
    })
  })
}

// Generate test report
function generateReport() {
  console.log('\n📊 Test Report')
  console.log('================')
  
  Object.keys(results).forEach(type => {
    const result = results[type]
    console.log(`${type.toUpperCase()}:`)
    console.log(`  Passed: ${result.passed}`)
    console.log(`  Failed: ${result.failed}`)
    console.log(`  Total: ${result.total}`)
    console.log('')
  })
  
  const totalPassed = Object.values(results).reduce((sum, result) => sum + result.passed, 0)
  const totalFailed = Object.values(results).reduce((sum, result) => sum + result.failed, 0)
  const totalTests = Object.values(results).reduce((sum, result) => sum + result.total, 0)
  
  console.log('📈 Overall Summary:')
  console.log(`  Total Tests: ${totalTests}`)
  console.log(`  Passed: ${totalPassed}`)
  console.log(`  Failed: ${totalFailed}`)
  console.log(`  Success Rate: ${totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(2) : 0}%`)
  
  if (totalFailed > 0) {
    console.log('\n❌ Some tests failed. Please check the output above for details.')
    process.exit(1)
  } else {
    console.log('\n🎉 All tests passed!')
    process.exit(0)
  }
}

// Main function
async function main() {
  try {
    // Run unit tests
    await runJestTests('unit', '__tests__/lib/*.test.ts')
    await runJestTests('unit', '__tests__/hooks/*.test.ts')
    await runJestTests('unit', '__tests__/components/ui/*.test.ts')
    
    // Run integration tests
    await runJestTests('integration', '__tests__/api/**/*.test.ts')
    
    // Run functional tests
    await runJestTests('functional', '__tests__/functional/*.test.ts')
    await runJestTests('functional', '__tests__/navigation/*.test.ts')
    
    // Run E2E tests (only if environment is set up)
    if (process.env.SKIP_E2E !== 'true') {
      await runCypressTests()
    } else {
      console.log('⏭️  Skipping E2E tests (SKIP_E2E=true)')
    }
    
    // Generate report
    generateReport()
    
  } catch (error) {
    console.error('❌ Test runner failed:', error)
    process.exit(1)
  }
}

// Run the test runner
if (require.main === module) {
  main()
}