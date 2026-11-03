/**
 * Google Apps Script untuk Messages Backend
 * 
 * Setup:
 * 1. Buat Google Sheet baru
 * 2. Rename sheet pertama jadi "Messages"
 * 3. Buat header di row 1: Timestamp | Nama | Kehadiran | Ucapan
 * 4. Tools → Script editor → paste code ini
 * 5. Deploy → New deployment → Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy URL deployment, paste ke index.html di variable GOOGLE_SCRIPT_URL
 */

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages');
  var data = sheet.getDataRange().getValues();
  var messages = [];
  
  // Skip header row
  for (var i = 1; i < data.length; i++) {
    if (data[i][1]) { // Skip empty rows
      messages.push({
        timestamp: data[i][0],
        nama: data[i][1],
        kehadiran: data[i][2],
        ucapan: data[i][3]
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(messages))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages');
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.nama || '',
      data.kehadiran || '',
      data.ucapan || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
