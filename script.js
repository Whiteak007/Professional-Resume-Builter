// DOM Elements
const generateResumeBtn = document.getElementById('generateResumeBtn');
const loader = document.getElementById('loader');
const templateOptions = document.querySelectorAll('.template-option');

// Add experience section
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'item-group experience-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label class="form-label">Job Title</label>
            <input type="text" class="form-input experience-position" placeholder="Senior Developer">
        </div>
        <div class="form-group">
            <label class="form-label">Company</label>
            <input type="text" class="form-input experience-company" placeholder="Tech Company Inc.">
        </div>
        <div class="form-group">
            <label class="form-label">Duration</label>
            <input type="text" class="form-input experience-duration" placeholder="Jan 2020 - Present">
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-input textarea-input experience-description" placeholder="Responsibilities and achievements..."></textarea>
        </div>
        <button class="remove-item-btn" onclick="removeItem(this, 'experienceContainer')">
            <i class="fas fa-trash-alt"></i> <span>Remove</span>
        </button>
    `;
    container.appendChild(newItem);
    animateNewItem(newItem);
}

// Add project section
function addProject() {
    const container = document.getElementById('projectsContainer');
    const newItem = document.createElement('div');
    newItem.className = 'item-group project-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label class="form-label">Project Title</label>
            <input type="text" class="form-input project-title" placeholder="E-commerce Platform">
        </div>
        <div class="form-group">
            <label class="form-label">Project Description</label>
            <textarea class="form-input textarea-input project-description" placeholder="Detailed description of the project..."></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Tech Stack</label>
            <input type="text" class="form-input project-tech-stack" placeholder="JavaScript, React, Node.js">
            <small class="input-hint">Separate technologies with commas</small>
        </div>
        <div class="form-group">
            <label class="form-label">Project Link</label>
            <input type="text" class="form-input project-link" placeholder="https://project.example.com">
            <small class="input-hint">Include full URL (https://)</small>
        </div>
        <button class="remove-item-btn" onclick="removeItem(this, 'projectsContainer')">
            <i class="fas fa-trash-alt"></i> <span>Remove</span>
        </button>
    `;
    container.appendChild(newItem);
    animateNewItem(newItem);
}

// Add education section
function addEducation() {
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'item-group education-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label class="form-label">Degree</label>
            <input type="text" class="form-input education-degree" placeholder="Bachelor of Science">
        </div>
        <div class="form-group">
            <label class="form-label">Institution</label>
            <input type="text" class="form-input education-school" placeholder="University Name">
        </div>
        <div class="form-group">
            <label class="form-label">Duration</label>
            <input type="text" class="form-input education-duration" placeholder="2016 - 2020">
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-input textarea-input education-description" placeholder="Relevant coursework or achievements..."></textarea>
        </div>
        <button class="remove-item-btn" onclick="removeItem(this, 'educationContainer')">
            <i class="fas fa-trash-alt"></i> <span>Remove</span>
        </button>
    `;
    container.appendChild(newItem);
    animateNewItem(newItem);
}

// Animation for new items
function animateNewItem(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';

    setTimeout(() => {
        item.style.transition = 'all 0.4s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 10);

    // Scroll to the new item
    setTimeout(() => {
        item.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }, 100);
}

// Remove item from container
function removeItem(button, containerId) {
    const container = document.getElementById(containerId);
    const item = button.closest('.item-group');

    if (container.children.length > 1) {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            container.removeChild(item);
        }, 300);
    } else {
        showAlert('You need at least one item in this section.', 'warning');
    }
}

// Show alert message
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 3000);
}

// Profile picture upload functionality
document.getElementById('profilePicture').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.match('image.*')) {
            showAlert('Please select an image file (JPEG, PNG, etc.)', 'error');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showAlert('Image size should be less than 2MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('picturePreview');
            preview.src = event.target.result;
            document.getElementById('picturePreviewContainer').classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
});

// Template selection
templateOptions.forEach(option => {
    option.addEventListener('click', function() {
        templateOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    });
});

// Generate the resume
generateResumeBtn.addEventListener('click', generateResume);

function generateResume() {
    // Show loading animation
    loader.classList.add('active');

    // Simulate processing delay (for demo purposes)
    setTimeout(() => {
        createResumeContent();
        loader.classList.remove('active');

        // Scroll to preview section
        document.getElementById('resumePreview').scrollIntoView({
            behavior: 'smooth'
        });
    }, 1500);
}

function createResumeContent() {
    const resumePreview = document.getElementById('resumePreview');

    // Get personal information
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const jobTitle = document.getElementById('jobTitle').value || 'Professional Title';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const address = document.getElementById('address').value || 'City, Country';
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const summary = document.getElementById('summary').value || 'Experienced professional with...';

    // Get skills
    const skillsInput = document.querySelector('.skill-input').value;
    const skills = skillsInput ? skillsInput.split(',').map(skill => skill.trim()) : ['Skill 1', 'Skill 2', 'Skill 3'];

    // Get work experience
    const experienceItems = [];
    document.querySelectorAll('#experienceContainer .experience-item').forEach(item => {
        experienceItems.push({
            position: item.querySelector('.experience-position').value || 'Job Title',
            company: item.querySelector('.experience-company').value || 'Company Name',
            duration: item.querySelector('.experience-duration').value || 'Duration',
            description: item.querySelector('.experience-description').value || 'Job responsibilities and achievements...'
        });
    });

    // Get projects
    const projectItems = [];
    document.querySelectorAll('#projectsContainer .project-item').forEach(item => {
        const techStack = item.querySelector('.project-tech-stack').value;
        const techStackItems = techStack ? techStack.split(',').map(tech => tech.trim()) : [];

        projectItems.push({
            title: item.querySelector('.project-title').value || 'Project Title',
            description: item.querySelector('.project-description').value || 'Project description...',
            techStack: techStackItems,
            link: item.querySelector('.project-link').value || ''
        });
    });

    // Get education
    const educationItems = [];
    document.querySelectorAll('#educationContainer .education-item').forEach(item => {
        educationItems.push({
            degree: item.querySelector('.education-degree').value || 'Degree',
            school: item.querySelector('.education-school').value || 'Institution Name',
            duration: item.querySelector('.education-duration').value || 'Duration',
            description: item.querySelector('.education-description').value || 'Relevant coursework or achievements...'
        });
    });

    // Get selected template
    const selectedTemplate = document.querySelector('.template-option.active').dataset.template;

    // Generate HTML for resume based on selected template
    let resumeHTML = '';

    if (selectedTemplate === 'classic') {
        resumeHTML = generateClassicTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems);
    } else if (selectedTemplate === 'modern') {
        resumeHTML = generateModernTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems);
    } else {
        resumeHTML = generateCreativeTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems);
    }

    // Update preview
    resumePreview.innerHTML = resumeHTML;

    // Show action buttons
    document.getElementById('actionButtons').classList.remove('hidden');
}

// Template generators
function generateClassicTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems) {
    let html = `
        <div class="resume-header">
${document.getElementById('profilePicture').files.length > 0 ? 
    `<img src="${document.getElementById('picturePreview').src}" class="profile-picture-resume" alt="Profile Photo">` : 
    '<div class="profile-picture-placeholder"><i class="fas fa-user"></i></div>'}
            <h1 class="resume-name">${fullName}</h1>
            <div class="resume-title">${jobTitle}</div>
            <div class="resume-contact">
                ${email ? `<div class="contact-item"><i class="fas fa-envelope"></i> ${email}</div>` : ''}
                ${phone ? `<div class="contact-item"><i class="fas fa-phone"></i> ${phone}</div>` : ''}
                ${address ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${address}</div>` : ''}
                ${linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i> <a href="https://${linkedin}" target="_blank">${linkedin.replace('https://', '').replace('www.', '')}</a></div>` : ''}
                ${github ? `<div class="contact-item"><i class="fab fa-github"></i> <a href="https://${github}" target="_blank">${github.replace('https://', '').replace('www.', '')}</a></div>` : ''}
            </div>
        </div>
    `;

    // Add summary if exists
    if (summary) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Summary</h2>
                <div class="resume-summary">
                    ${summary.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    }

    // Add experience if exists
    if (experienceItems.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Work Experience</h2>
        `;

        experienceItems.forEach(exp => {
            html += `
                <div class="experience-item">
                    <div class="experience-header">
                        <div>
                            <span class="experience-position">${exp.position}</span>
                            <span class="experience-company">, ${exp.company}</span>
                        </div>
                        <div class="experience-duration">${exp.duration}</div>
                    </div>
                    <div class="experience-description">
                        ${exp.description.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    }

    // Add projects if exists
    if (projectItems.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Projects</h2>
        `;

        projectItems.forEach(project => {
            html += `
                <div class="project-item">
                    <div class="project-header">
                        <div class="project-title">${project.title}</div>
                        ${project.link ? `<div class="project-link"><a href="${project.link.startsWith('http') ? project.link : 'https://' + project.link}" target="_blank">View Project</a></div>` : ''}
                    </div>
                    <div class="project-description">
                        ${project.description.replace(/\n/g, '<br>')}
                    </div>
                    ${project.techStack.length > 0 ? `
                        <div class="tech-stack-list">
                            ${project.techStack.map(tech => `<div class="tech-stack-item">${tech}</div>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        });

        html += `</div>`;
    }

    // Add education if exists
    if (educationItems.length > 0) {
        html += `
            <div class="resume-section">
                <h2 class="resume-section-title">Education</h2>
        `;

        educationItems.forEach(edu => {
            html += `
                <div class="education-item">
                    <div class="education-header">
                        <div>
                            <span class="education-degree">${edu.degree}</span>
                            <span class="education-school">, ${edu.school}</span>
                        </div>
                        <div class="education-duration">${edu.duration}</div>
                    </div>
                    <div class="education-description">
                        ${edu.description.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    }

    // Add skills
    html += `
        <div class="resume-section">
            <h2 class="resume-section-title">Skills</h2>
            <div class="skills-list">
                ${skills.map(skill => skill ? `<div class="skill-item">${skill}</div>` : '').join('')}
            </div>
        </div>
    `;

    return html;
}

function generateModernTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems) {
    // Similar structure as classic but with different styling classes
    // Implementation would be similar to generateClassicTemplate but with different HTML structure
    return generateClassicTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems);
}

function generateCreativeTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems) {
    // Similar structure as classic but with different styling classes
    // Implementation would be similar to generateClassicTemplate but with different HTML structure
    return generateClassicTemplate(fullName, jobTitle, email, phone, address, linkedin, github, summary, skills, experienceItems, projectItems, educationItems);
}

// Print resume
function printResume() {
    window.print();
}

// Download resume as PDF
function downloadResume() {
    showAlert('PDF download functionality would be implemented with a library like jsPDF or html2pdf', 'info');
    // In a real implementation, you would use a library like jsPDF or html2pdf
    // to convert the resume preview to a PDF and trigger a download
}

// Edit resume
function editResume() {
    document.getElementById('resumeForm').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
        group.classList.add('animate__animated', 'animate__fadeInUp');
    });

    // Set default template
    document.querySelector('.template-option').classList.add('active');
});