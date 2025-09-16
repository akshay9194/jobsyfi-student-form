function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Append data to the sheet
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.email,
      data.phone,
      data.college,
      data.course,
      data.graduationYear,
      data.currentStatus,
      data.interestLevel,
      data.interestedFeatures,
      data.mostImpressive,
      data.concerns,
      data.willingness,
      data.pricingPreference,
      data.earlyAccess,
      data.additionalComments
    ]);
    
    // Send auto-response email (optional)
    if (data.email && data.fullName) {
      try {
        const subject = "Thank you for your interest in JobsiFy AI!";
        const body = `
Dear ${data.fullName},

Thank you for attending our demo and showing interest in JobsiFy AI!

We're excited to have you on board as we prepare to launch our AI-powered career platform next month. Your feedback from today's demo is incredibly valuable to us.

What's Next?
• We'll keep you updated on our launch progress
• You'll receive early access notifications
• Exclusive beta testing opportunities
• Special student pricing when we launch

We'll be in touch soon with more exciting updates!

Best regards,
The JobsiFy AI Team

---
Follow us for updates:
Website: www.jobsify.ai
Email: info@jobsify.ai

This is an automated response. Please don't reply to this email.
        `;
        
        MailApp.sendEmail({
          to: data.email,
          subject: subject,
          body: body
        });
      } catch (emailError) {
        console.log('Email sending failed:', emailError);
        // Don't fail the main process if email fails
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ready', message: 'JobsiFy Student Interest Form Handler is ready'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify the script works
function testFunction() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: "Test Student",
    email: "test@example.com",
    phone: "1234567890",
    college: "Test University",
    course: "Computer Science",
    graduationYear: "2025",
    currentStatus: "Final Year Student",
    interestLevel: "Very Interested",
    interestedFeatures: "AI Mock Interviews, Resume Builder",
    mostImpressive: "The AI interview feature was amazing!",
    concerns: "None",
    willingness: "Definitely will recommend",
    pricingPreference: "Pay-per-use with credits",
    earlyAccess: "Yes, notify me immediately",
    additionalComments: "Great product!"
  };
  
  // Get the active spreadsheet
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Append test data
  sheet.appendRow([
    testData.timestamp,
    testData.fullName,
    testData.email,
    testData.phone,
    testData.college,
    testData.course,
    testData.graduationYear,
    testData.currentStatus,
    testData.interestLevel,
    testData.interestedFeatures,
    testData.mostImpressive,
    testData.concerns,
    testData.willingness,
    testData.pricingPreference,
    testData.earlyAccess,
    testData.additionalComments
  ]);
  
  console.log('Test data added successfully');
}
