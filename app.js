const rates = { HUF: 405, USD: 1.08, EUR: 1 };

function calculate() {
    const prices = { select: 5, deluxe: 8, premium: 12, exclusive: 20, ultra: 30, bp: 1.5 };
    const currency = document.getElementById('currency').value;
    const symbol = currency === 'HUF' ? ' Ft' : (currency === 'USD' ? ' $' : ' €');

    let total = 0;
    const level = parseFloat(document.getElementById('level').value) || 0;
    const rankMult = parseFloat(document.getElementById('rank').value) || 1;

    // Alap skinek
    total += (parseFloat(document.getElementById('select').value) || 0) * prices.select;
    total += (parseFloat(document.getElementById('deluxe').value) || 0) * prices.deluxe;
    total += (parseFloat(document.getElementById('premium').value) || 0) * prices.premium;
    total += (parseFloat(document.getElementById('exclusive').value) || 0) * prices.exclusive;
    total += (parseFloat(document.getElementById('ultra').value) || 0) * prices.ultra;
    total += (parseFloat(document.getElementById('bp').value) || 0) * prices.bp;
    total += (level * 0.05);

    // Ritka tárgyak
    document.querySelectorAll('.val-rare:checked').forEach(box => { total += parseFloat(box.value); });

    let finalValue = total * rankMult * 0.8 * rates[currency];

    document.getElementById('total-val').innerText = finalValue.toLocaleString(undefined, {maximumFractionDigits: 2}) + symbol;
    document.getElementById('quick-sell').innerText = "Quick Sell: " + (finalValue * 0.7).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;
    document.getElementById('normal-sell').innerText = "Normal Sell: " + (finalValue * 1.1).toLocaleString(undefined, {maximumFractionDigits: 0}) + symbol;
}

function generateShareImage() {
    const qrBox = document.getElementById('qr-container');
    qrBox.innerHTML = "";
    // QR kód generálása a képhez
    new QRCode(qrBox, { text: window.location.href, width: 70, height: 70 });
    qrBox.style.display = "inline-block";

    setTimeout(() => {
        html2canvas(document.getElementById('results-area'), { backgroundColor: "#1f2326" }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'valcalc-result.png';
            link.href = canvas.toDataURL();
            link.click();
            qrBox.style.display = "none";
        });
    }, 100);
}

function toggleTheme() { document.body.classList.toggle('light-mode'); }

function toggleGuide() { 
    const g = document.getElementById('skin-guide-content');
    g.style.display = (g.style.display === 'block') ? 'none' : 'block';
}

function shareResults() {
    const val = document.getElementById('total-val').innerText;
    const text = `My Valorant inventory is worth ${val}! Calculate yours at: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => alert("Result copied to clipboard!"));
}

function updateRankColor() {
    const r = document.getElementById('rank');
    r.style.color = "#ff4655"; 
}
