# KYT.ai User Guide - How to Use the Platform

## Getting Started

### 1. **Account Creation & Login**
- **Sign Up**: Visit [app.kyt.ai](https://app.kyt.ai) and click "Sign Up"
- **Business Registration**: Provide your business details including:
  - Business Name
  - GSTIN (if applicable)
  - PAN
  - Business Address
  - Contact Information
- **Email Verification**: Verify your email address through the confirmation link
- **First Login**: Use your email and password to access the platform

### 2. **Dashboard Overview**
Upon logging in, you'll see the main dashboard with:
- **Compliance Score**: Overall health of your tax compliance
- **Upcoming Deadlines**: Important tax filing dates
- **Recent Activities**: Latest transactions and filings
- **Quick Actions**: Common tasks and shortcuts
- **Alerts & Notifications**: Important updates and reminders

## Navigation & Interface

### 1. **Main Navigation**
The platform uses a clean, intuitive navigation structure:

- **Dashboard**: Home page with overview and quick stats
- **Taxes**: Main tax compliance section
  - GST
  - Income Tax
  - Customs
  - TDS/TCS
- **Documents**: Invoice and document management
- **Reports**: Analytics and reporting
- **Settings**: Account and configuration
- **Help**: Support and documentation

### 2. **Quick Actions Panel**
Located on the right side of the dashboard:
- **File GST Return**: Quick access to GST filing
- **Upload Invoice**: Add new invoices to the system
- **Generate E-Way Bill**: Create e-way bills for transportation
- **View Reports**: Access analytics and reports

## GST Compliance Module

### 1. **GST Registration & Setup**
#### Adding Your GST Details
1. Navigate to **Taxes → GST → Settings**
2. Click "Add GSTIN"
3. Enter your 15-digit GSTIN
4. Provide business legal name as per GST registration
5. Select your GST registration type (Regular, Composition, etc.)
6. Add your business address details
7. Click "Save"

#### Multiple GSTIN Management
- Add multiple GSTINs for different business locations
- Switch between GSTINs using the dropdown menu
- Each GSTIN has separate compliance tracking

### 2. **Invoice Management**
#### Uploading Invoices
1. Go to **Documents → Invoices**
2. Click "Upload Invoice" or drag and drop files
3. Supported formats: PDF, JPEG, PNG, Excel
4. The system will automatically:
   - Extract data using OCR
   - Validate GSTIN details
   - Categorize by HSN/SAC codes
   - Calculate tax amounts

#### Manual Invoice Entry
1. Click "Add Invoice Manually"
2. Fill in the invoice details:
   - Invoice Number & Date
   - Supplier/Customer Name
   - GSTIN (if available)
   - Invoice Amount
   - Tax Rate & Amount
   - HSN/SAC Code
3. Click "Save"

#### Invoice Validation
The platform automatically validates:
- GSTIN format and existence
- HSN/SAC code validity
- Tax rate applicability
- Invoice number uniqueness
- Date validity

### 3. **GST Return Filing**
#### GSTR-1 Filing (Outward Supplies)
1. Navigate to **Taxes → GST → GSTR-1**
2. Review auto-populated invoice data
3. Add any missing invoices manually
4. Validate all entries
5. Generate summary
6. Preview return
7. Submit to GST Portal

#### GSTR-3B Filing (Monthly Return)
1. Go to **Taxes → GST → GSTR-3B**
2. The system auto-calculates:
   - Total outward supplies
   - Total inward supplies
   - Input tax credit available
   - Tax payable
3. Review calculations
4. Add any adjustments
5. Generate return
6. Submit to GST Portal

#### GSTR-9 Filing (Annual Return)
1. Navigate to **Taxes → GST → GSTR-9**
2. The system aggregates data from all monthly returns
3. Review consolidated information
4. Add any additional details
5. Generate annual return
6. Submit to GST Portal

### 4. **Input Tax Credit (ITC) Management**
#### GSTR-2B Reconciliation
1. Go to **Taxes → GST → ITC Management**
2. Click "Import GSTR-2B"
3. The system will:
   - Download GSTR-2B from GST Portal
   - Match with your purchase invoices
   - Identify discrepancies
   - Highlight missing invoices

#### ITC Eligibility Check
The platform automatically checks:
- Supplier GSTIN validity
- Invoice completeness
- Tax payment status by supplier
- Time limit for claiming ITC
- Blocked credits as per law

#### ITC Adjustment
1. Review mismatched items
2. Add missing purchase invoices
3. Mark ineligible credits
4. Generate reconciliation report
5. Apply adjustments in returns

### 5. **E-Way Bill Generation**
#### Single E-Way Bill
1. Navigate to **Taxes → GST → E-Way Bill**
2. Click "Generate E-Way Bill"
3. Fill in transport details:
   - Vehicle number
   - Transporter ID
   - Distance (approximate)
   - Transport mode
4. Select invoice(s) for transportation
5. Generate e-way bill
6. Download/print the document

#### Bulk E-Way Bill Generation
1. Select multiple invoices
2. Click "Generate Bulk E-Way Bills"
3. Upload transport details in Excel format
4. System generates multiple e-way bills
5. Download consolidated report

#### E-Way Bill Validity Tracking
- Real-time validity status monitoring
- Alerts before expiry
- Extension facility when needed
- History of all generated e-way bills

## Income Tax Module

### 1. **ITR Filing**
#### Form Selection
1. Navigate to **Taxes → Income Tax → ITR Filing**
2. The system recommends appropriate ITR form based on:
   - Income sources
   - Business type
   - Total income
   - Previous filing history
3. Confirm form selection or choose manually

#### Data Import
1. Click "Import Data"
2. Choose import sources:
   - Form 16 (Salary)
   - Form 26AS (Tax Credit)
   - Bank Statements
   - Investment Details
3. System automatically populates relevant fields

#### Income Details Entry
1. **Salary Income**: Add salary details from Form 16
2. **House Property**: Enter rental income and deductions
3. **Business Income**: Add business profit/loss details
4. **Capital Gains**: Enter sale of assets and gains
5. **Other Sources**: Add interest, dividends, etc.

#### Deductions & Exemptions
1. Navigate to **Deductions** section
2. Add eligible deductions:
   - Section 80C (PPF, LIC, etc.)
   - Section 80D (Health Insurance)
   - Section 80E (Education Loan)
   - Section 80G (Donations)
3. System calculates total deduction amount

#### Tax Calculation & Filing
1. Review all entered data
2. System calculates:
   - Total income
   - Taxable income
   - Tax liability
   - Rebates and reliefs
3. Generate tax computation
4. Preview return
5. Submit to Income Tax Portal
6. E-verify through:
   - Net Banking
   - Aadhaar OTP
   - EVC through Bank Account

### 2. **TDS Management**
#### Deductor Registration
1. Go to **Taxes → TDS → Settings**
2. Add TAN details
3. Register business as deductor
4. Add deductee details

#### TDS Calculation
1. Navigate to **TDS → Calculate TDS**
2. Select payment type (Salary, Professional Fees, etc.)
3. Enter payment amount
4. System calculates TDS amount based on:
   - Applicable rate
   - Threshold limits
   - Surcharge and cess
5. Generate TDS certificate

#### TDS Return Filing
1. Go to **TDS → File Return**
2. Select quarter and return type
3. System auto-populates from TDS entries
4. Review and validate
5. Generate return
6. Submit to TDS Portal

## Customs Module

### 1. **Customs Duty Filing**
#### Import Declaration
1. Navigate to **Taxes → Customs → Import**
2. Click "New Bill of Entry"
3. Enter basic details:
   - Importer details
   - Supplier details
   - Invoice details
   - Shipping details

#### HS Code Classification
1. Enter product description
2. System suggests HS codes using AI
3. Select appropriate HS code
4. Verify duty rates and regulations

#### Duty Calculation
1. System calculates:
   - Basic Customs Duty
   - Integrated Tax (IGST)
   - Compensation Cess
   - Anti-dumping Duty (if applicable)
2. Review duty breakdown
3. Add any additional charges

#### ICEGATE Submission
1. Generate Bill of Entry
2. Validate all entries
3. Submit to ICEGATE portal
4. Track clearance status
5. Generate shipping bill

### 2. **Export Documentation**
#### Export Declaration
1. Navigate to **Taxes → Customs → Export**
2. Click "New Shipping Bill"
3. Enter export details:
   - Exporter details
   - Buyer details
   - Product details
   - Shipping details

#### Duty Drawback & Refunds
1. Check eligibility for duty drawback
2. Calculate drawback amount
3. Apply for refund
4. Track refund status

## Document Management

### 1. **Document Upload**
#### Supported Formats
- **Images**: JPEG, PNG, GIF, BMP
- **Documents**: PDF, DOC, DOCX
- **Spreadsheets**: XLS, XLSX, CSV
- **Maximum Size**: 10MB per file

#### Upload Process
1. Go to **Documents → Upload**
2. Select document type:
   - Invoice
   - Receipt
   - Bank Statement
   - Tax Certificate
   - Others
3. Choose file(s) or drag and drop
4. Add metadata (date, amount, description)
5. Click "Upload"

### 2. **Document Organization**
#### Folder Structure
- **Tax Year**: Organized by financial year
- **Document Type**: Invoices, receipts, certificates
- **Month/Quarter**: Chronological organization
- **Custom Folders**: Create your own organization

#### Search & Filter
- Search by document name, date, amount
- Filter by document type, tax type, status
- Advanced search with multiple criteria
- Save frequent searches

### 3. **Document Security**
#### Access Control
- Role-based document access
- User-specific permissions
- Document-level security
- Audit trail for access

#### Backup & Recovery
- Automatic daily backup
- Version history for documents
- Recovery of deleted documents
- Export documents in bulk

## Reports & Analytics

### 1. **Standard Reports**
#### GST Reports
- **GSTR-1 Summary**: Monthly outward supplies
- **GSTR-3B Summary**: Monthly tax liability
- **ITC Reconciliation**: Input tax credit analysis
- **E-Way Bill Register**: All generated e-way bills

#### Income Tax Reports
- **Tax Computation**: Detailed tax calculation
- **TDS Summary**: Quarterly TDS details
- **Deduction Analysis**: All claimed deductions
- **Advance Tax**: Paid advance tax details

#### Customs Reports
- **Import Summary**: All import transactions
- **Duty Paid**: Customs duty breakdown
- **Export Summary**: All export transactions
- **Drawback Claims**: Duty drawback status

### 2. **Custom Reports**
#### Creating Custom Reports
1. Navigate to **Reports → Custom Reports**
2. Click "Create New Report"
3. Select data sources:
   - GST data
   - Income Tax data
   - Customs data
   - Document data
4. Choose fields to include
5. Apply filters and conditions
6. Generate report
7. Save report template for future use

#### Report Scheduling
1. Create report as above
2. Click "Schedule Report"
3. Set frequency (daily, weekly, monthly, quarterly)
4. Choose delivery method (email, download)
5. Add recipients
6. Save schedule

### 3. **Analytics Dashboard**
#### Key Metrics
- **Compliance Score**: Overall compliance health
- **Filing Accuracy**: Error rate in filings
- **Timeliness**: On-time filing percentage
- **Tax Liability**: Current tax position
- **ITC Utilization**: Input tax credit usage

#### Visualizations
- **Charts**: Bar, line, pie, area charts
- **Trends**: Year-over-year comparisons
- **Forecasting**: Predictive analytics
- **Benchmarking**: Industry comparisons

## Settings & Configuration

### 1. **Business Profile**
#### Company Information
1. Navigate to **Settings → Business Profile**
2. Update company details:
   - Legal name
   - Trade name
   - Registration number
   - PAN
   - GSTIN(s)
   - Address
   - Contact information
3. Click "Save"

#### Financial Year Settings
1. Select financial year (April-March)
2. Set accounting method (cash/accrual)
3. Configure tax periods (monthly/quarterly)
4. Save preferences

### 2. **User Management**
#### Adding Users
1. Go to **Settings → Users**
2. Click "Add User"
3. Enter user details:
   - Name
   - Email
   - Phone number
   - Role
4. Set permissions:
   - View access
   - Edit access
   - Admin access
5. Send invitation

#### Role Management
- **Admin**: Full access to all features
- **Manager**: Access to specific tax types
- **User**: Limited access to assigned tasks
- **Viewer**: Read-only access
- **Custom**: Create custom roles

### 3. **Integration Settings**
#### Tax Department Integration
1. Navigate to **Settings → Integrations**
2. Click "Connect" for desired tax portal:
   - GST Portal
   - Income Tax Portal
   - Customs Portal
   - E-Way Bill System
3. Enter credentials:
   - Username/Password
   - GSTIN/PAN
   - API keys (if applicable)
4. Test connection
5. Save configuration

#### Bank Integration
1. Select your bank from the list
2. Enter account details
3. Authenticate through net banking
4. Set up transaction sync
5. Configure reconciliation rules

### 4. **Notification Settings**
#### Email Notifications
1. Go to **Settings → Notifications**
2. Configure email alerts:
   - Tax deadlines
   - Return filing reminders
   - Payment due dates
   - Compliance alerts
3. Set frequency and timing
4. Save preferences

#### Push Notifications
1. Enable mobile app notifications
2. Choose notification types:
   - Critical alerts
   - Daily summary
   - Weekly reports
3. Set quiet hours
4. Save settings

## Mobile App Usage

### 1. **Downloading & Installing**
- **iOS**: Download from App Store
- **Android**: Download from Google Play Store
- **Web**: Access via mobile browser

### 2. **Mobile Features**
#### Quick Actions
- **File Return**: Quick GST return filing
- **Upload Invoice**: Capture and upload invoices
- **Check Status**: View filing and payment status
- **Generate E-Way Bill**: Create e-way bills on the go

#### Mobile Camera Features
- **Invoice Scanning**: Capture invoices with camera
- **Document Capture**: Scan any tax document
- **OCR Processing**: Automatic text extraction
- **Image Enhancement**: Improve image quality

#### Offline Mode
- **Data Entry**: Add data without internet
- **Document Storage**: Save documents locally
- **Sync Later**: Automatically sync when online
- **Offline Reports**: View saved reports

## Troubleshooting & Support

### 1. **Common Issues**
#### Login Problems
- **Forgot Password**: Use "Forgot Password" link
- **Account Locked**: Contact admin or wait 30 minutes
- **Invalid Credentials**: Check email and password
- **Browser Issues**: Try different browser or clear cache

#### Filing Issues
- **Data Not Syncing**: Check internet connection
- **Validation Errors**: Review error messages
- **Portal Connection**: Verify integration settings
- **Submission Failed**: Try again or contact support

#### Document Issues
- **Upload Failed**: Check file size and format
- **OCR Errors**: Ensure clear image quality
- **Missing Data**: Verify document completeness
- **Access Denied**: Check user permissions

### 2. **Getting Help**
#### In-App Support
1. Click "Help" in the main menu
2. Choose support type:
   - Knowledge Base
   - Video Tutorials
   - Contact Support
   - Live Chat

#### Contact Methods
- **Email**: support@kyt.ai
- **Phone**: 1800-123-4567 (Mon-Sat, 9 AM-6 PM)
- **Live Chat**: Available in app during business hours
- **Help Center**: Comprehensive knowledge base

#### Ticket System
1. Navigate to **Help → Support Tickets**
2. Click "Create Ticket"
3. Select issue category
4. Describe the problem in detail
5. Attach relevant screenshots or files
6. Submit ticket
7. Track ticket status in dashboard

### 3. **Best Practices**
#### Data Entry
- **Double-Check**: Verify all entered data
- **Use Templates**: Utilize predefined templates
- **Regular Updates**: Keep data current
- **Backup Data**: Regular data backup

#### Security
- **Strong Passwords**: Use complex passwords
- **Two-Factor**: Enable 2FA when available
- **Regular Logout**: Log out after each session
- **Secure Network**: Use secure internet connections

#### Compliance
- **Stay Updated**: Follow tax law changes
- **Meet Deadlines**: File before due dates
- **Keep Records**: Maintain proper documentation
- **Review Regularly**: Periodic compliance review

## Advanced Features

### 1. **Automation**
#### Automated Workflows
1. Navigate to **Settings → Automation**
2. Create new workflow:
   - Set trigger conditions
   - Define actions
   - Configure notifications
3. Enable workflow
4. Monitor execution

#### Scheduled Tasks
- **Daily**: Data sync, report generation
- **Weekly**: Compliance checks, reminders
- **Monthly**: Return preparation, backups
- **Quarterly**: Tax planning, reviews

### 2. **API Integration**
#### Using the API
1. Get API key from **Settings → API**
2. Review API documentation
3. Implement API calls:
   - Authentication
   - Data upload
   - Report generation
   - Status checking
4. Test integration
5. Monitor usage

#### Webhooks
1. Configure webhook URLs
2. Set up event listeners:
   - Return filed
   - Payment made
   - Document processed
   - Alert triggered
3. Handle webhook events
4. Monitor webhook logs

### 3. **Customization**
#### Branding
1. Navigate to **Settings → Branding**
2. Upload company logo
3. Set brand colors
4. Customize email templates
5. Save changes

#### Custom Fields
1. Go to **Settings → Custom Fields**
2. Create new field:
   - Field name
   - Field type
   - Validation rules
3. Add to relevant forms
4. Test functionality

---

This comprehensive user guide provides step-by-step instructions for using all features of the KYT.ai platform. For additional help, please contact our support team or refer to the in-app help resources.