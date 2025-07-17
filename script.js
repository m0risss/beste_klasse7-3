// Countdown Timer
function initCountdown() {
    // Setze das Zieldatum (30 Tage von heute)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            document.querySelector('.countdown-text').textContent = 'Website ist jetzt live!';
        }
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

// Chatbot Functions
function initChatbot() {
    const chatToggle = document.getElementById('chatToggle');
    const chatBody = document.querySelector('.chatbot-body');
    const sendButton = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    
    chatToggle.addEventListener('click', function() {
        if (chatBody.style.display === 'none') {
            chatBody.style.display = 'flex';
            chatToggle.textContent = '−';
        } else {
            chatBody.style.display = 'none';
            chatToggle.textContent = '+';
        }
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
