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
        
        // Skin Value (Market Average)
        let skinValue = (getVal("select") * 7.5) + (getVal("deluxe") * 11) + 
                        (getVal("premium") * 16) + (getVal("exclusive") * 22) + 
                        (getVal("ultra") * 28) + (getVal("bp") * 4.5);
        
        // Account Progress & Currency
        let progressValue = (getVal("level") * 0.04) + (getVal("agents") * 0.4);
        let walletValue = (getVal("vp") / 100 * 0.75) + (getVal("rp") * 0.08) + (getVal("kc") / 4000);
        
        // Rare Item Checkbox Logic
        let rareItems = 0;
        document.querySelectorAll(".val-rare:checked").forEach(el => rareItems += Number(el.value));

        baseValue = (skinValue * 0.42 + progressValue + walletValue + rareItems) * rankMult * regionMult;
        
    } else {
        // Fortnite Pricing Logic
        let lockerBase = (getVal("fn-skins") * 0.28) + (getVal("fn-axes") * 0.12) + (getVal("fn-emotes") * 0.05);
        let currency = (getVal("fn-vbucks") / 100 * 0.62);
        
        let rareItems = 0;
        document.querySelectorAll(".fn-rare:checked").forEach(el => rareItems += Number(el.value));

        baseValue = (lockerBase + currency + rareItems) * regionMult;
    }

    // Applying the 0.8x Safety Multiplier
    const finalVal = baseValue;
    const normalSell = (finalVal * 0.9) * 0.8;
    const quickSell = (finalVal * 0.8) * 0.8;

    // Displaying results
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