const rates = { HUF: 405, USD: 1.08, EUR: 1 };

// Ár csökkentések:
// select -50%
// deluxe -30%
// többi -10%
const prices = {
    select: 5 * 0.5,        // 2.5
    deluxe: 8 * 0.7,        // 5.6
    premium: 12 * 0.9,      // 10.8
    exclusive: 20 * 0.9,    // 18
    ultra: 30 * 0.9,        // 27
    bp: 1.5 * 0.9           // 1.35
};

function getValue(id) {
    return parseFloat(document.getElementById(id).value) || 0;
}

function currencySymbol(currency) {
    if (currency === 'HUF') return ' Ft';
    if (currency === 'USD') return ' $';
    return ' €';
}

function formatMoney(value, decimals = 2) {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function calculate() {
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbol(currency);

    let total = 0;

    const level = getValue('level');
    const rankMult = getValue('rank') || 1;

    // Skinek
    Object.keys(prices).forEach(key => {
        total += getValue(key) * prices[key];
    });

    // Level
    total += level * 0.05;

    // Rare items
    document.querySelectorAll('.val-rare:checked').forEach(box => {
        total += parseFloat(box.value);
    });

    // eredeti képleted logikája: * rank * 0.8 * rate
    const finalValue = total * rankMult * 0.8 * rates[currency];

    // UI update
    document.getElementById('total-val').innerText = formatMoney(finalValue, 2) + symbol;

    document.getElementById('quick-sell').innerText =
        "Quick Sell: " + formatMoney(finalValue * 0.7, 0) + symbol;

    document.getElementById('normal-sell').innerText =
        "Normal Sell: " + formatMoney(finalValue * 1.1, 0) + symbol;

    // Eredmények megjelenítése csak gombnyomás után
    document.getElementById('results-area').style.display = "block";

    // Share card frissítés
    updateShareCard(finalValue, currency, symbol);
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function toggleGuide() {
    const g = document.getElementById('skin-guide-content');
    g.style.display = (g.style.display === "block") ? "none" : "block";
}

function shareResults() {
    const val = document.getElementById('total-val').innerText;
    const text = `My Valorant inventory is worth ${val}! Check yours: ${window.location.href}`;
    navigator.clipboard.writeText(text)
        .then(() => alert("Result copied to clipboard!"))
        .catch(() => alert("Copy failed."));
}

// --- SHARE CARD (QR + képmentés) ---

function updateShareCard(finalValue, currency, symbol) {
    // Szövegek a kártyán
    document.getElementById('card-value').innerText = formatMoney(finalValue, 2) + symbol;
    document.getElementById('card-quick').innerText = formatMoney(finalValue * 0.7, 0) + symbol;
    document.getElementById('card-normal').innerText = formatMoney(finalValue * 1.1, 0) + symbol;

    // QR kód újragenerálása
    const qrHost = window.location.origin + window.location.pathname;
    const qrText = `${qrHost}?v=${encodeURIComponent(finalValue.toFixed(2))}&c=${encodeURIComponent(currency)}`;

    const qrEl = document.getElementById('qr');
    qrEl.innerHTML = "";

    // QRCode.js
    new QRCode(qrEl, {
        text: qrText,
        width: 88,
        height: 88,
        correctLevel: QRCode.CorrectLevel.M
    });
}

async function downloadCard() {
    const card = document.getElementById('share-card');

    // html2canvas render
    const canvas = await html2canvas(card, {
        backgroundColor: null,
        scale: 2
    });

    // letöltés
    const link = document.createElement('a');
    link.download = 'valcalc-value-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}


