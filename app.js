
// Fixed version with working navigation and demo functionality

// Sample data for demonstrations
const sampleIssues = [
    {
        id: "ISS-001",
        title: "Pothole on Main Street",
        category: "Roads",
        status: "In Progress",
        priority: "High",
        upvotes: 23,
        location: "123 Main St, Ranchi, Jharkhand",
        reportedDate: "2025-09-15",
        estimatedResolution: "2025-09-20",
        description: "Large pothole causing traffic issues and potential vehicle damage."
    },
    {
        id: "ISS-002",
        title: "Broken Street Light",
        category: "Utilities",
        status: "Open",
        priority: "Medium",
        upvotes: 15,
        location: "456 Oak Ave, Dhanbad, Jharkhand",
        reportedDate: "2025-09-16",
        estimatedResolution: "2025-09-22",
        description: "Street light pole damaged, affecting nighttime visibility and safety."
    },
    {
        id: "ISS-003",
        title: "Garbage Overflow",
        category: "Sanitation",
        status: "Resolved",
        priority: "High",
        upvotes: 31,
        location: "789 Park Road, Jamshedpur, Jharkhand",
        reportedDate: "2025-09-10",
        resolvedDate: "2025-09-14",
        description: "Waste bins overflowing, creating hygiene concerns and attracting pests."
    }
];

const analyticsData = {
    totalIssues: 1247,
    resolvedIssues: 892,
    inProgressIssues: 234,
    openIssues: 121,
    averageResolutionTime: "4.2 days",
    citizenSatisfactionRate: "87%"
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('E-Samadhan app initializing...');
    try {
        initializeNavigation();
        initializeScrollEffects();
        initializeDemoPanel();
        updateAnalytics();
        startLiveUpdates();
        console.log('E-Samadhan app initialized successfully');
    } catch (error) {
        console.error('Error initializing E-Samadhan app:', error);
    }
});

// Navigation functionality - FIXED
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Initializing navigation...');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hamburger clicked');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            console.log('Nav link clicked:', href);
            
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
                
                // Close mobile menu
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Smooth scroll to section - FIXED
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const offsetTop = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        console.log('Scrolled to:', sectionId);
    } else {
        console.warn('Section not found:', sectionId);
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const sectionHeight = rect.height;
        
        if (window.pageYOffset >= sectionTop - navbarHeight - 100 && 
            window.pageYOffset < sectionTop + sectionHeight - navbarHeight) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(252, 252, 249, 0.98)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(252, 252, 249, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Initialize demo panel - FIXED
function initializeDemoPanel() {
    console.log('Initializing demo panel...');
    
    // Create demo panel if it doesn't exist
    let demoPanel = document.getElementById('demo-panel');
    if (!demoPanel) {
        demoPanel = document.createElement('div');
        demoPanel.id = 'demo-panel';
        demoPanel.className = 'demo-panel';
        demoPanel.innerHTML = `
            <div class="demo-content">
                <button class="demo-close" onclick="closeDemo()">×</button>
                <div id="demo-content-area">
                    <!-- Dynamic demo content will be inserted here -->
                </div>
            </div>
        `;
        document.body.appendChild(demoPanel);
    }

    // Add click handler for closing demo when clicking outside
    demoPanel.addEventListener('click', function(e) {
        if (e.target === demoPanel) {
            closeDemo();
        }
    });
}

// Feature demonstration functionality - FIXED
function showFeatureDemo(featureType) {
    console.log('Showing feature demo:', featureType);
    
    const demoPanel = document.getElementById('demo-panel');
    const demoContent = document.getElementById('demo-content-area');
    
    if (!demoPanel || !demoContent) {
        console.error('Demo panel elements not found');
        return;
    }
    
    let content = '';
    
    switch(featureType) {
        case 'ai':
            content = generateAIDemo();
            break;
        case 'geo':
            content = generateGeoDemo();
            break;
        case 'community':
            content = generateCommunityDemo();
            break;
        case 'tracking':
            content = generateTrackingDemo();
            break;
        case 'dashboard':
            content = generateDashboardDemo();
            break;
        case 'gamification':
            content = generateGamificationDemo();
            break;
        case 'tasks':
            content = generateTaskRegistrationDemo();
            break;
        default:
            content = '<h3>🚀 Demo Coming Soon!</h3><p>This feature demonstration will be available in the full implementation.</p>';
    }
    
    demoContent.innerHTML = content;
    demoPanel.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Demo panel opened for:', featureType);
}

// Close demo panel - FIXED
function closeDemo() {
    console.log('Closing demo panel');
    const demoPanel = document.getElementById('demo-panel');
    if (demoPanel) {
        demoPanel.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Open main demo - FIXED
function openDemo() {
    console.log('Opening main demo');
    showFeatureDemo('ai');
}

// Global functions for button clicks
window.scrollToSection = scrollToSection;
window.showFeatureDemo = showFeatureDemo;
window.closeDemo = closeDemo;
window.openDemo = openDemo;

// Generate AI Classification Demo
function generateAIDemo() {
    return `
        <div class="demo-container">
            <h2>🤖 AI-Powered Issue Classification</h2>
            <div class="demo-grid">
                <div class="demo-input">
                    <h3>Input Issue</h3>
                    <div class="mock-form">
                        <div class="form-group">
                            <label>Issue Description:</label>
                            <textarea readonly>There is a large pothole on Main Street near the shopping complex. Cars are swerving to avoid it and it's becoming dangerous.</textarea>
                        </div>
                        <div class="form-group">
                            <label>Location:</label>
                            <input type="text" readonly value="Main Street, Ranchi, Jharkhand">
                        </div>
                        <div class="form-group">
                            <label>Uploaded Image:</label>
                            <div class="mock-image">📸 pothole_main_street.jpg</div>
                        </div>
                    </div>
                </div>
                <div class="demo-output">
                    <h3>AI Classification Results</h3>
                    <div class="classification-results">
                        <div class="result-item">
                            <span class="result-label">Category:</span>
                            <span class="result-value status--warning">🛣️ Roads & Infrastructure</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Priority:</span>
                            <span class="result-value status--error">🚨 High Priority</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Department:</span>
                            <span class="result-value">🏗️ Public Works Department</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Confidence:</span>
                            <span class="result-value status--success">✅ 96.5%</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Est. Resolution:</span>
                            <span class="result-value">📅 3-5 business days</span>
                        </div>
                    </div>
                    <div class="ai-insights">
                        <h4>🧠 AI Insights</h4>
                        <ul>
                            <li>Image analysis confirms road surface damage</li>
                            <li>Text sentiment indicates safety concern</li>
                            <li>Location data shows high-traffic area</li>
                            <li>Similar issues in area suggest infrastructure review needed</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate Geo-Tagging Demo
function generateGeoDemo() {
    return `
        <div class="demo-container">
            <h2>📍 Geo-Tagged Issue Reporting</h2>
            <div class="demo-grid">
                <div class="demo-map">
                    <h3>Interactive Location Selection</h3>
                    <div class="mock-map">
                        <div class="map-container">
                            <div class="map-placeholder">
                                🗺️ Interactive Map View
                                <div class="map-marker">📍</div>
                                <div class="map-info">
                                    <strong>Selected Location:</strong><br>
                                    Main Street, Ranchi<br>
                                    Lat: 23.3441, Lng: 85.3096
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-location-data">
                    <h3>Location Intelligence</h3>
                    <div class="location-details">
                        <div class="detail-item">
                            <span class="detail-icon">🎯</span>
                            <div>
                                <strong>GPS Accuracy:</strong>
                                <p>±3 meters precision</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">🏢</span>
                            <div>
                                <strong>Ward/Zone:</strong>
                                <p>Ward 23, Zone C</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">👥</span>
                            <div>
                                <strong>Population Density:</strong>
                                <p>High traffic area</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">📊</span>
                            <div>
                                <strong>Historical Issues:</strong>
                                <p>12 issues in 500m radius</p>
                            </div>
                        </div>
                    </div>
                    <div class="nearby-issues">
                        <h4>🔍 Nearby Similar Issues</h4>
                        <div class="nearby-item">
                            <span class="nearby-distance">50m</span>
                            <span class="nearby-issue">Street Light Issue</span>
                            <span class="status--success">Resolved</span>
                        </div>
                        <div class="nearby-item">
                            <span class="nearby-distance">120m</span>
                            <span class="nearby-issue">Traffic Sign Damage</span>
                            <span class="status--warning">In Progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate Community Validation Demo
function generateCommunityDemo() {
    return `
        <div class="demo-container">
            <h2>👥 Community Validation System</h2>
            <div class="issue-validation-demo">
                <div class="validation-issue">
                    <div class="issue-header">
                        <h3>🚧 Road Repair Needed - MG Road</h3>
                        <span class="issue-id">#ISS-2025-001</span>
                    </div>
                    <div class="issue-content">
                        <p>Multiple potholes reported on MG Road causing traffic disruption and vehicle damage.</p>
                        <div class="issue-meta">
                            <span>📍 MG Road, Ranchi</span>
                            <span>📅 Reported: Sept 15, 2025</span>
                            <span>👤 By: Citizen Reporter</span>
                        </div>
                    </div>
                </div>
                
                <div class="validation-actions">
                    <h4>Community Validation</h4>
                    <div class="validation-stats">
                        <div class="validation-item">
                            <button class="validation-btn upvote" onclick="simulateVote('up')">
                                👍 Confirm Issue
                            </button>
                            <span class="vote-count" id="upvote-count">23 confirmations</span>
                        </div>
                        <div class="validation-item">
                            <button class="validation-btn downvote" onclick="simulateVote('down')">
                                👎 Not Valid
                            </button>
                            <span class="vote-count" id="downvote-count">2 disputes</span>
                        </div>
                        <div class="validation-item">
                            <button class="validation-btn additional-info" onclick="showAdditionalInfo()">
                                ℹ️ Add Information
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="community-feedback">
                    <h4>💬 Community Feedback</h4>
                    <div class="feedback-item">
                        <div class="feedback-header">
                            <strong>LocalResident42</strong>
                            <span class="feedback-time">2 hours ago</span>
                            <span class="user-badge">🏆 Trusted Contributor</span>
                        </div>
                        <p>"I drive this route daily. The potholes are definitely getting worse after the recent rains."</p>
                    </div>
                    <div class="feedback-item">
                        <div class="feedback-header">
                            <strong>ConcernedCitizen</strong>
                            <span class="feedback-time">4 hours ago</span>
                            <span class="user-badge">👥 Community Member</span>
                        </div>
                        <p>"Shared additional photos showing the extent of damage. This needs immediate attention."</p>
                    </div>
                </div>
                
                <div class="validation-score">
                    <h4>📊 Validation Score</h4>
                    <div class="score-display">
                        <div class="score-circle">
                            <span class="score-number">92%</span>
                            <span class="score-label">Validated</span>
                        </div>
                        <div class="score-details">
                            <p>✅ High community confidence</p>
                            <p>📈 Trending issue in area</p>
                            <p>🎯 Ready for official review</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate Real-time Tracking Demo
function generateTrackingDemo() {
    return `
        <div class="demo-container">
            <h2>⚡ Real-time Issue Tracking</h2>
            <div class="tracking-timeline">
                <h3>Issue Timeline - ISS-001: Pothole Repair</h3>
                <div class="timeline-track">
                    <div class="track-item completed">
                        <div class="track-marker">✅</div>
                        <div class="track-content">
                            <h4>Issue Reported</h4>
                            <p>Sept 15, 2025 - 2:30 PM</p>
                            <span class="track-status">Completed</span>
                        </div>
                    </div>
                    <div class="track-item completed">
                        <div class="track-marker">🤖</div>
                        <div class="track-content">
                            <h4>AI Classification</h4>
                            <p>Sept 15, 2025 - 2:35 PM</p>
                            <span class="track-status">Completed</span>
                        </div>
                    </div>
                    <div class="track-item completed">
                        <div class="track-marker">👥</div>
                        <div class="track-content">
                            <h4>Community Validation</h4>
                            <p>Sept 15, 2025 - 6:45 PM</p>
                            <span class="track-status">Completed</span>
                        </div>
                    </div>
                    <div class="track-item active">
                        <div class="track-marker">🔄</div>
                        <div class="track-content">
                            <h4>Department Assignment</h4>
                            <p>Sept 16, 2025 - 9:15 AM</p>
                            <span class="track-status">In Progress</span>
                        </div>
                    </div>
                    <div class="track-item pending">
                        <div class="track-marker">👷</div>
                        <div class="track-content">
                            <h4>Inspection</h4>
                            <p>Expected: Sept 17, 2025</p>
                            <span class="track-status">Pending</span>
                        </div>
                    </div>
                    <div class="track-item pending">
                        <div class="track-marker">🚧</div>
                        <div class="track-content">
                            <h4>Repair Work</h4>
                            <p>Expected: Sept 18-20, 2025</p>
                            <span class="track-status">Pending</span>
                        </div>
                    </div>
                </div>
                
                <div class="tracking-notifications">
                    <h4>📱 Real-time Notifications</h4>
                    <div class="notification-item">
                        <span class="notif-time">Just now</span>
                        <p>🔔 Your issue has been assigned to PWD Team Alpha</p>
                    </div>
                    <div class="notification-item">
                        <span class="notif-time">2 hours ago</span>
                        <p>📊 Issue validation completed - 95% community confidence</p>
                    </div>
                    <div class="notification-item">
                        <span class="notif-time">Yesterday</span>
                        <p>🤖 AI analysis complete - High priority classification</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate Authority Dashboard Demo
function generateDashboardDemo() {
    return `
        <div class="demo-container">
            <h2>📊 Authority Dashboard</h2>
            <div class="dashboard-demo">
                <div class="dashboard-header">
                    <h3>🏛️ Municipal Dashboard - Ranchi Zone C</h3>
                    <div class="dashboard-filters">
                        <select class="form-control">
                            <option>All Categories</option>
                            <option>Roads</option>
                            <option>Utilities</option>
                            <option>Sanitation</option>
                        </select>
                        <select class="form-control">
                            <option>All Priorities</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
                
                <div class="dashboard-metrics">
                    <div class="metric-card">
                        <div class="metric-number">47</div>
                        <div class="metric-label">Open Issues</div>
                        <div class="metric-change">↓ 12% from last week</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">23</div>
                        <div class="metric-label">In Progress</div>
                        <div class="metric-change">↑ 8% from last week</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">156</div>
                        <div class="metric-label">Resolved This Month</div>
                        <div class="metric-change">↑ 24% from last month</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number">3.2</div>
                        <div class="metric-label">Avg Resolution (Days)</div>
                        <div class="metric-change">↓ 1.2 days improved</div>
                    </div>
                </div>
                
                <div class="dashboard-issues-list">
                    <h4>🎯 High Priority Issues</h4>
                    <div class="dashboard-issue-item">
                        <div class="issue-info">
                            <strong>Pothole on Main Street</strong>
                            <span class="issue-meta">📍 Main St • 🕒 2 days ago • 👍 23 votes</span>
                        </div>
                        <div class="issue-actions">
                            <span class="status--error">High Priority</span>
                            <button class="btn btn--sm btn--primary">Assign Team</button>
                        </div>
                    </div>
                    <div class="dashboard-issue-item">
                        <div class="issue-info">
                            <strong>Street Light Outage</strong>
                            <span class="issue-meta">📍 Oak Ave • 🕒 1 day ago • 👍 15 votes</span>
                        </div>
                        <div class="issue-actions">
                            <span class="status--warning">Medium Priority</span>
                            <button class="btn btn--sm btn--outline">Review</button>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-team-status">
                    <h4>👷 Team Status</h4>
                    <div class="team-item">
                        <span class="team-name">PWD Team Alpha</span>
                        <span class="team-status status--success">Available</span>
                        <span class="team-workload">2 active issues</span>
                    </div>
                    <div class="team-item">
                        <span class="team-name">Utility Maintenance</span>
                        <span class="team-status status--warning">Busy</span>
                        <span class="team-workload">5 active issues</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate Task Registration Demo
function generateTaskRegistrationDemo() {
    return `
        <div class="demo-container">
            <h2>👷 Task Registration System</h2>
            <div class="demo-grid">
                <div class="demo-categories">
                    <h3>Available Task Categories</h3>
                    <div class="demo-category-list">
                        <div class="demo-category-item" onclick="simulateTaskCategoryClick('infrastructure')">
                            <span class="category-icon">🛠️</span>
                            <div class="category-info">
                                <strong>Infrastructure Maintenance</strong>
                                <p>Street light repairs, road maintenance, signboard installation</p>
                                <span class="category-stats">23 Active Tasks • 156 Volunteers</span>
                            </div>
                        </div>
                        <div class="demo-category-item" onclick="simulateTaskCategoryClick('environment')">
                            <span class="category-icon">🌱</span>
                            <div class="category-info">
                                <strong>Environmental Cleanup</strong>
                                <p>Garbage collection, tree planting, water body cleaning</p>
                                <span class="category-stats">18 Active Tasks • 203 Volunteers</span>
                            </div>
                        </div>
                        <div class="demo-category-item" onclick="simulateTaskCategoryClick('safety')">
                            <span class="category-icon">🛡️</span>
                            <div class="category-info">
                                <strong>Safety & Security</strong>
                                <p>Traffic management, safety awareness, emergency response</p>
                                <span class="category-stats">12 Active Tasks • 89 Volunteers</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="demo-registration-form">
                    <h3>Registration Process</h3>
                    <div class="demo-form-steps">
                        <div class="step-item completed">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Personal Information</h4>
                                <p>Name, contact details, address verification</p>
                            </div>
                        </div>
                        <div class="step-item completed">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Skills Assessment</h4>
                                <p>Select relevant skills and experience level</p>
                            </div>
                        </div>
                        <div class="step-item active">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Task Selection</h4>
                                <p>Choose specific tasks based on your interests</p>
                            </div>
                        </div>
                        <div class="step-item pending">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h4>Availability</h4>
                                <p>Set your preferred time slots and schedule</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="demo-task-selection">
                        <h4>🎯 Task Selection Example</h4>
                        <div class="demo-task-item">
                            <div class="task-header">
                                <strong>Street Light Repair</strong>
                                <span class="task-difficulty">Medium</span>
                            </div>
                            <p>Fix non-functional street lights in residential areas</p>
                            <div class="task-details">
                                <span>⏱️ Duration: 2-3 hours</span>
                                <span>📍 Location: Ward 15, Zone B</span>
                                <span>💰 Compensation: ₹500 per task</span>
                            </div>
                            <div class="task-skills">
                                <span class="skill-tag">Electrical work</span>
                                <span class="skill-tag">Safety protocols</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="demo-volunteer-benefits">
                <h3>Volunteer Benefits</h3>
                <div class="benefits-grid">
                    <div class="benefit-item">
                        <span class="benefit-icon">💰</span>
                        <div>
                            <strong>Compensation</strong>
                            <p>Earn money while contributing to community</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🏆</span>
                        <div>
                            <strong>Recognition</strong>
                            <p>Build reputation and earn community respect</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">📚</span>
                        <div>
                            <strong>Skill Development</strong>
                            <p>Learn new skills and gain experience</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🤝</span>
                        <div>
                            <strong>Community Impact</strong>
                            <p>Make a real difference in your neighborhood</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="demo-success-stories">
                <h3>Success Stories</h3>
                <div class="story-item">
                    <div class="story-avatar">👨‍🔧</div>
                    <div class="story-content">
                        <strong>Rajesh Kumar</strong>
                        <p>"I've completed 15 street light repairs and earned ₹7,500. The platform made it easy to find work in my area."</p>
                        <div class="story-metrics">
                            <span>15 Tasks Completed</span>
                            <span>₹7,500 Earned</span>
                            <span>4.9 Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Simulate task category click
function simulateTaskCategoryClick(category) {
    showNotification(`🎯 Clicking on ${category} category would open the registration form`, 'info');
}

// Global function for task category simulation
window.simulateTaskCategoryClick = simulateTaskCategoryClick;

// Generate Gamification Demo
function generateGamificationDemo() {
    return `
        <div class="demo-container">
            <h2>🏆 Gamification System</h2>
            <div class="gamification-demo">
                <div class="user-profile">
                    <div class="profile-header">
                        <div class="profile-avatar">👤</div>
                        <div class="profile-info">
                            <h3>CivicChampion2025</h3>
                            <p>🏆 Level 7 Contributor</p>
                            <div class="profile-stats">
                                <span>📊 Issues Reported: 23</span>
                                <span>✅ Issues Validated: 67</span>
                                <span>🎯 Accuracy: 94%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="points-section">
                        <div class="points-display">
                            <div class="points-number">2,450</div>
                            <div class="points-label">Civic Points</div>
                        </div>
                        <div class="level-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 65%"></div>
                            </div>
                            <span class="progress-text">650/1000 XP to Level 8</span>
                        </div>
                    </div>
                </div>
                
                <div class="badges-section">
                    <h4>🏅 Earned Badges</h4>
                    <div class="badges-grid">
                        <div class="badge-item earned">
                            <span class="badge-icon">🔍</span>
                            <span class="badge-name">Eagle Eye</span>
                            <span class="badge-desc">Reported 10+ accurate issues</span>
                        </div>
                        <div class="badge-item earned">
                            <span class="badge-icon">👥</span>
                            <span class="badge-name">Community Helper</span>
                            <span class="badge-desc">Validated 50+ issues</span>
                        </div>
                        <div class="badge-item earned">
                            <span class="badge-icon">⚡</span>
                            <span class="badge-name">Quick Reporter</span>
                            <span class="badge-desc">First to report trending issues</span>
                        </div>
                        <div class="badge-item locked">
                            <span class="badge-icon">🌟</span>
                            <span class="badge-name">Civic Legend</span>
                            <span class="badge-desc">Reach Level 10</span>
                        </div>
                    </div>
                </div>
                
                <div class="leaderboard-section">
                    <h4>🏆 Monthly Leaderboard</h4>
                    <div class="leaderboard-item rank-1">
                        <span class="rank">🥇</span>
                        <span class="username">CivicHero2025</span>
                        <span class="score">3,247 points</span>
                    </div>
                    <div class="leaderboard-item rank-2">
                        <span class="rank">🥈</span>
                        <span class="username">CommunityGuardian</span>
                        <span class="score">2,891 points</span>
                    </div>
                    <div class="leaderboard-item rank-3 current-user">
                        <span class="rank">🥉</span>
                        <span class="username">CivicChampion2025 (You)</span>
                        <span class="score">2,450 points</span>
                    </div>
                </div>
                
                <div class="rewards-section">
                    <h4>🎁 Available Rewards</h4>
                    <div class="reward-item">
                        <span class="reward-icon">🎟️</span>
                        <div class="reward-info">
                            <strong>Bus Pass Discount</strong>
                            <p>10% off monthly bus pass</p>
                        </div>
                        <span class="reward-cost">500 points</span>
                        <button class="btn btn--sm btn--primary">Redeem</button>
                    </div>
                    <div class="reward-item">
                        <span class="reward-icon">🌳</span>
                        <div class="reward-info">
                            <strong>Tree Planting Certificate</strong>
                            <p>Sponsor a tree in your name</p>
                        </div>
                        <span class="reward-cost">1,000 points</span>
                        <button class="btn btn--sm btn--outline">Redeem</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Simulate voting functionality
function simulateVote(type) {
    const upvoteCount = document.getElementById('upvote-count');
    const downvoteCount = document.getElementById('downvote-count');
    
    if (type === 'up' && upvoteCount) {
        const currentCount = parseInt(upvoteCount.textContent.match(/\d+/)[0]);
        upvoteCount.textContent = `${currentCount + 1} confirmations`;
        showNotification('✅ Thank you for validating this issue!', 'success');
    } else if (type === 'down' && downvoteCount) {
        const currentCount = parseInt(downvoteCount.textContent.match(/\d+/)[0]);
        downvoteCount.textContent = `${currentCount + 1} disputes`;
        showNotification('⚠️ Issue marked as disputed. Requires review.', 'warning');
    }
}

// Show additional info modal
function showAdditionalInfo() {
    showNotification('💬 Additional information form would open here in the full app.', 'info');
}

// Global functions for demo interactions
window.simulateVote = simulateVote;
window.showAdditionalInfo = showAdditionalInfo;

// Task Registration Data
const taskCategories = {
    infrastructure: {
        name: "Infrastructure Maintenance",
        icon: "🛠️",
        description: "Street light repairs, road maintenance, signboard installation",
        tasks: [
            {
                id: "INF-001",
                title: "Street Light Repair",
                description: "Fix non-functional street lights in residential areas",
                location: "Ward 15, Zone B",
                duration: "2-3 hours",
                difficulty: "Medium",
                requiredSkills: ["Electrical work", "Safety protocols"],
                toolsProvided: true,
                compensation: "₹500 per task"
            },
            {
                id: "INF-002", 
                title: "Road Sign Installation",
                description: "Install new traffic signs and direction boards",
                location: "Main roads, Zone A",
                duration: "1-2 hours",
                difficulty: "Easy",
                requiredSkills: ["Basic construction", "Reading plans"],
                toolsProvided: true,
                compensation: "₹300 per task"
            },
            {
                id: "INF-003",
                title: "Pothole Patching",
                description: "Fill small potholes with appropriate materials",
                location: "Various locations",
                duration: "3-4 hours",
                difficulty: "Medium",
                requiredSkills: ["Construction work", "Material handling"],
                toolsProvided: true,
                compensation: "₹800 per task"
            }
        ]
    },
    environment: {
        name: "Environmental Cleanup",
        icon: "🌱",
        description: "Garbage collection, tree planting, water body cleaning",
        tasks: [
            {
                id: "ENV-001",
                title: "Tree Plantation Drive",
                description: "Plant and maintain saplings in designated areas",
                location: "Parks and green belts",
                duration: "4-6 hours",
                difficulty: "Easy",
                requiredSkills: ["Gardening", "Plant care"],
                toolsProvided: true,
                compensation: "₹400 per day"
            },
            {
                id: "ENV-002",
                title: "Water Body Cleanup",
                description: "Clean ponds and water bodies from waste",
                location: "Local ponds and lakes",
                duration: "3-5 hours",
                difficulty: "Medium",
                requiredSkills: ["Manual labor", "Safety awareness"],
                toolsProvided: true,
                compensation: "₹600 per day"
            },
            {
                id: "ENV-003",
                title: "Waste Segregation",
                description: "Help with waste segregation at collection points",
                location: "Various collection centers",
                duration: "2-3 hours",
                difficulty: "Easy",
                requiredSkills: ["Basic knowledge of waste types"],
                toolsProvided: true,
                compensation: "₹300 per day"
            }
        ]
    },
    safety: {
        name: "Safety & Security",
        icon: "🛡️",
        description: "Traffic management, safety awareness, emergency response",
        tasks: [
            {
                id: "SAF-001",
                title: "Traffic Management",
                description: "Assist with traffic flow during peak hours",
                location: "Major intersections",
                duration: "2-4 hours",
                difficulty: "Medium",
                requiredSkills: ["Traffic rules", "Communication"],
                toolsProvided: true,
                compensation: "₹500 per shift"
            },
            {
                id: "SAF-002",
                title: "Safety Awareness Campaign",
                description: "Conduct safety awareness programs in communities",
                location: "Schools and community centers",
                duration: "3-4 hours",
                difficulty: "Easy",
                requiredSkills: ["Public speaking", "Safety knowledge"],
                toolsProvided: true,
                compensation: "₹400 per session"
            }
        ]
    },
    community: {
        name: "Community Development",
        icon: "🤝",
        description: "Event organization, skill sharing, community outreach",
        tasks: [
            {
                id: "COM-001",
                title: "Community Event Organization",
                description: "Help organize community events and festivals",
                location: "Community centers",
                duration: "6-8 hours",
                difficulty: "Medium",
                requiredSkills: ["Event management", "Coordination"],
                toolsProvided: true,
                compensation: "₹600 per event"
            },
            {
                id: "COM-002",
                title: "Skill Sharing Workshop",
                description: "Conduct workshops to share your skills with others",
                location: "Community centers",
                duration: "2-3 hours",
                difficulty: "Easy",
                requiredSkills: ["Teaching", "Specific skill expertise"],
                toolsProvided: true,
                compensation: "₹500 per workshop"
            }
        ]
    }
};

// Task Registration Functions
function showTaskRegistration(category) {
    console.log('Showing task registration for category:', category);
    
    try {
        const modal = document.getElementById('task-registration-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('task-registration-content');
        
        if (!modal || !modalTitle || !modalContent) {
            console.error('Modal elements not found');
            showNotification('Task registration modal not found. Please refresh the page.', 'error');
            return;
        }
        
        const categoryData = taskCategories[category];
        if (!categoryData) {
            console.error('Category not found:', category);
            showNotification('Task category not found. Please try again.', 'error');
            return;
        }
        
        modalTitle.textContent = `${categoryData.icon} ${categoryData.name} - Task Registration`;
        modalContent.innerHTML = generateTaskRegistrationForm(category, categoryData);
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize form interactions
        initializeTaskRegistrationForm();
    } catch (error) {
        console.error('Error showing task registration:', error);
        showNotification('Error opening task registration. Please try again.', 'error');
    }
}

function generateTaskRegistrationForm(category, categoryData) {
    return `
        <div class="task-registration-form">
            <div class="form-section">
                <h4><span class="icon">👤</span> Personal Information</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="fullName">Full Name *</label>
                        <input type="text" id="fullName" name="fullName" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="age">Age *</label>
                        <input type="number" id="age" name="age" min="18" max="65" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="address">Address *</label>
                    <textarea id="address" name="address" placeholder="Enter your complete address" required></textarea>
                </div>
            </div>

            <div class="form-section">
                <h4><span class="icon">🛠️</span> Skills & Experience</h4>
                <div class="form-group">
                    <label>Relevant Skills (Select all that apply)</label>
                    <div class="skill-tags">
                        ${getSkillTags(category).map(skill => 
                            `<span class="skill-tag" data-skill="${skill}">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label for="experience">Previous Experience</label>
                    <textarea id="experience" name="experience" placeholder="Describe any relevant volunteer or work experience"></textarea>
                </div>
                <div class="form-group">
                    <label for="motivation">Why do you want to volunteer for this category?</label>
                    <textarea id="motivation" name="motivation" placeholder="Tell us about your motivation and what you hope to achieve" required></textarea>
                </div>
            </div>

            <div class="form-section">
                <h4><span class="icon">📅</span> Availability</h4>
                <div class="form-group">
                    <label>Preferred Time Slots</label>
                    <div class="availability-slots">
                        <div class="availability-slot" data-slot="morning">
                            <div class="day">Morning</div>
                            <div class="time">8:00 AM - 12:00 PM</div>
                        </div>
                        <div class="availability-slot" data-slot="afternoon">
                            <div class="day">Afternoon</div>
                            <div class="time">12:00 PM - 4:00 PM</div>
                        </div>
                        <div class="availability-slot" data-slot="evening">
                            <div class="day">Evening</div>
                            <div class="time">4:00 PM - 8:00 PM</div>
                        </div>
                        <div class="availability-slot" data-slot="weekend">
                            <div class="day">Weekend</div>
                            <div class="time">Any time</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="availability">Additional Availability Notes</label>
                    <textarea id="availability" name="availability" placeholder="Any specific days or times you're available"></textarea>
                </div>
            </div>

            <div class="form-section">
                <h4><span class="icon">🎯</span> Task Preferences</h4>
                <div class="form-group">
                    <label>Select Tasks You're Interested In</label>
                    ${categoryData.tasks.map(task => `
                        <div class="checkbox-group">
                            <input type="checkbox" id="task-${task.id}" name="selectedTasks" value="${task.id}">
                            <label for="task-${task.id}">
                                <strong>${task.title}</strong> - ${task.description}
                                <br><small>Duration: ${task.duration} | Difficulty: ${task.difficulty} | Compensation: ${task.compensation}</small>
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="form-section">
                <h4><span class="icon">📋</span> Additional Information</h4>
                <div class="checkbox-group">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">I agree to the terms and conditions and understand the safety requirements *</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="updates" name="updates">
                    <label for="updates">I would like to receive updates about new volunteer opportunities</label>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn btn--outline" onclick="closeTaskRegistration()">Cancel</button>
                <button type="button" class="btn btn--primary" onclick="submitTaskRegistration('${category}')">Submit Registration</button>
            </div>
        </div>
    `;
}

function getSkillTags(category) {
    const skillMap = {
        infrastructure: ["Electrical work", "Construction", "Safety protocols", "Tool handling", "Problem solving"],
        environment: ["Gardening", "Manual labor", "Environmental awareness", "Team work", "Physical fitness"],
        safety: ["Traffic rules", "Public speaking", "Emergency response", "Communication", "Leadership"],
        community: ["Event management", "Teaching", "Coordination", "Public speaking", "Community outreach"]
    };
    return skillMap[category] || [];
}

function initializeTaskRegistrationForm() {
    // Skill tag selection
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // Availability slot selection
    const availabilitySlots = document.querySelectorAll('.availability-slot');
    availabilitySlots.forEach(slot => {
        slot.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

function submitTaskRegistration(category) {
    console.log('Submitting task registration for category:', category);
    
    // Get form data
    const formData = {
        category: category,
        personalInfo: {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            age: document.getElementById('age').value,
            address: document.getElementById('address').value
        },
        skills: Array.from(document.querySelectorAll('.skill-tag.selected')).map(tag => tag.textContent),
        experience: document.getElementById('experience').value,
        motivation: document.getElementById('motivation').value,
        availability: Array.from(document.querySelectorAll('.availability-slot.selected')).map(slot => slot.dataset.slot),
        availabilityNotes: document.getElementById('availability').value,
        selectedTasks: Array.from(document.querySelectorAll('input[name="selectedTasks"]:checked')).map(input => input.value),
        terms: document.getElementById('terms').checked,
        updates: document.getElementById('updates').checked
    };

    // Validate required fields
    if (!formData.personalInfo.fullName || !formData.personalInfo.email || !formData.personalInfo.phone || 
        !formData.personalInfo.age || !formData.personalInfo.address || !formData.motivation || !formData.terms) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (formData.selectedTasks.length === 0) {
        showNotification('Please select at least one task you\'re interested in', 'error');
        return;
    }

    if (formData.availability.length === 0) {
        showNotification('Please select at least one availability slot', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Registration submitted successfully! You will receive a confirmation email shortly.', 'success');
    
    // Close modal after a delay
    setTimeout(() => {
        closeTaskRegistration();
        showRegistrationConfirmation(formData);
    }, 2000);
}

function closeTaskRegistration() {
    console.log('Closing task registration modal');
    const modal = document.getElementById('task-registration-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showRegistrationConfirmation(formData) {
    const categoryData = taskCategories[formData.category];
    const selectedTasks = categoryData.tasks.filter(task => formData.selectedTasks.includes(task.id));
    
    showNotification(`
        🎉 Registration Successful!
        
        Category: ${categoryData.name}
        Selected Tasks: ${selectedTasks.map(task => task.title).join(', ')}
        Next Steps: You'll receive an email with task assignments and training materials within 24 hours.
    `, 'success');
}

// Global functions for task registration
window.showTaskRegistration = showTaskRegistration;
window.closeTaskRegistration = closeTaskRegistration;
window.submitTaskRegistration = submitTaskRegistration;

// Update analytics with live data simulation
function updateAnalytics() {
    // Simulate real-time updates to analytics
    setInterval(() => {
        const elements = document.querySelectorAll('.analytics-stats .stat-row strong');
        elements.forEach(element => {
            if (element.textContent.includes('1,247')) {
                const currentValue = parseInt(element.textContent.replace(',', ''));
                element.textContent = (currentValue + Math.floor(Math.random() * 3)).toLocaleString();
            }
        });
    }, 10000);
}

// Start live updates simulation
function startLiveUpdates() {
    // Simulate live notifications
    const notifications = [
        "🆕 New issue reported: Traffic signal malfunction",
        "✅ Issue resolved: Garbage collection on Park Road",
        "🔄 Issue status updated: Street repair in progress",
        "👥 Community validation: Pothole issue confirmed",
        "🏆 Badge earned: Community Helper milestone reached"
    ];
    
    let notificationIndex = 0;
    setInterval(() => {
        if (document.querySelector('.demo-panel.active')) {
            const notification = notifications[notificationIndex % notifications.length];
            showNotification(notification, 'info');
            notificationIndex++;
        }
    }, 15000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 3000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    notification.style.cssText = `
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--shadow-lg);
        max-width: 350px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-12);
        animation: slideIn 0.3s ease-out;
        pointer-events: all;
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for animations and demo styling
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .demo-container {
        max-width: 900px;
        margin: 0 auto;
    }
    
    .demo-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-24);
        margin-top: var(--space-20);
    }
    
    .mock-form .form-group {
        margin-bottom: var(--space-16);
    }
    
    .mock-form label {
        display: block;
        margin-bottom: var(--space-6);
        font-weight: var(--font-weight-medium);
    }
    
    .mock-form textarea,
    .mock-form input {
        width: 100%;
        padding: var(--space-8);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        background: var(--color-background);
        font-family: var(--font-family-base);
        resize: vertical;
    }
    
    .mock-image {
        background: var(--color-bg-2);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        text-align: center;
        border: 1px solid var(--color-border);
    }
    
    .classification-results {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
    }
    
    .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-8);
        background: var(--color-background);
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
    }
    
    .ai-insights {
        margin-top: var(--space-20);
        padding: var(--space-16);
        background: var(--color-bg-3);
        border-radius: var(--radius-base);
        border: 1px solid var(--color-success);
    }
    
    .ai-insights ul {
        margin: var(--space-8) 0 0 0;
        padding-left: var(--space-20);
    }
    
    .ai-insights li {
        margin-bottom: var(--space-4);
        color: var(--color-text);
    }
    
    .map-placeholder {
        width: 100%;
        height: 300px;
        background: var(--color-bg-1);
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-base);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        color: var(--color-text-secondary);
    }
    
    .map-marker {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: var(--font-size-2xl);
        animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, -50%) translateY(0);
        }
        40% {
            transform: translate(-50%, -50%) translateY(-10px);
        }
        60% {
            transform: translate(-50%, -50%) translateY(-5px);
        }
    }
    
    .map-info {
        position: absolute;
        bottom: var(--space-16);
        left: var(--space-16);
        background: var(--color-surface);
        padding: var(--space-8);
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
        font-size: var(--font-size-sm);
        color: var(--color-text);
    }
    
    .location-details {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
        margin-bottom: var(--space-20);
    }
    
    .detail-item {
        display: flex;
        align-items: flex-start;
        gap: var(--space-12);
    }
    
    .detail-icon {
        font-size: var(--font-size-lg);
        flex-shrink: 0;
    }
    
    .nearby-issues {
        padding: var(--space-16);
        background: var(--color-background);
        border-radius: var(--radius-base);
        border: 1px solid var(--color-border);
    }
    
    .nearby-item {
        display: flex;
        align-items: center;
        gap: var(--space-8);
        padding: var(--space-6) 0;
        font-size: var(--font-size-sm);
    }
    
    .nearby-distance {
        background: var(--color-bg-2);
        padding: var(--space-2) var(--space-6);
        border-radius: var(--radius-sm);
        font-weight: var(--font-weight-medium);
        min-width: 40px;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .demo-grid {
            grid-template-columns: 1fr;
        }
        
        .demo-content {
            padding: var(--space-20);
            margin: var(--space-10);
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .map-placeholder {
            height: 200px;
        }
    }
`;
document.head.appendChild(additionalStyle);

console.log('E-Samadhan JavaScript loaded successfully');