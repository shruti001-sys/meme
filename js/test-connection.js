// Test script to verify backend connection
document.addEventListener('DOMContentLoaded', async () => {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'connection-test';
    document.body.appendChild(resultDiv);
    
    const API_URL = 'http://localhost:5000/api';
    
    try {
        // Test API connection
        const response = await fetch(`${API_URL}/health`);
        
        if (response.ok) {
            resultDiv.innerHTML = `
                <div class="success">
                    <i class="fas fa-check-circle"></i>
                    Backend connection successful!
                </div>
                <div class="details">
                    <p>Server is running and responding to requests.</p>
                    <p>You can now use the login and profile features.</p>
                </div>
            `;
        } else {
            throw new Error('Server responded with an error');
        }
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                Backend connection failed!
            </div>
            <div class="details">
                <p>Error: ${error.message}</p>
                <p>Please make sure the backend server is running.</p>
                <p>Run 'npm run dev' in the project directory to start the server.</p>
            </div>
        `;
    }
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .connection-test {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 500px;
            width: 90%;
        }
        
        .connection-test .success {
            color: #51cf66;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;
        }
        
        .connection-test .error {
            color: #ff6b6b;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;
        }
        
        .connection-test .details {
            color: #495057;
            font-size: 14px;
        }
        
        .connection-test i {
            margin-right: 8px;
        }
    `;
    document.head.appendChild(style);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        resultDiv.style.opacity = '0';
        resultDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => resultDiv.remove(), 500);
    }, 5000);
}); 