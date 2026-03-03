function calculate() {
    // Árak alapértékei (Euró)
    const prices = {
        select: 5,
        deluxe: 8,
        premium: 12,
        exclusive: 20,
        ultra: 30,
        bp: 1.5,
        vp_rate: 0.008,
        agent_price: 1.5
    };

    // Alapadatok beolvasása
    let total = 0;
    const level = parseFloat(document.getElementById('level').value) || 0;
    const rankMult = parseFloat(document.getElementById('rank').value) || 1;
    const agents = parseFloat(document.getElementById('agents').value) || 0;
    const vp = parseFloat(document.getElementById('vp').value) || 0;
    const regionMult = parseFloat(document.getElementById('region').value) || 1;

    // Skin számítás
    total += (parseFloat(document.getElementById('select').value) || 0) * prices.select;
    total += (parseFloat(document.getElementById('deluxe').value) || 0) * prices.deluxe;
    total += (parseFloat(document.getElementById('premium').value) || 0) * prices.premium;
    total += (parseFloat(document.getElementById('exclusive').value) || 0) * prices.exclusive;
    total += (parseFloat(document.getElementById('ultra').value) || 0) * prices.ultra;
    total += (parseFloat(document.getElementById('bp').value) || 0) * prices.bp;

    // VP és Ügynökök
    total += vp * prices.vp_rate;
    total += agents * prices.agent_price;
    total += (level * 0.05);

    // Ritka cuccok (checkboxok)
    document.querySelectorAll('.val-rare:checked').forEach(box => {
        total += parseFloat(box.value);
    });

    // Szorzók alkalmazása (Rank, Régió és a 0.8-as biztonsági szorzó)
    let finalValue = total * rankMult * regionMult * 0.8;

    // Eredmények kiírása
    document.getElementById('total-val').innerText = finalValue.toFixed(2) + " €";
    document.getElementById('quick-sell').innerText = "Quick Sell: " + (finalValue * 0.7).toFixed(2) + " €";
    document.getElementById('normal-sell').innerText = "Normal Sell: " + (finalValue * 1.1).toFixed(2) + " €";
}

function updateRankColor() {
    const rankSelect = document.getElementById('rank');
    const colors = {
        "1": "#ffffff", "1.02": "#666666", "1.08": "#cd7f32", "1.15": "#c0c0c0",
        "1.25": "#ffd700", "1.40": "#40e0d0", "1.65": "#b9f2ff", "2.10": "#4b0082",
        "2.80": "#ff4444", "4.50": "#ffffaa"
    };
    rankSelect.style.color = colors[rankSelect.value] || "#fff";
}
