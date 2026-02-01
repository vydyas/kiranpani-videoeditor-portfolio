// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked'); // Debug log
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Menu active:', navMenu.classList.contains('active')); // Debug log
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    } else {
        console.error('Hamburger or nav menu not found:', { hamburger, navMenu });
    }
});

// Smooth Scrolling
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

// Navbar dynamic island scroll effect
window.addEventListener('scroll', () => {
    const navbarIsland = document.querySelector('.navbar-island');
    if (navbarIsland) {
        if (window.scrollY > 50) {
            navbarIsland.style.background = 'rgba(255, 255, 255, 0.85)';
            navbarIsland.style.boxShadow = 
                '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)';
        } else {
            navbarIsland.style.background = 'rgba(255, 255, 255, 0.7)';
            navbarIsland.style.boxShadow = 
                '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
        }
    }
});

// YouTube Video Background - Handle Error 152 with detailed logging
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== YouTube Video Debug Log ===');
    console.log('Initializing video background...');
    
    const videoIframe = document.getElementById('hero-video');
    const videoFallback = document.getElementById('video-fallback');
    
    if (!videoIframe) {
        console.error('❌ ERROR: Video iframe element not found!');
        return;
    }
    
    console.log('✅ Video iframe element found');
    console.log('Video URL:', videoIframe.src);
    console.log('Video ID: otSuqjJaR8o');
    
    // Log iframe attributes
    console.log('Iframe attributes:');
    console.log('- allow:', videoIframe.getAttribute('allow'));
    console.log('- allowfullscreen:', videoIframe.hasAttribute('allowfullscreen'));
    console.log('- frameborder:', videoIframe.getAttribute('frameborder'));
    
    // Check if video loads successfully
    videoIframe.addEventListener('load', () => {
        console.log('✅ Iframe load event fired');
        console.log('Iframe dimensions:', {
            width: videoIframe.offsetWidth,
            height: videoIframe.offsetHeight
        });
        
        // Check for error after a delay
        setTimeout(() => {
            console.log('Checking video status after 2 seconds...');
            try {
                // Try to access iframe content (will fail if error 152)
                const iframeDoc = videoIframe.contentDocument || videoIframe.contentWindow.document;
                console.log('✅ Can access iframe content (no CORS error)');
            } catch (e) {
                console.warn('⚠️ Cannot access iframe content (expected for cross-origin):', e.message);
                console.log('This is normal for YouTube embeds due to CORS restrictions');
            }
        }, 2000);
    });
    
    // Listen for YouTube API errors and messages
    let youtubeMessages = [];
    window.addEventListener('message', (event) => {
        // Log ALL messages (for debugging)
        if (event.origin.includes('youtube.com') || event.origin.includes('youtu.be') || event.origin.includes('google.com')) {
            youtubeMessages.push({
                origin: event.origin,
                data: event.data,
                timestamp: new Date().toISOString()
            });
            
            console.log('📨 Message from YouTube/Google:', {
                origin: event.origin,
                data: event.data,
                type: typeof event.data
            });
            
            // Check for error events - multiple formats
            if (event.data) {
                // Check if it's an object with error
                if (typeof event.data === 'object') {
                    if (event.data.event === 'error' || event.data.error || event.data.info === 'error') {
                        console.error('❌ YouTube Error Detected (object):', event.data);
                        if (videoFallback) {
                            videoIframe.style.display = 'none';
                            videoFallback.style.display = 'flex';
                            console.log('✅ Fallback activated due to error object');
                        }
                    }
                    // Check for specific error codes
                    if (event.data.errorCode === 152 || event.data.error === 152 || event.data.code === 152) {
                        console.error('❌ ERROR 152 DETECTED:', event.data);
                        if (videoFallback) {
                            videoIframe.style.display = 'none';
                            videoFallback.style.display = 'flex';
                            console.log('✅ Fallback activated - Error 152');
                        }
                    }
                }
                
                // Check if it's a string that might contain error info
                if (typeof event.data === 'string') {
                    if (event.data.includes('error') || event.data.includes('152') || event.data.includes('unavailable')) {
                        console.warn('⚠️ Possible error in message string:', event.data);
                        try {
                            const parsed = JSON.parse(event.data);
                            if (parsed.event === 'error' || parsed.error || parsed.errorCode === 152) {
                                console.error('❌ YouTube Error Detected (parsed string):', parsed);
                                if (videoFallback) {
                                    videoIframe.style.display = 'none';
                                    videoFallback.style.display = 'flex';
                                    console.log('✅ Fallback activated due to parsed error');
                                }
                            }
                        } catch (e) {
                            // Not JSON, that's okay
                        }
                    }
                }
            }
        }
    });
    
    // After 5 seconds, log all collected messages for analysis
    setTimeout(() => {
        console.log('📊 All YouTube messages collected:', youtubeMessages);
        if (youtubeMessages.length === 0) {
            console.warn('⚠️ No messages received from YouTube - video might not be loading');
        }
    }, 5000);
    
    // Monitor iframe for errors
    videoIframe.addEventListener('error', (e) => {
        console.error('❌ Iframe error event:', e);
        if (videoFallback) {
            videoIframe.style.display = 'none';
            videoFallback.style.display = 'flex';
            console.log('✅ Fallback activated due to error event');
        }
    });
    
    // Check iframe visibility and content periodically
    let checkCount = 0;
    const checkInterval = setInterval(() => {
        checkCount++;
        const isVisible = videoIframe.offsetWidth > 0 && videoIframe.offsetHeight > 0;
        const isDisplayed = window.getComputedStyle(videoIframe).display !== 'none';
        
        console.log(`Check #${checkCount} (${checkCount * 2}s):`, {
            visible: isVisible,
            displayed: isDisplayed,
            width: videoIframe.offsetWidth,
            height: videoIframe.offsetHeight,
            src: videoIframe.src
        });
        
        // Try to detect Error 152 by checking iframe content (limited due to CORS)
        // We can't directly access, but we can check for common error indicators
        if (checkCount === 2) {
            console.log('🔍 Attempting to detect Error 152...');
            console.log('Note: Due to CORS, we cannot directly read iframe content');
            console.log('If you see "Video unavailable" or Error 152 in the iframe,');
            console.log('the video needs embedding enabled in YouTube Studio settings.');
            console.log('');
            console.log('📋 To fix Error 152:');
            console.log('1. Go to https://studio.youtube.com/');
            console.log('2. Find video: otSuqjJaR8o');
            console.log('3. Edit video → Show more → Enable "Allow embedding"');
            console.log('4. Make sure video is Public or Unlisted (not Private)');
        }
        
        // After 8 seconds, check final status
        if (checkCount >= 4) {
            clearInterval(checkInterval);
            if (!isVisible || !isDisplayed) {
                console.warn('⚠️ Video iframe not visible after 8 seconds');
                if (videoFallback) {
                    videoIframe.style.display = 'none';
                    videoFallback.style.display = 'flex';
                    console.log('✅ Fallback activated after timeout');
                }
            } else {
                console.log('✅ Video iframe appears to be visible');
                console.log('⚠️ If you still see Error 152 in the video player,');
                console.log('   it means embedding is disabled for this video.');
                console.log('   Please enable embedding in YouTube Studio (see instructions above).');
            }
        }
    }, 2000);
    
    // Log browser info
    console.log('Browser Info:', {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled
    });
    
    // Check for ad blockers or privacy extensions
    setTimeout(() => {
        const testIframe = document.createElement('iframe');
        testIframe.src = 'about:blank';
        testIframe.style.display = 'none';
        document.body.appendChild(testIframe);
        try {
            testIframe.contentWindow;
            console.log('✅ Iframe access test passed');
        } catch (e) {
            console.warn('⚠️ Iframe access restricted (may be privacy extension):', e.message);
        }
        document.body.removeChild(testIframe);
    }, 1000);
    
    // Check if running on file:// protocol
    if (window.location.protocol === 'file:') {
        console.error('❌ CRITICAL: Running on file:// protocol!');
        console.error('YouTube embeds DO NOT work with file:// protocol.');
        console.error('');
        console.error('📋 SOLUTION: Use a local server instead:');
        console.error('1. Open Terminal/Command Prompt');
        console.error('2. Navigate to this folder');
        console.error('3. Run: python3 -m http.server 8000');
        console.error('4. Open: http://localhost:8000');
        console.error('');
        console.error('Or deploy to Vercel for best results!');
        console.error('');
        
        // Show fallback immediately for file://
        if (videoFallback) {
            setTimeout(() => {
                videoIframe.style.display = 'none';
                videoFallback.style.display = 'flex';
                const fallbackContent = videoFallback.querySelector('.fallback-content');
                if (fallbackContent) {
                    fallbackContent.innerHTML = `
                        <i class="fab fa-youtube"></i>
                        <h3>File Protocol Detected</h3>
                        <p>YouTube embeds don't work with file:// protocol.</p>
                        <div class="fallback-instructions">
                            <p><strong>To fix this, use a local server:</strong></p>
                            <ol>
                                <li>Open Terminal/Command Prompt</li>
                                <li>Navigate to this folder</li>
                                <li>Run: <code>python3 -m http.server 8000</code></li>
                                <li>Open: <a href="http://localhost:8000" target="_blank">http://localhost:8000</a></li>
                            </ol>
                            <p style="margin-top: 1rem;"><strong>Or deploy to Vercel:</strong></p>
                            <p>Go to <a href="https://vercel.com" target="_blank">vercel.com</a> and drag & drop this folder!</p>
                        </div>
                        <a href="https://www.youtube.com/watch?v=otSuqjJaR8o" target="_blank" class="btn btn-primary">Watch on YouTube</a>
                    `;
                }
            }, 1000);
        }
    } else {
        console.log('✅ Running on HTTP/HTTPS protocol - YouTube embeds should work');
    }
    
    console.log('=== End Initialization ===');
    console.log('Protocol:', window.location.protocol);
    console.log('URL:', window.location.href);
    console.log('');
    console.log('Please check the console for any errors or warnings above.');
    console.log('If you see Error 152, the video needs embedding enabled in YouTube settings.');
});

// Video embedding functions

// Intersection Observer for subtle fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all skill cards, tool cards, and portfolio items
document.querySelectorAll('.skill-card, .tool-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// Function to add YouTube video embed
function addYouTubeVideo(videoId, title = '') {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.innerHTML = `
        <div class="video-wrapper">
            <iframe 
                src="https://www.youtube.com/embed/${videoId}" 
                title="${title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `;
    portfolioGrid.appendChild(portfolioItem);
}

// Example usage - Add your videos here:
// For YouTube: addYouTubeVideo('VIDEO_ID', 'Video Title')

// Uncomment and add your video IDs/URLs below:
// addYouTubeVideo('YOUR_YOUTUBE_VIDEO_ID', 'Video Title');

// Scroll Animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    // Don't animate hero section on scroll - it's already visible
    const sections = document.querySelectorAll('section:not(.hero)');
    const animatedElements = document.querySelectorAll('.skill-item, .tool-card, .contact-item, .section-title, .section-subtitle, .about-content');
    
    // Create Intersection Observer with options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Don't unobserve so animations can retrigger if needed
            }
        });
    }, observerOptions);
    
    // Observe all sections except hero
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe section titles and subtitles
    const titles = document.querySelectorAll('.section-title, .section-subtitle');
    titles.forEach(title => {
        observer.observe(title);
    });
    
    // Observe animated elements with staggered delays
    animatedElements.forEach((element, index) => {
        observer.observe(element);
    });
    
    // Observe about content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        observer.observe(aboutContent);
    }
});

