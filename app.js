// Árfolyamok
const rates = { HUF: 405, USD: 1.08, EUR: 1 };

function calculate() {
    console.log("Calculating..."); // Debug üzenet a böngésző konzolba
    
    const prices = { select: 5, deluxe: 8, premium: 12, exclusive: 20, ultra: 30, bp: 1.5 };
    
    // Elemek biztonságos lekérése
    const currency = document.getElementById('currency').value;
    const symbol = currency === 'HUF' ? ' Ft' : (currency === 'USD' ? ' $' : ' €');

    let total = 0;
    
    // Számok beolvasása (biztonsági mentéssel, ha üres lenne)
    const level = parseFloat(document.getElementById('level').value) || 0;
    const rankMult = parseFloat(document.getElementById('rank').value) || 1;
    const select = parseFloat(document.getElementById('select').value) || 0;
    const deluxe = parseFloat(document.getElementById('deluxe').value) || 0;
    const premium = parseFloat(document.getElementById('premium').value) || 0;
    const exclusive = parseFloat(document.getElementById('exclusive').value) || 0;
    const ultra = parseFloat(document.getElementById('ultra').value) || 0;
    const bp = parseFloat(document.getElementById('bp').value) || 0;

    // Matek
    total += select * prices.select;
    total += deluxe * prices.deluxe;
    total += premium * prices.premium;
    total += exclusive * prices.exclusive;
    total += ultra * prices.ultra;
    total += bp * prices.bp;
    total += (level * 0.05);

    // Checkboxok
    document.querySelectorAll('.val-rare:checked').forEach(box => {
        total += parseFloat(box.value);
    });

    let finalValue = total * rankMult * 0.8 * rates[currency];

    // Megjelenítés kényszerítése
    const totalDisplay = document.getElementById('total-val');
    const quickDisplay = document.getElementById('quick-sell');
    const normalDisplay = document.getElementById('normal-sell');

    totalDisplay.innerText = finalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + symbol;
    quickDisplay.innerText = "Quick Sell: " + (finalValue * 0.7).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;
    normalDisplay.innerText = "Normal Sell: " + (finalValue * 1.1).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;
}

function generateShareImage() {
    const qrBox = document.getElementById('qr-container');
    qrBox.innerHTML = "";
    qrBox.style.display = "block";
    
    new QRCode(qrBox, { text: window.location.href, width: 80, height: 80 });

    setTimeout(() => {
        html2canvas(document.getElementById('results-area'), { 
            backgroundColor: "#1f2326",
            scale: 2 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'valcalc-pro-result.png';
            link.href = canvas.toDataURL();
            link.click();
            qrBox.style.display = "none";
        });
    }, 200);
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function toggleGuide() {
    const g = document.getElementById('skin-guide-content');
    if (g.style.display === "block") {
        g.style.display = "none";
    } else {
        g.style.display = "block";
    }
}

function shareResults() {
    const val = document.getElementById('total-val').innerText;
    const text = `My Valorant inventory is worth ${val}! Check yours at: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => alert("Result copied to clipboard!"));
}

// Kezdő számítás az oldal betöltésekor
window.onload = calculate;
