(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        margin: 30,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Related Post carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        margin: 30,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);

// Modal Dialog
$(document).ready(function() {
    $('#loginModal').on('hidden.bs.modal', function() {
        $(this).find('form').trigger('reset');
    });
    $('#passwordResetModal').on('hidden.bs.modal', function() {
        $(this).find('form').trigger('reset');
    });
    $('#registrationModal').on('hidden.bs.modal', function() {
        $(this).find('form').trigger('reset');
    });
});

$(document).ready(function() {
    var form = $('#registrationForm');

    form.submit(function(event) {
        if (!form[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.addClass('was-validated');
    });

    $('#signInButton').click(function() {
        if (form[0].checkValidity()) {
            // Tutup modalregistrationModal
            $('#registrationModal').modal('hide');

            // Buka modallogin setelah 500ms (agar transisi modal terlihat lebih lancar)
            setTimeout(function() {
                $('#loginModal').modal('show');
            }, 500);
        } else {
            // Tampilkan pesan validasi
            form.addClass('was-validated');
        }
    });
});

// Reset Password Form
document.getElementById('passwordResetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var emailInput = document.getElementById('resetEmail').value;
    if (emailInput) {
        toastr.success('Your password has been reset.');
    } else {
        toastr.error('Email address is required.');
    }
});

// Registration Form
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var regEmail = document.getElementById('regEmail').value;
    var regPassword = document.getElementById('regPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (firstName && lastName && regEmail && regPassword && confirmPassword) {
        toastr.success('Registration successful.');
    } else {
        toastr.error('All fields are required.');
    }
});

// Di dalam event handler click untuk setiap tautan dropdown
$('.dropdown-menu a').click(function(e) {
    e.preventDefault(); // Mencegah tautan default
    $('.dropdown-menu a').removeClass('active'); // Menghapus kelas active dari semua tautan dropdown
    $(this).addClass('active'); // Menambahkan kelas active pada tautan yang diklik
    let selectedRole = $(this).data('role'); // Mendapatkan peran yang dipilih dari atribut data-role
    sessionStorage.setItem('role', selectedRole); // Menyimpan peran ke sesi
});

// Login Button
$(document).ready(function() {
    // Handle login form display based on role
    $(".dropdown-item").click(function() {
        var role = $(this).data('role');
        
        // Common form setup
        $("#loginUsernameField").hide();
        $("#loginCodeField").hide();
        $(".google-login").hide();
        
        // Role-specific adjustments
        if (role === 'customer') {
            $("#loginUsernameField").show();
            $(".google-login").show();
        } else if (role === 'self-service') {
            $("#loginUsernameField").show();
            $(".google-login").hide();
        } else if (role === 'admin' || role === 'driver') {
            $("#loginCodeField").show();
        }
    });

    // Handle registration form display based on role
    $(".dropdown-item").click(function() {
        var role = $(this).data('role');
        
        // Common form setup
        $("#regEmailField").hide();
        $("#regNameField").hide();
        $("#regPhoneField").hide();
        $("#regUsernameField").hide();
        $("#regCodeField").hide();
        
        // Role-specific adjustments
        if (role === 'customer') {
            $("#regEmailField").show();
            $("#regNameField").show();
            $("#regPhoneField").show();
            $("#regUsernameField").show();
        } else if (role === 'admin' || role === 'driver') {
            $("#regCodeField").show();
        }
    });
});

$(document).ready(function(){
    $('#loginForm').submit(function(e){
        e.preventDefault();
        var username = $('#loginUsername').val(); // Perbaiki selector untuk username
        var code = $('#loginCode').val(); // Perbaiki selector untuk code
        var password = $('#loginPassword').val(); // Perbaiki selector untuk password
        var selectedRole = sessionStorage.getItem('role'); // Mendapatkan peran dari sesi

        if (selectedRole === 'customer') {
            if (username === 'user' && password === 'user123') {
                sessionStorage.setItem('loginSuccess', 'Login success');
                window.location.href = 'customer_1.html';
            } else {
                toastr.error('Wrong username or password');
            }
        } else if (selectedRole === 'admin') {
            if (code === 'admin' && password === 'admin123') {
                sessionStorage.setItem('loginSuccess', 'Login success');
                window.location.href = 'admin.html';
            } else {
                toastr.error('Wrong username or password');
            }
        } else if (selectedRole === 'driver') {
            if (code === 'driver' && password === 'driver123') {
                sessionStorage.setItem('loginSuccess', 'Login success');
                window.location.href = 'driver_1.html';
            } else {
                toastr.error('Wrong username or password');
            }
        } else if (selectedRole === 'self-service') {
            if (username === 'cust' && password === 'cust123') {
                sessionStorage.setItem('loginSuccess', 'Login success');
                window.location.href = 'selfService.html';
            } else {
                toastr.error('Wrong username or password');
            }
        } else {
            toastr.error('Please select a role');
        }
    });
    document.getElementById('googleLogin').addEventListener('click', function(e) {
        e.preventDefault();
        toastr.success('Login berhasil');
        sessionStorage.setItem('role', 'customer');
        window.location.href = 'customer_1.html';
    });
    var loginSuccessMessage = sessionStorage.getItem('loginSuccess');
    if(loginSuccessMessage){
        toastr.success(loginSuccessMessage);
        sessionStorage.removeItem('loginSuccess');
    }
});

// Di dalam event handler click untuk setiap tautan dropdown
$('.dropdown-menu a').click(function(e) {
    e.preventDefault(); // Mencegah tautan default
    $('.dropdown-menu a').removeClass('active'); // Menghapus kelas active dari semua tautan dropdown
    $(this).addClass('active'); // Menambahkan kelas active pada tautan yang diklik
});

// Show Password
$(".toggle-password").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") === "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

// Show Login via Google
$(document).ready(function() {
    $(".customer-login").click(function() {
        $(".google-login").show();
    });
    $(".dropdown-item:not(.customer-login)").click(function() {
        $(".google-login").hide();
    });
});

$(document).ready(function() {
    $(".self-service").click(function() {
        $(".google-login").show();
    });
    $(".dropdown-item:not(.self-service)").click(function() {
        $(".google-login").hide();
    });
});

// Fungsi untuk menghasilkan nilai acak antara 3 dan 5
function generateRandomWeight() {
    return Math.random() < 0.5 ? 3 : 5; // Menghasilkan antara 3 dan 5 secara acak
}

// Mengatur nilai input dengan nilai acak ketika halaman dimuat
window.onload = function() {
    document.getElementById('weight-input').value = generateRandomWeight() + 'kg';
};

document.addEventListener("DOMContentLoaded", function() {
    // Initial state: hide all form elements except for detergent and washing options
    hideAllFormElements();

    // Event listeners for detergent options
    const detergentOptions = document.getElementsByName('detergent');
    detergentOptions.forEach(option => {
        option.addEventListener('change', updateOrderSummary);
    });

    // Event listener for confirm order button
    document.getElementById('confirmButton').addEventListener('click', function() {
        updateYorder();
        document.querySelector('.Yorder').style.display = 'block';
    });

    // Update order summary whenever inputs change
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', updateOrderSummary);
    });
});

document.querySelectorAll('input[name="options"]').forEach(radioButton => {
    radioButton.addEventListener('click', function() {
        if (!this.value) {
            document.getElementById('weight-label').style.display = 'none';
            document.getElementById('peritem-label').style.display = 'none';
            document.getElementById('quantity-label').style.display = 'none';
            document.getElementById('duration-label').style.display = 'none';
        }
    });
});

let weightBasedForm = document.querySelectorAll('input[id="weightbased"]');
let perItemForm = document.querySelectorAll('input[id="peritem"]');

weightBasedForm.forEach(input => {
    input.addEventListener('click', function() {
        document.querySelectorAll('input[name="options"]').forEach(radio => {
            if (radio.id === 'peritem') {
                radio.style.display = 'none';
            }
        });
    });
});

perItemForm.forEach(input => {
    input.addEventListener('click', function() {
        document.querySelectorAll('input[name="options"]').forEach(radio => {
            if (radio.id === 'weightbased') {
                radio.style.display = 'none';
            }
        });
    });
});

const washingOptions = document.getElementsByName('washing-options');
washingOptions.forEach(option => {
    option.addEventListener('change', function() {
        if (this.value === 'weightbased') {
            showWeightBasedForm();
        } else if (this.value === 'peritem') {
            showPerItemForm();
        } else {
            hideAllFormElements();
        }
    });
});

const washingOptions_2 = document.getElementsByName('washing-options_2');
washingOptions.forEach(option => {
    option.addEventListener('change', function() {
        if (this.value === 'weightbased') {
            showWeightBasedForm();
        } else if (this.value === 'peritem') {
            showPerItemForm();
        } else {
            hideAllFormElements();
        }
    });
});

function hideAllFormElements() {
    document.getElementById('weight-label').style.display = 'none';
    document.getElementById('peritem-label').style.display = 'none';
    document.getElementById('quantity-label').style.display = 'none';
    document.getElementById('duration-label').style.display = 'none';
    document.getElementById('confirmButton').style.display = 'none';
    document.querySelector('.Yorder').style.display = 'none';
}

function showWeightBasedForm() {
    hideAllFormElements();
    document.getElementById('weight-label').style.display = 'block';
    document.getElementById('duration-label').style.display = 'block';
    document.getElementById('confirmButton').style.display = 'block';
}

function showPerItemForm() {
    hideAllFormElements();
    document.getElementById('peritem-label').style.display = 'block';
    document.getElementById('quantity-label').style.display = 'block';
    document.getElementById('duration-label').style.display = 'block';
    document.getElementById('confirmButton').style.display = 'block';
}

function updateOrderSummary() {
    const detergentPrice = getDetergentPrice();
    const washingPrice = getWashingPrice();
    const durationPrice = getDurationPrice();
    const subtotal = detergentPrice + washingPrice + durationPrice;

    document.getElementById('detergentRow').innerText = "Detergent";
    document.getElementById('detergentPrice').innerText = "Rp " + detergentPrice;
    document.getElementById('weightRow').innerText = "Washing";
    document.getElementById('weightPrice').innerText = "Rp " + washingPrice;
    document.getElementById('durationRow').innerText = "Duration";
    document.getElementById('durationPrice').innerText = "Rp " + durationPrice;
    document.getElementById('subtotalPrice').innerText = "Rp " + subtotal;
}

function getDetergentPrice() {
    const selectedDetergent = document.querySelector('input[name="washing-options"]:checked');
    if (selectedDetergent) {
        if (selectedDetergent.value === "Detergent from laundry") {
            return 5000;
        } else if (selectedDetergent.value === "I don't need detergent") {
            return 0;
        }
    }
    return 0; // Jika tidak ada deterjen yang dipilih
}

function getWashingPrice() {
    const selectedWashing = document.querySelector('input[name="washing"]:checked');
    if (selectedWashing) {
        if (selectedWashing.value === "weightbased") {
            const weight = parseFloat(document.getElementById('weight-input').value) || 0;
            return weight <= 3 ? 12000 : 20000;
        } else if (selectedWashing.value === "peritem") {
            const item = document.querySelector('#peritem-label select').value;
            const quantity = parseInt(document.querySelector('#quantity-label input').value) || 0;
            let itemPrice = 0;

            switch (item) {
                case "Alma mater jacket":
                    itemPrice = 50000;
                    break;
                case "Dress":
                    itemPrice = 100000;
                    break;
                case "Bedcover":
                    itemPrice = 10000;
                    break;
                case "Jacket":
                    itemPrice = 8000;
                    break;
            }

            return itemPrice * quantity;
        }
    }
    return 0;
}

function getDurationPrice() {
    const duration = document.querySelector('#duration-label select').value;
    switch (duration) {
        case "30minutes":
            return 5000;
        case "60minutes":
            return 8000;
        case "90minutes":
            return 14000;
        default:
            return 0;
    }
}

function updateYorder() {
    // Show QRIS image
    document.querySelector('.Yorder img').style.display = 'block';

    // Calculate order summary
    updateOrderSummary();

    // Make the Yorder element visible
    document.querySelector('.Yorder').style.display = 'block';
}

document.getElementById('confirmButton').addEventListener('click', function() {
    updateYorder();
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.classList.add('desktop-view');
    document.querySelector('.Yorder').style.display = 'block';
});

function payHereButton() {
    toastr.success('Payment success. Please take your washing coins and receipt');
};

function payHereButtonAdmin() {
    toastr.success('Payment success. The receipt has been printed');
};

// Self-Pickup Notification
function handleSelfPickup() {
    toastr.success('Please pick up your order');
    $('.selfPickupBtn').prop('disabled', true);
    $('.deliveryBtn').prop('disabled', true);
}

// Confirm Delivery Notification
function handleConfirmDelivery() {
    var addressInput = $('#addressInput');
    if (addressInput.val().trim().toLowerCase() === 'siwalankerto') {
        toastr.success('Your order is being delivered to ' + addressInput.val());
        $('.selfPickupBtn').prop('disabled', true);
        $('.deliveryBtn').prop('disabled', true);
        $('#deliveryModal').modal('hide');
    } else {
        toastr.error('Sorry, we cannot deliver to this address as it is too far.');
    }
}

$(document).ready(function() {
    // Event delegation for Delivery button
    $(document).on('click', '.deliveryBtn', function() {
        $('#deliveryModal').modal('show');
    });
});

// CUSTOMER2.HTML
function askToPickup() {
    var address_compare = "siwalankerto";
    var address = document.getElementById("cust2_address").value.trim().toLowerCase();
    var name = document.getElementById("cust2_name").value.trim();
    var phoneNumber = document.getElementById("cust2_phoneNumber").value.trim();

    if (name && phoneNumber && address === address_compare) {
        toastr.success('Your order is being picked up.');
        setTimeout(function() {
            toastr.success('Your order has been picked up.');
            $('#photoEvidenceContainer').show();
        }, 5000);
    } else {
        if (!name || !phoneNumber) {
            toastr.error('Please fill in all required fields.');
        } else if (address !== address_compare) {
            toastr.error('Sorry, we cannot deliver to this address as it is too far.');
        }
    }
}

// DRIVER.HTML
function openTextPopup() {
    document.getElementById("textPopup").style.display = "block";
}

function openCallPopup() {
    document.getElementById("callPopup").style.display = "block";
}

function closePopup(id) {
    var popup = document.getElementById(id);
    popup.style.display = "none";
}

window.onclick = function(event) {
    var textPopup = document.getElementById("textPopup");
    var callPopup = document.getElementById("callPopup");

    if (event.target == textPopup) {
        textPopup.style.display = "none";
    } else if (event.target == callPopup) {
        callPopup.style.display = "none";
    }
}

function showOrderCompletedToastr_disable() {
    toastr.success('Thank you for ordering us!');
    document.getElementById('orderCompletedButton').disabled = true;
}

function showOrderCompletedToastr() {
    toastr.success('Thank you for ordering us!');
}

// Fungsi untuk membuka popup
function openPopup(type) {
    var popup = document.getElementById(type + "Popup");
    popup.style.display = "block";
}

// Fungsi untuk menutup popup
function closePopup(id) {
    var popup = document.getElementById(id);
    popup.style.display = "none";
}

// Menutup popup jika pengguna mengklik di luar konten popup
window.onclick = function(event) {
    var textPopup = document.getElementById("textPopup");
    var callPopup = document.getElementById("callPopup");

    if (event.target == textPopup) {
        textPopup.style.display = "none";
    } else if (event.target == callPopup) {
        callPopup.style.display = "none";
    }
}

function showOrderCompletedToastr() {
    toastr.success('Thank you!', 'Order Completed', {
        iconClass: 'toast-success'
    });
}

// Fungsi untuk mengaktifkan tombol "Order Completed" setelah mengunggah foto
function enableOrderCompletedButton() {
    var fileInput = document.getElementById('photoEvidence');
    var orderCompletedButton = document.getElementById('orderCompletedButton');
    if (fileInput.files.length > 0) {
        orderCompletedButton.disabled = false;
    } else {
        orderCompletedButton.disabled = true;
    }
}

// ADMIN.HTML
document.addEventListener("DOMContentLoaded", function() {
    // Initial state: hide all form elements except for detergent and washing options
    hideAllFormElements();

    // Event listener for confirm order button
    document.getElementById('confirmButton-admin').addEventListener('click', function() {
        updateYorderAdmin();
        document.querySelector('.Yorder-admin').style.display = 'block';
    });

    // Update order summary whenever inputs change
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', updateOrderSummaryAdmin);
    });
});

document.querySelectorAll('input[name="options"]').forEach(radioButton => {
    radioButton.addEventListener('click', function() {
        if (!this.value) {
            document.getElementById('weight-label').style.display = 'none';
            document.getElementById('peritem-label').style.display = 'none';
            document.getElementById('quantity-label').style.display = 'none';
            document.getElementById('duration-label').style.display = 'none';
        }
    });
});

function showWeightBasedFormAdmin() {
    hideAllFormElementsAdmin();
    document.getElementById('weight-label-admin').style.display = 'block';
    document.getElementById('confirmButton-admin').style.display = 'block';
}

function showPerItemFormAdmin() {
    hideAllFormElementsAdmin();
    document.getElementById('peritem-label-admin').style.display = 'block';
    document.getElementById('quantity-label-admin').style.display = 'block';
    document.getElementById('confirmButton-admin').style.display = 'block';
}

function hideAllFormElementsAdmin() {
    document.getElementById('weight-label-admin').style.display = 'none';
    document.getElementById('peritem-label-admin').style.display = 'none';
    document.getElementById('quantity-label-admin').style.display = 'none';
    document.getElementById('confirmButton-admin').style.display = 'none';
    document.querySelector('.Yorder-admin').style.display = 'none';
}

function updateYorderAdmin() {
    // Display the Yorder-admin section
    document.querySelector('.Yorder-admin').classList.remove('hidden');
    document.querySelector('.Yorder-admin').style.display = 'block';

    // Show QRIS image
    document.querySelector('.Yorder-admin img').style.display = 'block';

    // Calculate order summary
    updateOrderSummaryAdmin();

    // Include customer details in the order summary
    const customerName = document.querySelector('input[name="fullname"]').value;
    const customerPhone = document.querySelector('input[name="phoneNumber"]').value;
    document.getElementById('customerNameRow').innerText = "Customer Name: " + customerName;
    document.getElementById('customerPhoneRow').innerText = "Customer Phone: " + customerPhone;
}

// Ensure this function is called when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('confirmButton-admin').addEventListener('click', updateYorderAdmin);
});

function updateOrderSummaryAdmin() {
    var detergentPriceAdmin = 5000; // Set detergent price

    const washingPriceAdmin = getWashingPriceAdmin();
    const subtotal = detergentPriceAdmin + washingPriceAdmin;

    document.getElementById('detergentRow').innerText = "Detergent";
    document.getElementById('detergentPrice').innerText = "Rp " + detergentPriceAdmin;
    document.getElementById('weightRow').innerText = "Washing";
    document.getElementById('weightPrice').innerText = "Rp " + washingPriceAdmin;
    document.getElementById('subtotalPrice').innerText = "Rp " + subtotal;
}

function getWashingPriceAdmin() {
    const selectedWashing = document.querySelector('input[name="washing"]:checked');
    if (selectedWashing) {
        if (selectedWashing.value === "weightbased") {
            const weight = parseFloat(document.getElementById('weight-input-admin').value) || 0;
            return weight <= 3 ? 12000 : 20000;
        } else if (selectedWashing.value === "peritem") {
            const item = document.getElementById('peritem-select-admin').value;
            const quantity = parseInt(document.getElementById('quantity-input-admin').value) || 0;
            let itemPrice = 0;

            switch (item) {
                case "Alma mater jacket":
                    itemPrice = 50000;
                    break;
                case "Dress":
                    itemPrice = 100000;
                    break;
                case "Bedcover":
                    itemPrice = 10000;
                    break;
                case "Jacket":
                    itemPrice = 8000;
                    break;
                case "Shoes":
                    itemPrice = 25000;
                    break;
            }

            return itemPrice * quantity;
        }
    }
    return 0;
}

function togglePaymentOptions() {
    const qrisContainer = document.getElementById('qrisContainer');
    const qrisRadio = document.getElementById('qris');
    if (qrisRadio.checked) {
        qrisContainer.style.display = 'block';
    } else {
        qrisContainer.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const paymentRadios = document.getElementsByName('payment');
    paymentRadios.forEach(radio => {
        radio.addEventListener('click', togglePaymentOptions);
    });
    togglePaymentOptions(); // Set initial state
});


// CONTACTS.JS
class Contacts {
    constructor() {
      this.ID = null;
      this.username = null;
      this.password = null;
      this.alamat = null;
      this.Email = null;
      this.no_telp = null;
    }
  
    addCust() {
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var regEmail = document.getElementById('regEmail').value;
            var regPassword = document.getElementById('regPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            if (firstName && lastName && regEmail && regPassword && confirmPassword) {
                toastr.success('Registration successful.');
            } else {
                toastr.error('All fields are required.');
            }
        });
    }
  
    getCust() {
      // Check data from database
    }
  
    getAdmin() {
      // Check data from database
    }
  
    getDriver() {
      // Check data from database
    }
  
    updateNewPassword() {
        document.getElementById('passwordResetForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var emailInput = document.getElementById('resetEmail').value;
            if (emailInput) {
                toastr.success('Your password has been reset.');
            } else {
                toastr.error('Email address is required.');
            }
        });
    }
  
    searchingDriverAvailable(time) {
      // Connecting with driver
    }
  }
  
  // Export the Contacts class
//   export default Contacts;
  



// DELIVERY SERVICE.JS
class DeliveryService {
    constructor() {
      // Default constructor
    }
  
    /**
     * @param {string} AlamatTujuan
     */
    delivery(AlamatTujuan) {
        function handleConfirmDelivery() {
            var addressInput = $('#addressInput');
            if (addressInput.val().trim().toLowerCase() === 'siwalankerto') {
                toastr.success('Your order is being delivered to ' + addressInput.val());
                $('.selfPickupBtn').prop('disabled', true);
                $('.deliveryBtn').prop('disabled', true);
                $('#deliveryModal').modal('hide');
            } else {
                toastr.error('Sorry, we cannot deliver to this address as it is too far.');
            }
        }
    }
  
    /**
     * @param {string} fotoBarang
     */
    saveBukti(fotoBarang) {
        function enableOrderCompletedButton() {
            var fileInput = document.getElementById('photoEvidence');
            var orderCompletedButton = document.getElementById('orderCompletedButton');
            if (fileInput.files.length > 0) {
                orderCompletedButton.disabled = false;
            } else {
                orderCompletedButton.disabled = true;
            }
        }
    }
  
    updatePosisiDriver() {
      // Maps Location
    }
  
    /**
     * @param {string} DriverPos
     */
    updatePosisi(DriverPos) {
      // Maps Location
    }
  
    /**
     * @param {string} AlamatLaundry
     * @param {string} AlamatTujuan
     */
    buatRute(AlamatLaundry, AlamatTujuan) {
      // Maps Location
    }
  
    /**
     * @param {string} time
     * @param {string} AlamatAsal
     * @param {string} AlamatTujuan
     */
    pickUp(time, AlamatAsal, AlamatTujuan) {
      // Maps Location
    }
  }
  
  // Export the DeliveryService class
//   export default DeliveryService;
  


// HAK_AKSES.JS
class Hak_Akses {
    Mengakses_customer() {
      // TODO implement here
    }
  
    Mengakses_admin() {
      // TODO implement here
    }
  
    Mengakses_driver() {
      // TODO implement here
    }
  }
  


// LAUNDRY SERVICE.JS
class Laundry_Service {
    constructor() {
      // ...
    }
  
    show_pilihan() {
        document.querySelectorAll('input[name="options"]').forEach(radioButton => {
            radioButton.addEventListener('click', function() {
                if (!this.value) {
                    document.getElementById('weight-label').style.display = 'none';
                    document.getElementById('peritem-label').style.display = 'none';
                    document.getElementById('quantity-label').style.display = 'none';
                    document.getElementById('duration-label').style.display = 'none';
                }
            });
        });
        
        let weightBasedForm = document.querySelectorAll('input[id="weightbased"]');
        let perItemForm = document.querySelectorAll('input[id="peritem"]');
        
        weightBasedForm.forEach(input => {
            input.addEventListener('click', function() {
                document.querySelectorAll('input[name="options"]').forEach(radio => {
                    if (radio.id === 'peritem') {
                        radio.style.display = 'none';
                    }
                });
            });
        });
        
        perItemForm.forEach(input => {
            input.addEventListener('click', function() {
                document.querySelectorAll('input[name="options"]').forEach(radio => {
                    if (radio.id === 'weightbased') {
                        radio.style.display = 'none';
                    }
                });
            });
        });
    }
  
    get_jenisKiloan() {
        document.querySelectorAll('input[name="options"]').forEach(radioButton => {
            radioButton.addEventListener('click', function() {
                if (!this.value) {
                    document.getElementById('weight-label').style.display = 'none';
                    document.getElementById('peritem-label').style.display = 'none';
                    document.getElementById('quantity-label').style.display = 'none';
                    document.getElementById('duration-label').style.display = 'none';
                }
            });
        });
    }
  
    set_order() {
        function updateOrderSummary() {
            const detergentPrice = getDetergentPrice();
            const washingPrice = getWashingPrice();
            const durationPrice = getDurationPrice();
            const subtotal = detergentPrice + washingPrice + durationPrice;
        
            document.getElementById('detergentRow').innerText = "Detergent";
            document.getElementById('detergentPrice').innerText = "Rp " + detergentPrice;
            document.getElementById('weightRow').innerText = "Washing";
            document.getElementById('weightPrice').innerText = "Rp " + washingPrice;
            document.getElementById('durationRow').innerText = "Duration";
            document.getElementById('durationPrice').innerText = "Rp " + durationPrice;
            document.getElementById('subtotalPrice').innerText = "Rp " + subtotal;
        }
    }
  
    set_jenisKiloan() {
        document.querySelectorAll('input[name="options"]').forEach(radioButton => {
            radioButton.addEventListener('click', function() {
                if (!this.value) {
                    document.getElementById('weight-label').style.display = 'none';
                    document.getElementById('peritem-label').style.display = 'none';
                    document.getElementById('quantity-label').style.display = 'none';
                    document.getElementById('duration-label').style.display = 'none';
                }
            });
        });
    }
  
    set_beratLaundry() {
        document.querySelectorAll('input[name="options"]').forEach(radioButton => {
            radioButton.addEventListener('click', function() {
                if (!this.value) {
                    document.getElementById('weight-label').style.display = 'none';
                    document.getElementById('peritem-label').style.display = 'none';
                    document.getElementById('quantity-label').style.display = 'none';
                    document.getElementById('duration-label').style.display = 'none';
                }
            });
        });
    }
  
    set_pilihanWaktu() {
        document.querySelectorAll('input[name="options"]').forEach(radioButton => {
            radioButton.addEventListener('click', function() {
                if (!this.value) {
                    document.getElementById('weight-label').style.display = 'none';
                    document.getElementById('peritem-label').style.display = 'none';
                    document.getElementById('quantity-label').style.display = 'none';
                    document.getElementById('duration-label').style.display = 'none';
                }
            });
        });
    }
  
    set_kategoriSatuan() {
        document.querySelectorAll('input[name="options"]').forEach(radioButton => {
            radioButton.addEventListener('click', function() {
                if (!this.value) {
                    document.getElementById('weight-label').style.display = 'none';
                    document.getElementById('peritem-label').style.display = 'none';
                    document.getElementById('quantity-label').style.display = 'none';
                    document.getElementById('duration-label').style.display = 'none';
                }
            });
        });
    }
  
    Delivery() {
      // Opening the delivery User Interface
    }
  
    cek_pembayaran() {
        document.getElementById('confirmButton').addEventListener('click', function() {
            updateYorder();
            document.querySelector('.Yorder').style.display = 'block';
        });
    }
  
    pilihanSabun_noted() {
        function getDetergentPrice() {
            const selectedDetergent = document.querySelector('input[name="washing-options"]:checked');
            if (selectedDetergent) {
                if (selectedDetergent.value === "Detergent from laundry") {
                    return 5000;
                } else if (selectedDetergent.value === "I don't need detergent") {
                    return 0;
                }
            }
            return 0; // Jika tidak ada deterjen yang dipilih
        }
    }
  
    konfirmPesanan() {
        function updateYorder() {
            // Show QRIS image
            document.querySelector('.Yorder img').style.display = 'block';
        
            // Calculate order summary
            updateOrderSummary();
        
            // Make the Yorder element visible
            document.querySelector('.Yorder').style.display = 'block';
        }
    }
  
    LoadmetodePembayaran() {
        function updateYorder() {
            // Show QRIS image
            document.querySelector('.Yorder img').style.display = 'block';
        
            // Calculate order summary
            updateOrderSummary();
        
            // Make the Yorder element visible
            document.querySelector('.Yorder').style.display = 'block';
        }
    }
  
    UpdateStatus(Sudah_Dibayar = "Sudah Dibayar") {
        function payHereButton() {
            toastr.success('Payment success. Please take your washing coins and receipt');
        };
        
        function payHereButtonAdmin() {
            toastr.success('Payment success. The receipt has been printed');
        };
    }
  
    UpdateStatus1(sedang_diproses = "sedang diproses") {
        function askToPickup() {
            var address_compare = "siwalankerto";
            var address = document.getElementById("cust2_address").value.trim().toLowerCase();
            var name = document.getElementById("cust2_name").value.trim();
            var phoneNumber = document.getElementById("cust2_phoneNumber").value.trim();
        
            if (name && phoneNumber && address === address_compare) {
                toastr.success('Your order is being picked up.');
                setTimeout(function() {
                    toastr.success('Your order has been picked up.');
                    $('#photoEvidenceContainer').show();
                }, 5000);
            } else {
                if (!name || !phoneNumber) {
                    toastr.error('Please fill in all required fields.');
                } else if (address !== address_compare) {
                    toastr.error('Sorry, we cannot deliver to this address as it is too far.');
                }
            }
        }
    }
  
    UpdateStatus2(sudah_selesai_diproses = "sudah selesai diproses") {
        function askToPickup() {
            var address_compare = "siwalankerto";
            var address = document.getElementById("cust2_address").value.trim().toLowerCase();
            var name = document.getElementById("cust2_name").value.trim();
            var phoneNumber = document.getElementById("cust2_phoneNumber").value.trim();
        
            if (name && phoneNumber && address === address_compare) {
                toastr.success('Your order is being picked up.');
                setTimeout(function() {
                    toastr.success('Your order has been picked up.');
                    $('#photoEvidenceContainer').show();
                }, 5000);
            } else {
                if (!name || !phoneNumber) {
                    toastr.error('Please fill in all required fields.');
                } else if (address !== address_compare) {
                    toastr.error('Sorry, we cannot deliver to this address as it is too far.');
                }
            }
        }
    }
  
    UpdateStatus3(diambil_oleh_customer = "diambil oleh customer") {
        function askToPickup() {
            var address_compare = "siwalankerto";
            var address = document.getElementById("cust2_address").value.trim().toLowerCase();
            var name = document.getElementById("cust2_name").value.trim();
            var phoneNumber = document.getElementById("cust2_phoneNumber").value.trim();
        
            if (name && phoneNumber && address === address_compare) {
                toastr.success('Your order is being picked up.');
                setTimeout(function() {
                    toastr.success('Your order has been picked up.');
                    $('#photoEvidenceContainer').show();
                }, 5000);
            } else {
                if (!name || !phoneNumber) {
                    toastr.error('Please fill in all required fields.');
                } else if (address !== address_compare) {
                    toastr.error('Sorry, we cannot deliver to this address as it is too far.');
                }
            }
        }
    }
  
    UpdateStatus4(Done = "Done") {
        function payHereButton() {
            toastr.success('Payment success. Please take your washing coins and receipt');
        };
        
        function payHereButtonAdmin() {
            toastr.success('Payment success. The receipt has been printed');
        };
    }
  }
  


// LOGIN SERVICE.JS
class Login_Service {
    constructor() {
      // ...
    }
  
    cek_cust() {
        $(document).ready(function() {
            // Handle login form display based on role
            $(".dropdown-item").click(function() {
                var role = $(this).data('role');
                
                // Common form setup
                $("#loginUsernameField").hide();
                $("#loginCodeField").hide();
                $(".google-login").hide();
                
                // Role-specific adjustments
                if (role === 'customer') {
                    $("#loginUsernameField").show();
                    $(".google-login").show();
                } else if (role === 'self-service') {
                    $("#loginUsernameField").show();
                    $(".google-login").hide();
                } else if (role === 'admin' || role === 'driver') {
                    $("#loginCodeField").show();
                }
            });
        
            // Handle registration form display based on role
            $(".dropdown-item").click(function() {
                var role = $(this).data('role');
                
                // Common form setup
                $("#regEmailField").hide();
                $("#regNameField").hide();
                $("#regPhoneField").hide();
                $("#regUsernameField").hide();
                $("#regCodeField").hide();
                
                // Role-specific adjustments
                if (role === 'customer') {
                    $("#regEmailField").show();
                    $("#regNameField").show();
                    $("#regPhoneField").show();
                    $("#regUsernameField").show();
                } else if (role === 'admin' || role === 'driver') {
                    $("#regCodeField").show();
                }
            });
        });
    }
  
    cek_admin() {
        $(document).ready(function() {
            // Handle login form display based on role
            $(".dropdown-item").click(function() {
                var role = $(this).data('role');
                
                // Common form setup
                $("#loginUsernameField").hide();
                $("#loginCodeField").hide();
                $(".google-login").hide();
                
                // Role-specific adjustments
                if (role === 'customer') {
                    $("#loginUsernameField").show();
                    $(".google-login").show();
                } else if (role === 'self-service') {
                    $("#loginUsernameField").show();
                    $(".google-login").hide();
                } else if (role === 'admin' || role === 'driver') {
                    $("#loginCodeField").show();
                }
            });
        
            // Handle registration form display based on role
            $(".dropdown-item").click(function() {
                var role = $(this).data('role');
                
                // Common form setup
                $("#regEmailField").hide();
                $("#regNameField").hide();
                $("#regPhoneField").hide();
                $("#regUsernameField").hide();
                $("#regCodeField").hide();
                
                // Role-specific adjustments
                if (role === 'customer') {
                    $("#regEmailField").show();
                    $("#regNameField").show();
                    $("#regPhoneField").show();
                    $("#regUsernameField").show();
                } else if (role === 'admin' || role === 'driver') {
                    $("#regCodeField").show();
                }
            });
        });
    }
  
    cek_driver() {
        $(document).ready(function() {
            // Handle login form display based on role
            $(".dropdown-item").click(function() {
                var role = $(this).data('role');
                
                // Common form setup
                $("#loginUsernameField").hide();
                $("#loginCodeField").hide();
                $(".google-login").hide();
                
                // Role-specific adjustments
                if (role === 'customer') {
                    $("#loginUsernameField").show();
                    $(".google-login").show();
                } else if (role === 'self-service') {
                    $("#loginUsernameField").show();
                    $(".google-login").hide();
                } else if (role === 'admin' || role === 'driver') {
                    $("#loginCodeField").show();
                }
            });
        
            // Handle registration form display based on role
            $(".dropdown-item").click(function() {
                var role = $(this).data('role');
                
                // Common form setup
                $("#regEmailField").hide();
                $("#regNameField").hide();
                $("#regPhoneField").hide();
                $("#regUsernameField").hide();
                $("#regCodeField").hide();
                
                // Role-specific adjustments
                if (role === 'customer') {
                    $("#regEmailField").show();
                    $("#regNameField").show();
                    $("#regPhoneField").show();
                    $("#regUsernameField").show();
                } else if (role === 'admin' || role === 'driver') {
                    $("#regCodeField").show();
                }
            });
        });
    }
}
  


// SIGNUPSERVICE.JS
class Sign_Up_Service {
    constructor() {
      // ...
    }
  
    make_cust_acc() {
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var regEmail = document.getElementById('regEmail').value;
            var regPassword = document.getElementById('regPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            if (firstName && lastName && regEmail && regPassword && confirmPassword) {
                toastr.success('Registration successful.');
            } else {
                toastr.error('All fields are required.');
            }
        });
    }
  
    make_admin_acc() {
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var regEmail = document.getElementById('regEmail').value;
            var regPassword = document.getElementById('regPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            if (firstName && lastName && regEmail && regPassword && confirmPassword) {
                toastr.success('Registration successful.');
            } else {
                toastr.error('All fields are required.');
            }
        });
    }
  
    make_driver_acc() {
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var regEmail = document.getElementById('regEmail').value;
            var regPassword = document.getElementById('regPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            if (firstName && lastName && regEmail && regPassword && confirmPassword) {
                toastr.success('Registration successful.');
            } else {
                toastr.error('All fields are required.');
            }
        });
    }
  }
  


// TRANSAKSI.JS
class Transaksi {
    constructor() {
      this.ID = null;
      this.harga = null;
      this.tanggal = null;
      this.jenis_Pembayaran = null;
      this.Status = null;
    }
  
    cek_pembayaran() {
        document.getElementById('confirmButton').addEventListener('click', function() {
            updateYorder();
            document.querySelector('.Yorder').style.display = 'block';
        });
    }
  
    getTotal() {
        function updateOrderSummary() {
            const detergentPrice = getDetergentPrice();
            const washingPrice = getWashingPrice();
            const durationPrice = getDurationPrice();
            const subtotal = detergentPrice + washingPrice + durationPrice;
        
            document.getElementById('detergentRow').innerText = "Detergent";
            document.getElementById('detergentPrice').innerText = "Rp " + detergentPrice;
            document.getElementById('weightRow').innerText = "Washing";
            document.getElementById('weightPrice').innerText = "Rp " + washingPrice;
            document.getElementById('durationRow').innerText = "Duration";
            document.getElementById('durationPrice').innerText = "Rp " + durationPrice;
            document.getElementById('subtotalPrice').innerText = "Rp " + subtotal;
        }
    }
  
    GetmetodePembayaran() {
        function togglePaymentOptions() {
            const qrisContainer = document.getElementById('qrisContainer');
            const qrisRadio = document.getElementById('qris');
            if (qrisRadio.checked) {
                qrisContainer.style.display = 'block';
            } else {
                qrisContainer.style.display = 'none';
            }
        }
    }
  
    konfirmPesanan() {
        function payHereButton() {
            toastr.success('Payment success. Please take your washing coins and receipt');
        };
        
        function payHereButtonAdmin() {
            toastr.success('Payment success. The receipt has been printed');
        };
    }
  
    LoadTransaksi() {
        function updateOrderSummary() {
            const detergentPrice = getDetergentPrice();
            const washingPrice = getWashingPrice();
            const durationPrice = getDurationPrice();
            const subtotal = detergentPrice + washingPrice + durationPrice;
        
            document.getElementById('detergentRow').innerText = "Detergent";
            document.getElementById('detergentPrice').innerText = "Rp " + detergentPrice;
            document.getElementById('weightRow').innerText = "Washing";
            document.getElementById('weightPrice').innerText = "Rp " + washingPrice;
            document.getElementById('durationRow').innerText = "Duration";
            document.getElementById('durationPrice').innerText = "Rp " + durationPrice;
            document.getElementById('subtotalPrice').innerText = "Rp " + subtotal;
        }
    }
  
    Melakukan_Pembayaran(cust, order) {
        function updateOrderSummary() {
            const detergentPrice = getDetergentPrice();
            const washingPrice = getWashingPrice();
            const durationPrice = getDurationPrice();
            const subtotal = detergentPrice + washingPrice + durationPrice;
        
            document.getElementById('detergentRow').innerText = "Detergent";
            document.getElementById('detergentPrice').innerText = "Rp " + detergentPrice;
            document.getElementById('weightRow').innerText = "Washing";
            document.getElementById('weightPrice').innerText = "Rp " + washingPrice;
            document.getElementById('durationRow').innerText = "Duration";
            document.getElementById('durationPrice').innerText = "Rp " + durationPrice;
            document.getElementById('subtotalPrice').innerText = "Rp " + subtotal;
        }
    }
  
    UpdateStatus(Sudah_Dibayar = "Sudah Dibayar") {
        function payHereButton() {
            toastr.success('Payment success. Please take your washing coins and receipt');
        };
        
        function payHereButtonAdmin() {
            toastr.success('Payment success. The receipt has been printed');
        };
    }
  
    UpdateStatus1(sedang_diproses = "sedang diproses") {
        function askToPickup() {
            var address_compare = "siwalankerto";
            var address = document.getElementById("cust2_address").value.trim().toLowerCase();
            var name = document.getElementById("cust2_name").value.trim();
            var phoneNumber = document.getElementById("cust2_phoneNumber").value.trim();
        
            if (name && phoneNumber && address === address_compare) {
                toastr.success('Your order is being picked up.');
                setTimeout(function() {
                    toastr.success('Your order has been picked up.');
                    $('#photoEvidenceContainer').show();
                }, 5000);
            } else {
                if (!name || !phoneNumber) {
                    toastr.error('Please fill in all required fields.');
                } else if (address !== address_compare) {
                    toastr.error('Sorry, we cannot deliver to this address as it is too far.');
                }
            }
        }
    }
  
    UpdateStatus2(sudah_selesai_diproses = "sudah selesai diproses") {
        function askToPickup() {
            var address_compare = "siwalankerto";
            var address = document.getElementById("cust2_address").value.trim().toLowerCase();
            var name = document.getElementById("cust2_name").value.trim();
            var phoneNumber = document.getElementById("cust2_phoneNumber").value.trim();
        
            if (name && phoneNumber && address === address_compare) {
                toastr.success('Your order is being picked up.');
                setTimeout(function() {
                    toastr.success('Your order has been picked up.');
                    $('#photoEvidenceContainer').show();
                }, 5000);
            } else {
                if (!name || !phoneNumber) {
                    toastr.error('Please fill in all required fields.');
                } else if (address !== address_compare) {
                    toastr.error('Sorry, we cannot deliver to this address as it is too far.');
                }
            }
        }
    }
  
    UpdateStatus3(diambil_oleh_customer = "diambil oleh customer") {
        function askToPickup() {
            var address_compare = "siwalankerto";
            var address = document.getElementById("cust2_address").value.trim().toLowerCase();
            var name = document.getElementById("cust2_name").value.trim();
            var phoneNumber = document.getElementById("cust2_phoneNumber").value.trim();
        
            if (name && phoneNumber && address === address_compare) {
                toastr.success('Your order is being picked up.');
                setTimeout(function() {
                    toastr.success('Your order has been picked up.');
                    $('#photoEvidenceContainer').show();
                }, 5000);
            } else {
                if (!name || !phoneNumber) {
                    toastr.error('Please fill in all required fields.');
                } else if (address !== address_compare) {
                    toastr.error('Sorry, we cannot deliver to this address as it is too far.');
                }
            }
        }
    }
  
    UpdateStatus4(Done = "Done") {
        function payHereButton() {
            toastr.success('Payment success. Please take your washing coins and receipt');
        };
        
        function payHereButtonAdmin() {
            toastr.success('Payment success. The receipt has been printed');
        };
    }
}
  