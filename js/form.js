// Form validation and handling
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff6b6b';
                    
                    // Add error message if not already present
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = '#ff6b6b';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '5px';
                        errorMsg.style.display = 'block';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.style.borderColor = '#ddd';
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                        field.nextElementSibling.remove();
                    }
                }
            });
            
            // Validate email format if email field exists
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#ff6b6b';
                    
                    if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'Please enter a valid email address';
                        errorMsg.style.color = '#ff6b6b';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '5px';
                        errorMsg.style.display = 'block';
                        emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
                    }
                }
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server here
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                console.log('Form data:', data);
                
                // Show success message
                alert('Thank you for your submission! We will contact you shortly.');
                
                // Reset form
                form.reset();
                
                // For demo purposes, we're just logging to console
                // In a real app, you would use fetch() to send to a server
                // fetch(form.action, {
                //     method: form.method,
                //     body: formData
                // })
                // .then(response => response.json())
                // .then(data => {
                //     alert('Thank you for your submission!');
                //     form.reset();
                // })
                // .catch(error => {
                //     console.error('Error:', error);
                //     alert('There was an error submitting your form. Please try again.');
                // });
            }
        });
    });
    
    // Add input event listeners to clear error styles when user types
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(255, 107, 107)') {
                input.style.borderColor = '#ddd';
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.nextElementSibling.remove();
                }
            }
        });
    });
});