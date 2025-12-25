// Service Worker registration with fallback handling
if ('serviceWorker' in navigator) {
    let registrationAttempts = 0;
    const maxAttempts = 3;
    const baseDelay = 2000; // 2 seconds base delay
    
    // Check if server is responding properly
    async function checkServerHealth() {
        try {
            const response = await fetch('/favicon.ico', { 
                method: 'HEAD',
                cache: 'no-cache'
            });
            return response.ok;
        } catch {
            return false;
        }
    }
    
    // Show server error notification
    function showServerError() {
        if (document.querySelector('.server-error-notification')) return;
        
        const notification = document.createElement('div');
        notification.className = 'server-error-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.innerHTML = `
            <strong>⚠️ Server Issues Detected</strong><br>
            <small>Some features may be unavailable. The page will retry automatically.</small>
            <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer; font-size: 18px; margin-top: -5px;">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 10000);
    }
    
    async function attemptServiceWorkerRegistration() {
        registrationAttempts++;
        
        try {
            // First check if server is healthy
            const serverHealthy = await checkServerHealth();
            
            if (!serverHealthy) {
                console.warn('Server appears to be down, skipping SW registration');
                showServerError();
                return;
            }
            
            // Try to register the service worker
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none' // Always fetch fresh SW
            });
            
            console.log('ServiceWorker registration successful:', registration);
            
            // Handle updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New service worker installed');
                        }
                    });
                }
            });
            
        } catch (error) {
            console.warn(`ServiceWorker registration failed (attempt ${registrationAttempts}):`, error);
            
            // Handle specific error types
            if (error.message.includes('502') || error.message.includes('Bad Gateway')) {
                console.warn('Server returning 502 errors, will retry later');
                showServerError();
                
                // Retry with exponential backoff if we haven't exceeded max attempts
                if (registrationAttempts < maxAttempts) {
                    const delay = baseDelay * Math.pow(2, registrationAttempts - 1);
                    console.log(`Retrying SW registration in ${delay}ms...`);
                    
                    setTimeout(() => {
                        attemptServiceWorkerRegistration();
                    }, delay);
                } else {
                    console.error('Max SW registration attempts reached, giving up');
                }
                return;
            }
            
            // For other errors, try to clear existing service workers
            if (navigator.serviceWorker.controller) {
                try {
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    for (const registration of registrations) {
                        await registration.unregister();
                    }
                    console.log('Cleared existing service workers due to registration failure');
                } catch (clearError) {
                    console.warn('Failed to clear service workers:', clearError);
                }
            }
        }
    }
    
    // Start registration process when page loads
    window.addEventListener('load', () => {
        // Add a small delay to let other resources load first
        setTimeout(() => {
            attemptServiceWorkerRegistration();
        }, 1000);
    });
    
    // Also monitor online/offline status
    window.addEventListener('online', () => {
        console.log('Connection restored, attempting SW registration');
        if (registrationAttempts < maxAttempts) {
            attemptServiceWorkerRegistration();
        }
    });
    
    window.addEventListener('offline', () => {
        console.log('Connection lost');
        const notification = document.querySelector('.server-error-notification');
        if (notification) {
            notification.querySelector('small').textContent = 'No internet connection detected.';
        }
    });
}
