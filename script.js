// Füge das ganz oben in dein JavaScript ein, um zu testen:
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DEBUGGING START ===');
    
    // Prüfe alle wichtigen Elemente
    const elements = ['loginBtn', 'loginModal', 'adminDropdown', 'adminMenu'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}:`, element ? '✅ gefunden' : '❌ FEHLT');
    });
    
    // Teste Login Button direkt
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Login Button funktioniert!'); // Einfacher Test
        });
    }
    
    console.log('=== DEBUGGING ENDE ===');
});

function initCountdown() {
  const savedDate = localStorage.getItem('targetDate');

  // Ziel-Datum festlegen: 1. August 2025, 12:00 Uhr
  const fallbackTarget = new Date('2025-08-11T00:00:00');

  let targetDate;

  // Prüfen, ob Ziel-Datum gespeichert wurde
  if (savedDate) {
    targetDate = new Date(savedDate);
  } else {
    targetDate = fallbackTarget;
    localStorage.setItem('targetDate', targetDate.toISOString());
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      document.querySelector('.countdown-text').textContent = 'Website ist jetzt live!';
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}


// Tool Modal Functions
function openTool(toolName) {
    const modal = document.getElementById('toolModal');
    const content = document.getElementById('toolContent');
    
    switch(toolName) {
        case 'calculator':
            content.innerHTML = getCalculatorHTML();
            break;
        case 'textcounter':
            content.innerHTML = getTextCounterHTML();
            break;
        case 'qrcode':
            content.innerHTML = getQRCodeHTML();
            break;
        case 'password':
            content.innerHTML = getPasswordGeneratorHTML();
            break;
    }
    
    modal.style.display = 'block';
    
    // Initialize tool-specific functionality
    if (toolName === 'calculator') initCalculator();
    if (toolName === 'textcounter') initTextCounter();
    if (toolName === 'password') initPasswordGenerator();
}

// Tool HTML Templates
function getCalculatorHTML() {
    return `
        <h3>Taschenrechner</h3>
        <div class="calculator">
            <input type="text" id="calcDisplay" class="calc-display" readonly>
            <div class="calc-buttons">
                <button class="calc-btn" onclick="clearCalc()">C</button>
                <button class="calc-btn" onclick="deleteLast()">⌫</button>
                <button class="calc-btn operator" onclick="appendToCalc('/')">/</button>
                <button class="calc-btn operator" onclick="appendToCalc('*')">×</button>
                <button class="calc-btn" onclick="appendToCalc('7')">7</button>
                <button class="calc-btn" onclick="appendToCalc('8')">8</button>
                <button class="calc-btn" onclick="appendToCalc('9')">9</button>
                <button class="calc-btn operator" onclick="appendToCalc('-')">-</button>
                <button class="calc-btn" onclick="appendToCalc('4')">4</button>
                <button class="calc-btn" onclick="appendToCalc('5')">5</button>
                <button class="calc-btn" onclick="appendToCalc('6')">6</button>
                <button class="calc-btn operator" onclick="appendToCalc('+')">+</button>
                <button class="calc-btn" onclick="appendToCalc('1')">1</button>
                <button class="calc-btn" onclick="appendToCalc('2')">2</button>
                <button class="calc-btn" onclick="appendToCalc('3')">3</button>
                <button class="calc-btn operator" onclick="calculate()" rowspan="2">=</button>
                <button class="calc-btn" onclick="appendToCalc('0')" colspan="2">0</button>
                <button class="calc-btn" onclick="appendToCalc('.')">.</button>
            </div>
        </div>
    `;
}

function getTextCounterHTML() {
    return `
        <h3>Text Zähler</h3>
        <textarea id="textInput" placeholder="Gib deinen Text hier ein..." style="width: 100%; height: 200px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
        <div style="margin-top: 15px;">
            <p><strong>Zeichen:</strong> <span id="charCount">0</span></p>
            <p><strong>Zeichen (ohne Leerzeichen):</strong> <span id="charNoSpaceCount">0</span></p>
            <p><strong>Wörter:</strong> <span id="wordCount">0</span></p>
            <p><strong>Zeilen:</strong> <span id="lineCount">1</span></p>
        </div>
    `;
}

function getQRCodeHTML() {
    return `
        <h3>QR Code Generator</h3>
        <input type="text" id="qrInput" placeholder="Text oder URL eingeben..." style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px;">
        <button onclick="generateQR()" style="background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">QR Code erstellen</button>
        <div id="qrResult" style="text-align: center; margin-top: 20px;"></div>
    `;
}

function getPasswordGeneratorHTML() {
    return `
        <h3>Passwort Generator</h3>
        <div style="margin-bottom: 15px;">
            <label>Länge: <span id="lengthValue">12</span></label>
            <input type="range" id="passwordLength" min="4" max="50" value="12" style="width: 100%;">
        </div>
        <div style="margin-bottom: 15px;">
            <label><input type="checkbox" id="includeUppercase" checked> Großbuchstaben</label><br>
            <label><input type="checkbox" id="includeLowercase" checked> Kleinbuchstaben</label><br>
            <label><input type="checkbox" id="includeNumbers" checked> Zahlen</label><br>
            <label><input type="checkbox" id="includeSymbols"> Symbole</label>
        </div>
        <button onclick="generatePassword()" style="background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Passwort generieren</button>
        <div id="passwordResult" style="margin-top: 15px;"></div>
    `;
}

// Calculator Functions
function initCalculator() {
    // Calculator is ready
}

function appendToCalc(value) {
    document.getElementById('calcDisplay').value += value;
}

function clearCalc() {
    document.getElementById('calcDisplay').value = '';
}

function deleteLast() {
    const display = document.getElementById('calcDisplay');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('calcDisplay');
    try {
        display.value = eval(display.value.replace('×', '*'));
    } catch (error) {
        display.value = 'Error';
    }
}

// Text Counter Functions
function initTextCounter() {
    const textInput = document.getElementById('textInput');
    textInput.addEventListener('input', updateTextCount);
}

function updateTextCount() {
    const text = document.getElementById('textInput').value;
    document.getElementById('charCount').textContent = text.length;
    document.getElementById('charNoSpaceCount').textContent = text.replace(/\s/g, '').length;
    document.getElementById('wordCount').textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    document.getElementById('lineCount').textContent = text.split('\n').length;
}

// QR Code Generator
function generateQR() {
    const text = document.getElementById('qrInput').value;
    if (text.trim() === '') {
        alert('Bitte gib einen Text oder eine URL ein!');
        return;
    }
    
    const qrResult = document.getElementById('qrResult');
    qrResult.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}" alt="QR Code">`;
}

// Password Generator Functions
function initPasswordGenerator() {
    const lengthSlider = document.getElementById('passwordLength');
    lengthSlider.addEventListener('input', function() {
        document.getElementById('lengthValue').textContent = this.value;
    });
}

function generatePassword() {
    const length = document.getElementById('passwordLength').value;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        alert('Bitte wähle mindestens eine Option aus!');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('passwordResult').innerHTML = `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <strong>Generiertes Passwort:</strong><br>
            <code style="font-size: 16px; word-break: break-all;">${password}</code><br>
            <button onclick="copyToClipboard('${password}')" style="margin-top: 10px; background: #27ae60; color: white; padding: 5px 15px; border: none; border-radius: 3px; cursor: pointer;">Kopieren</button>
        </div>
    `;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Passwort wurde in die Zwischenablage kopiert!');
    });
}

function initChatbot() {
    const chatToggle = document.getElementById('chatToggle');
    const chatBody = document.querySelector('.chatbot-body');
    const sendButton = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    
    chatToggle.addEventListener('click', function() {
        // Verwende getComputedStyle() um den tatsächlichen CSS-Wert zu erhalten
        const isHidden = window.getComputedStyle(chatBody).display === 'none';
        
        chatToggle.addEventListener('click', function() {
    chatBody.classList.toggle('hidden');
    
    if (chatBody.classList.contains('hidden')) {
        chatToggle.textContent = '+';
    } else {
        chatToggle.textContent = '−';
    }
});

    });
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}


function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const responses = {
        'hallo': 'Hallo! Wie kann ich dir helfen?',
        'hilfe': 'Ich kann dir bei der Nutzung der Tools helfen. Welches Tool interessiert dich?',
        'tools': 'Wir haben einen Taschenrechner, Text-Zähler, QR-Code Generator und Passwort Generator verfügbar.',
        'rechner': 'Der Taschenrechner kann grundlegende mathematische Operationen durchführen.',
        'passwort': 'Der Passwort Generator erstellt sichere Passwörter nach deinen Vorgaben.',
        'qr': 'Mit dem QR-Code Generator kannst du QR-Codes für Text oder URLs erstellen.',
        'text': 'Der Text-Zähler zählt Zeichen, Wörter und Zeilen in deinem Text.',
        'countdown': 'Der Countdown zeigt die verbleibende Zeit bis zum vollständigen Website-Launch.',
        'default': 'Das verstehe ich nicht ganz. Kannst du deine Frage anders formulieren?'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }
    
    return responses['default'];
}

// Utility Functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Modal Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('toolModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Initialize components
    initCountdown();
    initChatbot();
});
// Admin Interface Functions
let isAdminLoggedIn = false;
let currentAdmin = null;

// Admin credentials (in production, this should be handled server-side)
const adminCredentials = {
    'admin': 'admin123',
    'moderator': 'mod123',
    'superuser': 'super456'
};

function initAdminInterface() {
    const loginBtn = document.getElementById('loginBtn');
    const adminDropdown = document.getElementById('adminDropdown');
    const adminMenu = document.getElementById('adminMenu');
    const loginForm = document.getElementById('loginForm');
    
    // Login button click
    loginBtn.addEventListener('click', function() {
        document.getElementById('loginModal').style.display = 'block';
    });
    
    // Admin dropdown toggle
    adminDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        adminMenu.classList.toggle('active');
        adminDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        adminMenu.classList.remove('active');
        adminDropdown.classList.remove('active');
    });
    
    // Login form submit
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Check if admin is already logged in (localStorage)
    checkExistingLogin();
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (adminCredentials[username] && adminCredentials[username] === password) {
        // Successful login
        isAdminLoggedIn = true;
        currentAdmin = username;
        
        // Save login state
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        
        // Update UI
        updateAdminUI();
        closeLoginModal();
        
        // Show success message
        showNotification('Erfolgreich angemeldet!', 'success');
        
    } else {
        // Failed login
        errorDiv.textContent = 'Ungültige Anmeldedaten!';
        errorDiv.style.display = 'block';
        
        // Clear error after 3 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

function checkExistingLogin() {
    const savedLogin = localStorage.getItem('adminLoggedIn');
    const savedUsername = localStorage.getItem('adminUsername');
    
    if (savedLogin === 'true' && savedUsername) {
        isAdminLoggedIn = true;
        currentAdmin = savedUsername;
        updateAdminUI();
    }
}

function updateAdminUI() {
    const loginSection = document.getElementById('loginSection');
    const adminPanel = document.getElementById('adminPanel');
    const adminUsername = document.getElementById('adminUsername');
    const adminAvatar = document.getElementById('adminAvatar');
    
    if (isAdminLoggedIn) {
        loginSection.style.display = 'none';
        adminPanel.style.display = 'block';
        adminUsername.textContent = currentAdmin;
        
        // Update avatar based on username
        const avatarColor = getAvatarColor(currentAdmin);
        const avatarLetter = currentAdmin.charAt(0).toUpperCase();
        adminAvatar.src = `https://via.placeholder.com/32x32/${avatarColor}/ffffff?text=${avatarLetter}`;
    } else {
        loginSection.style.display = 'block';
        adminPanel.style.display = 'none';
    }
}

function getAvatarColor(username) {
    const colors = ['3498db', 'e74c3c', '2ecc71', 'f39c12', '9b59b6', '1abc9c'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

function logout() {
    isAdminLoggedIn = false;
    currentAdmin = null;
    
    // Clear saved login
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    
    // Update UI
    updateAdminUI();
    
    // Close admin menu
    document.getElementById('adminMenu').classList.remove('active');
    document.getElementById('adminDropdown').classList.remove('active');
    
    showNotification('Erfolgreich abgemeldet!', 'info');
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').style.display = 'none';
}

// Admin Dashboard Functions
function openAdminDashboard() {
    if (!isAdminLoggedIn) return;
    
    document.getElementById('adminDashboardModal').style.display = 'block';
    document.getElementById('adminMenu').classList.remove('active');
    
    // Update dashboard stats (simulate real data)
    updateDashboardStats();
}

function closeAdminDashboard() {
    document.getElementById('adminDashboardModal').style.display = 'none';
}

function updateDashboardStats() {
    // Simulate dynamic stats
    const stats = {
        users: Math.floor(Math.random() * 2000) + 1000,
        toolUsage: Math.floor(Math.random() * 8000) + 3000,
        chatMessages: Math.floor(Math.random() * 5000) + 1000,
        pageViews: Math.floor(Math.random() * 20000) + 8000
    };
    
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = stats.users.toLocaleString();
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = stats.toolUsage.toLocaleString();
    document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = stats.chatMessages.toLocaleString();
    document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = stats.pageViews.toLocaleString();
}

// Admin Action Functions
function openUserManagement() {
    if (!isAdminLoggedIn) return;
    showNotification('Benutzerverwaltung wird geladen...', 'info');
    document.getElementById('adminMenu').classList.remove('active');
}

function openSiteSettings() {
    if (!isAdminLoggedIn) return;
    showNotification('Einstellungen werden geladen...', 'info');
    document.getElementById('adminMenu').classList.remove('active');
}

function openAnalytics() {
    if (!isAdminLoggedIn) return;
    showNotification('Analytics werden geladen...', 'info');
    document.getElementById('adminMenu').classList.remove('active');
}

function openToolManagement() {
    if (!isAdminLoggedIn) return;
    showNotification('Tool-Verwaltung wird geladen...', 'info');
    document.getElementById('adminMenu').classList.remove('active');
}

function openProfile() {
    if (!isAdminLoggedIn) return;
    showNotification('Profil wird geladen...', 'info');
    document.getElementById('adminMenu').classList.remove('active');
}

function toggleMaintenance() {
    if (!isAdminLoggedIn) return;
    showNotification('Wartungsmodus umgeschaltet!', 'warning');
}

function clearCache() {
    if (!isAdminLoggedIn) return;
    showNotification('Cache wurde geleert!', 'success');
}

function backupData() {
    if (!isAdminLoggedIn) return;
    showNotification('Backup wird erstellt...', 'info');
}

function viewLogs() {
    if (!isAdminLoggedIn) return;
    showNotification('Logs werden geladen...', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 25px rgba(0,0,0,0.2);
                z-index: 2000;
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 250px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success { border-left: 4px solid #27ae60; }
            .notification-error { border-left: 4px solid #e74c3c; }
            .notification-warning { border-left: 4px solid #f39c12; }
            .notification-info { border-left: 4px solid #3498db; }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Update the main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('toolModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === document.getElementById('loginModal')) {
            closeLoginModal();
        }
        if (event.target === document.getElementById('adminDashboardModal')) {
            closeAdminDashboard();
        }
    });
    
    // Initialize all components
    initCountdown();
    initChatbot();
    initAdminInterface(); // Add this line
});
