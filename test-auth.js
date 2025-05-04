const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';
const testUser = {
    username: 'testuser2',
    email: 'test2@example.com',
    password: 'password123',
    confirmPassword: 'password123'
};

async function testAuth() {
    try {
        // Test Registration
        console.log('Testing registration...');
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testUser)
        });

        const registerData = await registerResponse.json();
        console.log('Registration response:', registerData);

        if (!registerResponse.ok) {
            throw new Error(`Registration failed: ${registerData.error || 'Unknown error'}`);
        }

        // Test Login
        console.log('\nTesting login...');
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });

        const loginData = await loginResponse.json();
        console.log('Login response:', loginData);

        if (!loginResponse.ok) {
            throw new Error(`Login failed: ${loginData.error || 'Unknown error'}`);
        }

        // Test Token
        console.log('\nTesting token...');
        const tokenResponse = await fetch(`${API_URL}/test-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${loginData.token}`
            }
        });

        const tokenData = await tokenResponse.json();
        console.log('Token test response:', tokenData);

        if (!tokenResponse.ok) {
            throw new Error(`Token test failed: ${tokenData.error || 'Unknown error'}`);
        }

        console.log('\nAll tests passed successfully! 🎉');

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testAuth(); 