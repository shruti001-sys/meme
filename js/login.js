document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.querySelector('#sign-up-btn');
    const signInBtn = document.querySelector('#sign-in-btn');
    const container = document.querySelector('.container');
    const signInForm = document.querySelector('.sign-in-form');
    const signUpForm = document.querySelector('.sign-up-form');

    // Toggle between sign up and sign in forms
    signUpBtn.addEventListener('click', () => {
        container.classList.add('sign-up-mode');
    });

    signInBtn.addEventListener('click', () => {
        container.classList.remove('sign-up-mode');
    });

    // Handle sign in form submission
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect to main page
                window.location.href = 'main.html';
            } else {
                alert(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Handle sign up form submission
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Password validation
        const passwordErrors = [];
        if (password.length < 6) {
            passwordErrors.push('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            passwordErrors.push('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            passwordErrors.push('Password must contain at least one number');
        }
        if (!/[!@#$%^&*]/.test(password)) {
            passwordErrors.push('Password must contain at least one special character (!@#$%^&*)');
        }

        if (passwordErrors.length > 0) {
            removeErrorMessages();
            showError(passwordErrors.join('<br>'), document.getElementById('signup-password').parentNode);
            return;
        }

        if (password !== confirmPassword) {
            removeErrorMessages();
            showError('Passwords do not match!', document.getElementById('signup-confirm-password').parentNode);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect to main page
                window.location.href = 'main.html';
            } else {
                removeErrorMessages();
                showError(data.error || 'Registration failed. Please try again.', signUpForm);
            }
        } catch (error) {
            console.error('Registration error:', error);
            removeErrorMessages();
            showError('An error occurred. Please try again.', signUpForm);
        }
    });

    // Helper functions for error handling
    function showError(message, parent) {
        removeErrorMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = message;
        parent.appendChild(errorDiv);
    }
    function removeErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

    // Remove error messages on input
    document.querySelectorAll('.sign-up-form input').forEach(input => {
        input.addEventListener('input', removeErrorMessages);
    });

    // Social media button animations
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'translateY(-5px)';
        });
        
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'translateY(0)';
        });
    });

    // Add real-time password validation
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const passwordRequirements = document.createElement('div');
    passwordRequirements.className = 'password-requirements';
    passwordRequirements.style.marginTop = '10px';
    passwordRequirements.style.fontSize = '12px';
    passwordRequirements.style.color = '#666';
    passwordInput.parentNode.appendChild(passwordRequirements);

    const requirements = [
        { regex: /.{6,}/, text: 'At least 6 characters' },
        { regex: /[A-Z]/, text: 'One uppercase letter' },
        { regex: /[a-z]/, text: 'One lowercase letter' },
        { regex: /[0-9]/, text: 'One number' },
        { regex: /[!@#$%^&*]/, text: 'One special character (!@#$%^&*)' }
    ];

    function updatePasswordRequirements() {
        const password = passwordInput.value;
        let html = '<ul style="list-style: none; padding: 0; margin: 0;">';
        requirements.forEach(req => {
            const isValid = req.regex.test(password);
            html += `<li style="color: ${isValid ? 'green' : 'red'}">${isValid ? '✓' : '✗'} ${req.text}</li>`;
        });
        html += '</ul>';
        passwordRequirements.innerHTML = html;
    }

    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorDiv = document.querySelector('.password-match-error') || document.createElement('div');
        errorDiv.className = 'password-match-error';
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '10px';
        
        if (confirmPassword && password !== confirmPassword) {
            errorDiv.textContent = 'Passwords do not match!';
            if (!confirmPasswordInput.parentNode.contains(errorDiv)) {
                confirmPasswordInput.parentNode.appendChild(errorDiv);
            }
        } else {
            errorDiv.remove();
        }
    }

    passwordInput.addEventListener('input', updatePasswordRequirements);
    passwordInput.addEventListener('input', checkPasswordMatch);
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
}); 