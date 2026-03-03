// Árfolyamok konstansként
const CURRENCY_RATES = { HUF: 405, USD: 1.08, EUR: 1 };

function calculate() {
    try {
        const prices = { select: 5, deluxe: 8, premium: 12, exclusive: 20, ultra: 30, bp: 1.5 };
        
        const currency = document.getElementById('currency').value;
        const symbol = currency === 'HUF' ? ' Ft' : (currency === 'USD' ? ' $' : ' €');

        let total = 0;
        
        // Inputok lekérése
        const level = parseFloat(document.getElementById('level').value) || 0;
        const rankMult = parseFloat(document.getElementById('rank').value) || 1;
        
        const s = parseFloat(document.getElementById('select').value) || 0;
        const d = parseFloat(document.getElementById('deluxe').value) || 0;
        const p = parseFloat(document.getElementById('premium').value) || 0;
        const e = parseFloat(document.getElementById('exclusive').value) || 0;
        const u = parseFloat(document.getElementById('ultra').value) || 0;
        const bp = parseFloat(document.getElementById('bp').value) || 0;

        // Összegzés
        total += (s * prices.select) + (d * prices.deluxe) + (p * prices.premium) + 
                 (e * prices.exclusive) + (u * prices.ultra) + (bp * prices.bp);
        total += (level * 0.05);

        // Checkboxok
        const rares = document.querySelectorAll('.val-rare:checked');
        rares.forEach(box => {
            total += parseFloat(box.value);
        });

        // Átváltás és régiós szorzó (0.8 fix biztonsági szorzó)
        let finalValue = total * rankMult * 0.8 * CURRENCY_RATES[currency];

        // Megjelenítés
        document.getElementById('total-val').innerText = finalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + symbol;
        document.getElementById('quick-sell').innerText = "Quick Sell: " + (finalValue * 0.7).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;
        document.getElementById('normal-sell').innerText = "Normal Sell: " + (finalValue * 1.1).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;

    } catch (err) {
        console.error("Calculation error:", err);
    }
}

function generateShareImage() {
    const qrBox = document.getElementById('qr-container');
    
    // QR generálás (ha a könyvtár betöltődött)
    if (typeof QRCode !== "undefined") {
        qrBox.innerHTML = "";
        qrBox.style.display = "block";
        new QRCode(qrBox, { text: window.location.href, width: 80, height: 80 });
    }

    // Várjunk egy picit, hogy a QR megjelenjen
    setTimeout(() => {
        if (typeof html2canvas !== "undefined") {
            html2canvas(document.getElementById('results-area'), { 
                backgroundColor: "#1f2326",
                scale: 2 
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'valcalc-result.png';
                link.href = canvas.toDataURL();
                link.click();
                qrBox.style.display = "none";
            });
        } else {
            alert("Image generator library still loading... try again in a sec.");
        }
    }, 300);
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
    const text = `My Valorant inventory is worth ${val}! Check yours at: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// Alaphelyzet betöltéskor
window.onload = calculate;

