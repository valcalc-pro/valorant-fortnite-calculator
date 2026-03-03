const rates = { HUF: 405, USD: 1.08, EUR: 1 };

function calculate() {
    const prices = { select: 5, deluxe: 8, premium: 12, exclusive: 20, ultra: 30, bp: 1.5, vp_rate: 0.008, agent_price: 1.5 };
    const currency = document.getElementById('currency').value;
    const symbol = currency === 'HUF' ? ' Ft' : (currency === 'USD' ? ' $' : ' €');

    let total = 0;
    const level = parseFloat(document.getElementById('level').value) || 0;
    const rankMult = parseFloat(document.getElementById('rank').value) || 1;

    total += (parseFloat(document.getElementById('select').value) || 0) * prices.select;
    total += (parseFloat(document.getElementById('deluxe').value) || 0) * prices.deluxe;
    total += (parseFloat(document.getElementById('premium').value) || 0) * prices.premium;
    total += (parseFloat(document.getElementById('exclusive').value) || 0) * prices.exclusive;
    total += (parseFloat(document.getElementById('ultra').value) || 0) * prices.ultra;
    total += (parseFloat(document.getElementById('bp').value) || 0) * prices.bp;
    total += (level * 0.05);

    document.querySelectorAll('.val-rare:checked').forEach(box => { total += parseFloat(box.value); });

    let finalValue = total * rankMult * 0.8 * rates[currency];

    document.getElementById('total-val').innerText = finalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + symbol;
    document.getElementById('quick-sell').innerText = "Quick Sell: " + (finalValue * 0.7).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;
    document.getElementById('normal-sell').innerText = "Normal Sell: " + (finalValue * 1.1).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;
}

// QR KÓD ÉS KÉP GENERÁLÁS
function generateShareImage() {
    const qrContainer = document.getElementById('qr-container');
    const watermark = document.getElementById('watermark');
    
    // Előző QR kód törlése és új generálása
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: window.location.href,
        width: 80,
        height: 80,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Elemek megjelenítése a képhez
    qrContainer.style.display = "block";
    watermark.style.display = "block";

    const element = document.getElementById('results-area');
    
    html2canvas(element, {
        backgroundColor: "#1f2326",
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'valcalc-pro-inventory.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        // Letöltés után újra elrejtjük a weboldalon
        qrContainer.style.display = "none";
        watermark.style.display = "none";
    });
}

function toggleTheme() { document.body.classList.toggle('light-mode'); }
function toggleGuide() { 
    const g = document.getElementById('skin-guide-content');
    g.style.display = g.style.display === 'block' ? 'none' : 'block';
}

function shareResults() {
    const val = document.getElementById('total-val').innerText;
    const text = `My Valorant inventory is worth ${val}! Calculate yours: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => alert("Text link copied!"));
}

function updateRankColor() {
    const r = document.getElementById('rank');
    const c = { "1": "#fff", "1.02": "#666", "1.08": "#cd7f32", "1.15": "#c0c0c0", "1.25": "#ffd700", "1.40": "#40e0d0", "1.65": "#b9f2ff", "2.10": "#4b0082", "2.80": "#ff4444", "4.50": "#ffffaa" };
    r.style.color = c[r.value] || "#fff";
}
