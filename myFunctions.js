var correctCaptcha = generateCaptcha(); 
function refreshCaptcha() {
    correctCaptcha = generateCaptcha(); 
    document.getElementById("captchaImage").src = "data:image/png;base64," + generateCaptchaImage(correctCaptcha);
}
function generateCaptcha() {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var captcha = "";
    for (var i = 0; i < 6; i++) captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    return captcha;
}
function generateCaptchaImage(captcha) {
    var canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 40;
    var context = canvas.getContext("2d");
    context.font = "20px Arial";
    context.fillText(captcha, 10, 30);
    return canvas.toDataURL("image/png").replace("data:image/png;base64,", "");
}
function validateForm() {
    var nationalId = document.getElementById('nationalId').value;
    var fullName = document.getElementById('fullName').value;
    var birthdate = document.getElementById('birthdate').value;
    var mobileNumber = document.getElementById('mobileNumber').value;
    var email = document.getElementById('email').value;
    var captchaInput = document.getElementById('captchaInput').value;
    if (nationalId.trim() === '' || nationalId.length !== 11 || (fullName.trim() !== '' && !validateArabicName(fullName)) || (birthdate.trim() !== '' && !isValidDate(birthdate)) || (mobileNumber.trim() !== '' && !isValidPhoneNumber(mobileNumber)) || (email.trim() !== '' && !validateEmail(email)) || (captchaInput.trim() !== '' && captchaInput !== correctCaptcha)) {
        if (nationalId.trim() === '') alert('يرجى إدخال الرقم الوطني.');
        else if (nationalId.length !== 11) alert('الرقم الوطني يجب أن يتكون من 11 خانة.');
        else if (fullName.trim() !== '' && !validateArabicName(fullName)) alert('يرجى إدخال الاسم الكامل باللغة العربية.');
        else if (birthdate.trim() !== '' && !isValidDate(birthdate)) alert('يرجى إدخال تاريخ الولادة بالتنسيق الصحيح.');
        else if (mobileNumber.trim() !== '' && !isValidPhoneNumber(mobileNumber)) alert('يرجى إدخال رقم هاتف محمول صالح.');
        else if (email.trim() !== '' && !validateEmail(email)) alert('البريد الإلكتروني غير صحيح.');
        else if (captchaInput.trim() !== '' && captchaInput !== correctCaptcha) alert('رمز CAPTCHA غير صحيح.');
        return false;
    }
    return true;
}
function isValidDate(dateString) { return true; }
function isValidPhoneNumber(phoneNumber) { return /^[0-9]{10}$/.test(phoneNumber); }
function validateArabicName(name) { return /[\u0600-\u06FF\s]+/.test(name); }
function validateEmail(email) { return /\S+@\S+\.\S+/.test(email); }


$(document).ready(function(){
    $("#continueBtn").click(function(){ $("#customerInfo").slideToggle(); });
    $(".selectBtn").click(function(){ 
        var city = $(this).data("city");
        $("#customerInfo").data("city", city).data("details", $(this).data("details")).data("price", $(this).data("price")); 
    });
    $(".detailsBtn").click(function(){ $("#" + $(this).data("target")).slideToggle(); });

    $("#submitBtn").click(function(){
        if (validateForm()) {
            var city = $("#customerInfo").data("city");
            var details = $("#customerInfo").data("details");
            var price = $("#customerInfo").data("price");
            var selectedProperty = "العقار المختار: " + details + " في " + city + ". الإيجار الشهري: " + price;
            alert(selectedProperty);
        }
    });
    
    $("input[name='property']").change(() => console.log("تم اختيار " + $("input[name='property']:checked").data("city") + ": " + $("input[name='property']:checked").data("details") + "، بسعر " + $("input[name='property']:checked").data("price")));
});