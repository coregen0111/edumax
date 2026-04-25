// Edumax Static Copy Logic

// Preloader Logic
const preloader = document.getElementById('preloader');
const bar = document.getElementById('preloader-bar');

// Disable scroll while loading
document.body.style.overflow = 'hidden';

// Start initial progress
if (bar) {
    setTimeout(() => {
        bar.style.width = '30%';
    }, 100);
    
    setTimeout(() => {
        bar.style.width = '60%';
    }, 400);
}

window.addEventListener('load', () => {
    if (bar) bar.style.width = '100%';
    
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            document.body.style.overflow = 'auto'; // Re-enable scroll
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 800);
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const navItems = document.querySelectorAll('.nav-item');

    // Handle Scroll Styling for Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled', 'shadow-lg');
            header.classList.remove('shadow-md');
        } else {
            header.classList.remove('scrolled', 'shadow-lg');
            header.classList.add('shadow-md');
        }
        
        // Highlight active section in navigation
        highlightActiveSection();
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (!isOpen) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            mobileMenu.classList.add('animate-in'); // Add animation class if desired
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Scroll to section function (global for onclick in HTML)
    window.scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');

            element.scrollIntoView({ behavior: 'smooth' });
            
            // Set active state on desktop nav
            navItems.forEach(item => {
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('text-blue-600', 'border-b-2', 'border-yellow-400');
                    item.classList.remove('text-gray-700');
                } else {
                    item.classList.remove('text-blue-600', 'border-b-2', 'border-yellow-400');
                    item.classList.add('text-gray-700');
                }
            });
        }
    };

    // Auto-highlighting sections during scroll
    function highlightActiveSection() {
        const sections = ['home', 'english', 'kids', 'assignments', 'contact'];
        let activeSec = 'home';
        
        const scrollPos = window.scrollY + 100; // Offset for better detection

        sections.forEach(s => {
            const el = document.getElementById(s);
            if (el && scrollPos >= el.offsetTop) {
                activeSec = s;
            }
        });

        navItems.forEach(item => {
            if (item.getAttribute('data-section') === activeSec) {
                item.classList.add('text-blue-600', 'border-b-2', 'border-yellow-400');
                item.classList.remove('text-gray-700');
            } else {
                item.classList.remove('text-blue-600', 'border-b-2', 'border-yellow-400');
                item.classList.add('text-gray-700');
            }
        });
    }

    // Initialize state
    highlightActiveSection();
});

// Payment Modal & Razorpay Logic
const paymentModal = document.getElementById('payment-modal');
const paymentForm = document.getElementById('payment-form');

window.openPaymentModal = () => {
    if (paymentModal) {
        paymentModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closePaymentModal = () => {
    if (paymentModal) {
        paymentModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

window.closeSuccessModal = () => {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('student-name').value;
        const phone = document.getElementById('student-phone').value;
        const email = document.getElementById('student-email').value;
        const course = document.getElementById('course-name').value;
        const amount = document.getElementById('fee-amount').value;

        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const options = {
            "key": "rzp_live_ShhTFuArxuJjdt",
            "amount": amount * 100, // Amount in paise
            "currency": "INR",
            "name": "Edumax Institute",
            "description": `Fee for ${course}`,
            "image": "images/edumax-logo.png",
            "handler": function (response) {
                // Populate Success Details
                document.getElementById('receipt-name').innerText = name;
                document.getElementById('receipt-course').innerText = course;
                document.getElementById('receipt-amount').innerText = `₹${amount}`;
                document.getElementById('receipt-id').innerText = response.razorpay_payment_id;

                // WhatsApp Link Generation
                const waMessage = `*Payment Confirmation - Edumax Institute*%0A%0A*Name:* ${name}%0A*Course:* ${course}%0A*Amount:* ₹${amount}%0A*Payment ID:* ${response.razorpay_payment_id}%0A%0AStatus: Paid Successfully.`;
                const waLink = `https://wa.me/919039662559?text=${waMessage}`;
                document.getElementById('whatsapp-confirm-btn').href = waLink;

                // Show Success Modal
                closePaymentModal();
                const successModal = document.getElementById('success-modal');
                if (successModal) {
                    successModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
                paymentForm.reset();
            },
            "prefill": {
                "name": name,
                "email": email,
                "contact": phone
            },
            "notes": {
                "course": course,
                "student_name": name
            },
            "theme": {
                "color": "#2563eb"
            }
        };

        try {
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', function (response){
                alert(`Payment Failed: ${response.error.description}`);
            });
            rzp.open();
        } catch (error) {
            console.error('Razorpay failed to load:', error);
            alert('Payment gateway is currently unavailable. Please try again later.');
        }
    });
}
