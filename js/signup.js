document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('signupSubmitBtn');
    const spinner = submitBtn.querySelector('.loading-spinner');
    const btnText = submitBtn.querySelector('span:not(.loading-spinner)');
    const formSummary = document.getElementById('formSummary');

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirmPassword-error');

    function setError(input, errorElement, message) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
    }

    // Clear errors on input
    [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input === usernameInput) clearError(usernameInput, usernameError);
            if (input === emailInput) clearError(emailInput, emailError);
            if (input === passwordInput) clearError(passwordInput, passwordError);
            if (input === confirmPasswordInput) clearError(confirmPasswordInput, confirmPasswordError);
            formSummary.textContent = '';
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formSummary.textContent = '';

        // Reset errors
        clearError(usernameInput, usernameError);
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
        clearError(confirmPasswordInput, confirmPasswordError);

        let isValid = true;
        let firstInvalidInput = null;

        const usernameVal = usernameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const passwordVal = passwordInput.value;
        const confirmPasswordVal = confirmPasswordInput.value;

        // Username validation: 3-20 alphanumeric
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(usernameVal)) {
            setError(usernameInput, usernameError, 'Username must be 3-20 alphanumeric characters.');
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = usernameInput;
        }

        // Email validation (RFC5322 basic check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            setError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = emailInput;
        }

        // Password validation: 12+ chars yenye upper/lower/number/symbol
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
        if (!passwordRegex.test(passwordVal)) {
            setError(passwordError, passwordError, 'Password must be 12+ chars with upper, lower, number, and symbol.');
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = passwordInput;
        }

        // Confirm Password validation
        if (confirmPasswordVal !== passwordVal) {
            setError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = confirmPasswordInput;
        }

        if (!isValid) {
            formSummary.textContent = 'Please correct the errors highlighted below.';
            if (firstInvalidInput) firstInvalidInput.focus();
            return;
        }

        // Disable button & show spinner
        submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';
        if (btnText) btnText.style.opacity = '0.7';

        try {
            // Simulate backend Auth API call (Megatron Auth simulation)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success redirect to login with ?registered=1
            window.location.href = 'index.html?registered=1';
        } catch (err) {
            submitBtn.disabled = false;
            if (spinner) spinner.style.display = 'none';
            if (btnText) btnText.style.opacity = '1';
            formSummary.textContent = 'Registration failed. Please try again later.';
        }
    });
});
