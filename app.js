let currentGame = 'valorant';

function switchGame(game) {
    currentGame = game;
    document.getElementById('valorant-calc').style.display = game === 'valorant' ? 'block' : 'none';
    document.getElementById('fortnite-calc').style.display = game === 'fortnite' ? 'block' : 'none';
    
    document.getElementById('btn-val').classList.toggle('active', game === 'valorant');
    document.getElementById('btn-fn').classList.toggle('active', game === 'fortnite');
}

function calculate() {
    const getVal = (id) => Number(document.getElementById(id).value) || 0;
    let baseValue = 0;
    const regionMult = getVal("region");

    if (currentGame === 'valorant') {
        const rankMult = getVal("rank");
        
        let skinValue = (getVal("select") * 7) + (getVal("deluxe") * 10) + 
                        (getVal("premium") * 15) + (getVal("exclusive") * 20) + 
                        (getVal("ultra") * 25) + (getVal("bp") * 4);
        
        let progress = (getVal("level") * 0.03) + (getVal("agents") * 0.4);
        let wallet = (getVal("vp") / 100 * 0.7) + (getVal("rp") * 0.07);
        
        let rareItems = 0;
        document.querySelectorAll(".val-rare:checked").forEach(el => rareItems += Number(el.value));

        // Applying rank and region multipliers
        baseValue = (skinValue * 0.4 + progress + wallet + rareItems) * rankMult * regionMult;
        
    } else {
        // Fortnite Pricing
        let locker = (getVal("fn-skins") * 0.25) + (getVal("fn-axes") * 0.1) + (getVal("fn-emotes") * 0.05);
        let currency = (getVal("fn-vbucks") / 100 * 0.6);
        
        let rareItems = 0;
        document.querySelectorAll(".fn-rare:checked").forEach(el => rareItems += Number(el.value));

        baseValue = (locker + currency + rareItems) * regionMult;
    }

    // Applying the 0.8x Safety Multiplier
    const finalVal = baseValue;
    const normalSell = (finalVal * 0.9) * 0.8;
    const quickSell = (finalVal * 0.75) * 0.8;

    document.getElementById("total-val").innerText = finalVal.toFixed(2) + " €";
    document.getElementById("quick-sell").innerText = "Quick Sell: " + quickSell.toFixed(2) + " €";
    document.getElementById("normal-sell").innerText = "Normal Sell: " + normalSell.toFixed(2) + " €";
}

function updateRankColor() {
    const select = document.getElementById("rank");
    const colors = { 
        "Iron": "#7a7a7a", "Bronze": "#cd7f32", "Silver": "#c0c0c0", 
        "Gold": "#ffd700", "Platinum": "#00ffff", "Diamond": "#4ee1ff", 
        "Ascendant": "#4b0082", "Immortal": "#ff0055", "Radiant": "#ffff00" 
    };
    const rankName = select.options[select.selectedIndex].text.split(' ')[0];
    select.style.borderColor = colors[rankName] || "#ff4655";
}
