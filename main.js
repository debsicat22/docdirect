// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll to booking function
        function scrollToBooking() {
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Booking form submission
        function submitBooking(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const bookingData = Object.fromEntries(formData);
            
            // Simulate booking confirmation
            alert(`Thank you, ${bookingData.fullName}! Your consultation has been booked for ${bookingData.date} at ${bookingData.time}. You will receive a confirmation email shortly.`);
            
            // Reset form
            event.target.reset();
            
            // Schedule follow-up reminder (simulation)
            setTimeout(() => {
                if (confirm('Would you like to schedule a follow-up consultation?')) {
                    document.getElementById('booking').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 3000);
        }

        // Chatbot functionality
        let chatbotOpen = false;
        const responses = {
            'hello': 'Hello! How can I assist you with your healthcare needs today?',
            'hi': 'Hi there! I\'m here to help you with DocDirect services. What would you like to know?',
            'book': 'I can help you book a consultation! Please scroll up to our booking form or tell me what type of service you need.',
            'services': 'We offer General Consultations, Specialist Referrals, Mental Health Support, Chronic Care Management, Urgent Care, and Health Screenings. Which interests you?',
            'urgent': 'For urgent care, we have same-day appointments available. Would you like me to help you book an urgent consultation?',
            'follow up': 'We automatically schedule follow-up reminders based on your consultation. You can also book follow-up appointments anytime through our platform.',
            'cost': 'Our consultation fees vary by service type. General consultations start at $75. Would you like specific pricing for a particular service?',
            'insurance': 'We accept most major insurance plans. Please have your insurance information ready when booking your appointment.',
            'prescription': 'Yes, our doctors can provide digital prescriptions that are sent directly to your preferred pharmacy.',
            'hours': 'Our platform is available 24/7, with live consultations available from 8 AM to 10 PM daily.',
            'emergency': 'For medical emergencies, please call 911 immediately. Our urgent care is for non-emergency situations that need quick attention.',
            'default': 'I understand you\'re asking about that. For specific medical questions, I recommend booking a consultation with one of our healthcare providers. Is there anything else about our services I can help explain?'
        };

        function toggleChatbot() {
            const window = document.getElementById('chatbotWindow');
            chatbotOpen = !chatbotOpen;
            window.style.display = chatbotOpen ? 'flex' : 'none';
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            if (!message) return;

            addMessage(message, 'user');
            input.value = '';

            // Simulate AI response
            setTimeout(() => {
                const response = getAIResponse(message.toLowerCase());
                addMessage(response, 'bot');
            }, 1000);
        }

        function handleChatKeypress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function addMessage(text, sender) {
            const messagesContainer = document.getElementById('chatbotMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function getAIResponse(message) {
            // Check for keywords in user message
            for (const [keyword, response] of Object.entries(responses)) {
                if (message.includes(keyword)) {
                    return response;
                }
            }
            return responses.default;
        }

        // Set minimum date for booking (today)
        document.addEventListener('DOMContentLoaded', function() {
            const dateInput = document.getElementById('date');
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        });

        // Notification system for follow-ups
        function scheduleFollowUp() {
            // Simulate follow-up notifications
            const followUpTypes = [
                'Prescription refill reminder',
                'Follow-up consultation scheduled',
                'Lab results available',
                'Health screening due',
                'Wellness check reminder'
            ];
            
            const randomNotification = followUpTypes[Math.floor(Math.random() * followUpTypes.length)];
            
            // Show notification after 10 seconds (demo purposes)
            setTimeout(() => {
                if (confirm(`📋 ${randomNotification}\n\nWould you like to schedule an appointment?`)) {
                    scrollToBooking();
                }
            }, 10000);
        }

        // Initialize follow-up system
        scheduleFollowUp();

        // Animate feature cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Apply animation to feature cards
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.feature-card, .service-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Advanced booking system with real-time availability
        function updateTimeSlots() {
            const dateInput = document.getElementById('date');
            const timeSelect = document.getElementById('time');
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            
            // Clear existing options
            timeSelect.innerHTML = '<option value="">Select a time</option>';
            
            if (selectedDate.toDateString() === today.toDateString()) {
                // For today, only show future time slots
                const currentHour = today.getHours();
                const timeSlots = [
                    { value: '09:00', text: '9:00 AM', hour: 9 },
                    { value: '10:00', text: '10:00 AM', hour: 10 },
                    { value: '11:00', text: '11:00 AM', hour: 11 },
                    { value: '14:00', text: '2:00 PM', hour: 14 },
                    { value: '15:00', text: '3:00 PM', hour: 15 },
                    { value: '16:00', text: '4:00 PM', hour: 16 },
                    { value: '17:00', text: '5:00 PM', hour: 17 },
                    { value: '18:00', text: '6:00 PM', hour: 18 }
                ];
                
                timeSlots.forEach(slot => {
                    if (slot.hour > currentHour) {
                        const option = document.createElement('option');
                        option.value = slot.value;
                        option.textContent = slot.text;
                        timeSelect.appendChild(option);
                    }
                });
            } else {
                // For future dates, show all available slots
                const timeSlots = [
                    { value: '09:00', text: '9:00 AM' },
                    { value: '10:00', text: '10:00 AM' },
                    { value: '11:00', text: '11:00 AM' },
                    { value: '14:00', text: '2:00 PM' },
                    { value: '15:00', text: '3:00 PM' },
                    { value: '16:00', text: '4:00 PM' },
                    { value: '17:00', text: '5:00 PM' },
                    { value: '18:00', text: '6:00 PM' }
                ];
                
                timeSlots.forEach(slot => {
                    const option = document.createElement('option');
                    option.value = slot.value;
                    option.textContent = slot.text;
                    timeSelect.appendChild(option);
                });
            }
        }

        // Add event listener for date changes
        document.addEventListener('DOMContentLoaded', function() {
            const dateInput = document.getElementById('date');
            dateInput.addEventListener('change', updateTimeSlots);
        });

        // Enhanced chatbot with more healthcare-specific responses
        const enhancedResponses = {
            ...responses,
            'symptoms': 'I can help you prepare for your consultation by noting your symptoms. However, for proper diagnosis, please book a consultation with one of our healthcare providers.',
            'pain': 'Pain management is one of our specialties. Would you like to book a consultation to discuss your pain concerns with a healthcare provider?',
            'medication': 'Our doctors can prescribe medications and provide medication management. Would you like to schedule a consultation to discuss your medication needs?',
            'mental health': 'We offer comprehensive mental health services including counseling and psychiatric care. Our mental health professionals are here to support you.',
            'chronic': 'We specialize in chronic care management for conditions like diabetes, hypertension, and more. Our team can help you manage your condition effectively.',
            'preventive': 'Preventive care is crucial for maintaining good health. We offer various health screenings and wellness checks. Would you like to learn more?',
            'telemedicine': 'Yes, we offer secure telemedicine consultations. You can meet with healthcare providers from the comfort of your home through our platform.',
            'wait time': 'Most consultations are scheduled within 24-48 hours. For urgent care, we often have same-day availability.',
            'cancel': 'You can easily reschedule or cancel appointments through our platform. We require 24-hour notice for cancellations to avoid fees.'
        };

        // Update the getAIResponse function to use enhanced responses
        function getAIResponse(message) {
            for (const [keyword, response] of Object.entries(enhancedResponses)) {
                if (message.includes(keyword)) {
                    return response;
                }
            }
            return enhancedResponses.default;
        }

        // Form validation with real-time feedback
        function setupFormValidation() {
            const form = document.querySelector('.booking-form');
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });
        }

        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.getAttribute('name');
            let isValid = true;
            let errorMessage = '';

            // Remove existing error styling
            field.classList.remove('error');
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Validation logic
            switch (fieldName) {
                case 'fullName':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Please enter a valid full name';
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
                case 'date':
                    const selectedDate = new Date(value);
                    const today = new Date();
                    if (selectedDate < today.setHours(0,0,0,0)) {
                        isValid = false;
                        errorMessage = 'Please select a future date';
                    }
                    break;
            }

            if (!isValid) {
                field.classList.add('error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errorMessage;
                errorDiv.style.color = '#ef4444';
                errorDiv.style.fontSize = '0.875rem';
                errorDiv.style.marginTop = '0.25rem';
                field.parentNode.appendChild(errorDiv);
            }

            return isValid;
        }

        // Initialize form validation
        document.addEventListener('DOMContentLoaded', setupFormValidation);

        // Mobile menu toggle (for responsive design)
        function createMobileMenu() {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.style.display = 'none';
            mobileMenuBtn.style.background = 'none';
            mobileMenuBtn.style.border = 'none';
            mobileMenuBtn.style.fontSize = '1.5rem';
            mobileMenuBtn.style.color = '#4f46e5';
            mobileMenuBtn.style.cursor = 'pointer';
            
            nav.insertBefore(mobileMenuBtn, navLinks);
            
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }

        // Add CSS for mobile menu
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                .nav-links {
                    display: none !important;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column !important;
                    padding: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .nav-links.active {
                    display: flex !important;
                }
                .form-group input.error,
                .form-group select.error,
                .form-group textarea.error {
                    border-color: #ef4444;
                    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
                }
            }
        `;
        document.head.appendChild(mobileStyle);

        // Initialize mobile menu
        document.addEventListener('DOMContentLoaded', createMobileMenu);