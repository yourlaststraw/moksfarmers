const months = {
    'Jan': '01', 
    'Feb': '01', 
    'Mar': '03', 
    'Apr': '04', 
    'May': '05', 
    'Jun': '06', 
    'Jul': '07', 
    'Aug': '08', 
    'Sep': '09', 
    'Oct': '10', 
    'Nov': '11', 
    'Dec': '12'
};

// This function's purpose is to generate a custom PayNow QR Code based on the inputs (Item Quantity in Cart) provided.
function processPayment(amt) {
    
    // Determining the date the PayNow QR will expire by through UNIX Timestamps conversion
    let today = new Date(); // Obtains Current DateTime UNIX Timestamp.
    let todaySplit = String(new Date(today)).split(' '); // Convert into Standardised DateTime.

    let year = todaySplit[3]; // Obtains Year
    let month = todaySplit[1]; // Obtains Month Name
    month = months[month]; // Changes Month Name to Month Number
    let day = String(Number(todaySplit[2]) + 1); // Obtains Day of Month. +1 to indicate 24 Hours later.

    let time = todaySplit[4].split(':'); // Obtains HH:MM:SS
    let hour = time[0]; // Obtains Hour of Day
    let minute = time[1]; // Obtains Minute of Hour

    // Appends all obtained information into QR Generation Link.
    let qr = 
        'https://sgqr.fullstacksys.com/paynow?mobile=90667672&uen=&editable=0&amount=' // Paid to my Phone No.. Can be changed.
        + String(amt) + '&expiry='
        + year + '%2F'
        + month + '%2F' 
        + day + '%20' 
        + hour + '%3A' 
        + minute + '&ref_id=&company=';

    // Embeds QR Code onto Screen.
    document.getElementById('QR').innerHTML = `<img  src='` + qr + `'>`;
}