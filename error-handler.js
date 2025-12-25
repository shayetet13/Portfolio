/**
 * Comprehensive error handler for common website errors
 * - Fixes CSP violations
 * - Handles HTTP/2 protocol errors
 * - Manages 502 server errors
 * - Provides fallback content
 */

// Run immediately when included
(function() {
    // Fix Content Security Policy for Google Tag Manager
    function fixCSP() {
        // Check if we already attempted to fix CSP
        if (window.cspFixed) return;
        window.cspFixed = true;
        
        try {
            // Find existing CSP meta tag
            const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
            
            if (existingCSP) {
                // Extract current policy
                let cspContent = existingCSP.getAttribute('content');
                
                // Check if Google Tag Manager is already allowed
                if (!cspContent.includes('googletagmanager.com')) {
                    // Add Google Tag Manager to script-src
                    cspContent = cspContent.replace(
                        /script-src\s+([^;]+)/,
                        'script-src $1 https://www.googletagmanager.com'
                    );
                    
                    // Update the meta tag
                    existingCSP.setAttribute('content', cspContent);
                    console.log('CSP updated to allow Google Tag Manager');
                    
                    // Reload GTM script
                    const gtmScript = document.createElement('script');
                    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=G-DVB5537B7W';
                    gtmScript.async = true;
                    document.head.appendChild(gtmScript);
                }
            } else {
                // Create new CSP meta tag if none exists
                const newCSP = document.createElement('meta');
                newCSP.setAttribute('http-equiv', 'Content-Security-Policy');
                newCSP.setAttribute('content', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;");
                document.head.insertBefore(newCSP, document.head.firstChild);
                console.log('Added CSP meta tag with Google Tag Manager');
            }
        } catch (error) {
            console.error('Failed to update CSP:', error);
        }
    }
    
    // Handle HTTP/2 protocol errors
    function setupHTTP2ErrorHandler() {
        // Monitor for failed resource loads
        window.addEventListener('error', function(event) {
            const target = event.target;
            
            // Only handle resource loading errors
            if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK' || target.tagName === 'IMG')) {
                const url = target.src || target.href;
                
                if (url && url.includes('/assets/')) {
                    console.warn('Resource failed to load:', url);
                    
                    // For CSS files, attempt to provide fallback styles
                    if (target.tagName === 'LINK' && target.rel === 'stylesheet') {
                        applyFallbackStyles();
                    }
                    
                    // For critical JS files, try alternate loading method
                    if (target.tagName === 'SCRIPT') {
                        const filename = url.split('/').pop();
                        tryAlternateScriptLoading(filename);
                    }
                }
            }
        }, true);
    }
    
    // Apply minimal fallback styles when CSS fails
    function applyFallbackStyles() {
        // Check if we already applied fallback styles
        if (document.getElementById('fallback-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'fallback-styles';
        style.textContent = `
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1, h2, h3 { margin-top: 1em; margin-bottom: 0.5em; }
            p { margin-bottom: 1em; }
            a { color: #0066cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .server-error-notification { 
                position: fixed; top: 20px; right: 20px; background: #ff6b6b; 
                color: white; padding: 15px; border-radius: 8px; z-index: 10000;
                max-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
        console.log('Applied fallback styles due to CSS loading failure');
    }
    
    // Try loading scripts using different methods
    function tryAlternateScriptLoading(filename) {
        // Prevent multiple attempts for the same script
        if (window.attemptedScripts && window.attemptedScripts[filename]) return;
        
        if (!window.attemptedScripts) window.attemptedScripts = {};
        window.attemptedScripts[filename] = true;
        
        console.log(`Trying alternate loading method for: ${filename}`);
        
        // Try fetching the script content directly and evaluating it
        fetch(`/${filename}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.text();
            })
            .then(content => {
                // Create and execute the script
                const script = document.createElement('script');
                script.textContent = content;
                document.head.appendChild(script);
                console.log(`Successfully loaded ${filename} using direct fetch`);
            })
            .catch(error => {
                console.error(`Failed to load ${filename} with direct fetch:`, error);
                showBrowserCompatibilityMessage();
            });
    }
    
    // Show a user-friendly message about browser compatibility
    function showBrowserCompatibilityMessage() {
        if (document.querySelector('.compatibility-message')) return;
        
        const message = document.createElement('div');
        message.className = 'compatibility-message';
        message.style.cssText = `
            position: fixed; bottom: 20px; left: 20px; background: #3498db;
            color: white; padding: 15px; border-radius: 8px; z-index: 10000;
            max-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        message.innerHTML = `
            <strong>⚠️ Browser Compatibility Notice</strong><br>
            <small>Some features might not work correctly in your browser. Try refreshing or using a different browser.</small>
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 5px; right: 5px; background: none; border: none; color: white; cursor: pointer;">×</button>
        `;
        
        document.body.appendChild(message);
    }
    
    // Check server health and show appropriate notifications
    function checkServerHealth() {
        let serverErrorShown = false;
        
        // Periodically check if server issues are resolved
        setInterval(() => {
            fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' })
                .then(response => {
                    if (response.ok && serverErrorShown) {
                        // Server is back online, remove error notification
                        const notification = document.querySelector('.server-error-notification');
                        if (notification) notification.remove();
                        serverErrorShown = false;
                        
                        // Show recovery message
                        const recoveryMsg = document.createElement('div');
                        recoveryMsg.className = 'server-recovery-notification';
                        recoveryMsg.style.cssText = `
                            position: fixed; top: 20px; right: 20px; background: #2ecc71;
                            color: white; padding: 15px; border-radius: 8px; z-index: 10000;
                            max-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                        `;
                        recoveryMsg.innerHTML = `
                            <strong>✅ Connection Restored</strong><br>
                            <small>Server connection has been restored.</small>
                        `;
                        document.body.appendChild(recoveryMsg);
                        
                        // Remove recovery message after 5 seconds
                        setTimeout(() => {
                            if (recoveryMsg.parentNode) recoveryMsg.parentNode.removeChild(recoveryMsg);
                        }, 5000);
                    }
                })
                .catch(() => {
                    // Only show error once
                    if (!serverErrorShown) {
                        serverErrorShown = true;
                        const notification = document.querySelector('.server-error-notification');
                        if (!notification) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'server-error-notification';
                            errorDiv.style.cssText = `
                                position: fixed; top: 20px; right: 20px; background: #ff6b6b;
                                color: white; padding: 15px; border-radius: 8px; z-index: 10000;
                                max-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                            `;
                            errorDiv.innerHTML = `
                                <strong>⚠️ Server Issues Detected</strong><br>
                                <small>We're experiencing server issues. Some content may not load properly.</small>
                                <button onclick="location.reload()" style="display: block; margin-top: 10px; padding: 5px 10px; background: white; color: #ff6b6b; border: none; border-radius: 4px; cursor: pointer;">Refresh Page</button>
                            `;
                            document.body.appendChild(errorDiv);
                        }
                    }
                });
        }, 10000); // Check every 10 seconds
    }
    
    // Initialize everything
    function init() {
        fixCSP();
        setupHTTP2ErrorHandler();
        checkServerHealth();
        
        // Apply initial fallback styles if page is already having issues
        if (document.readyState === 'complete' && document.querySelectorAll('style, link[rel="stylesheet"]').length === 0) {
            applyFallbackStyles();
        }
    }
    
    // Run immediately if document is already loaded, otherwise wait for DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
