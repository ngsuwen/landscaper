// Features: Shop, Raid (only if you have a team), Lawn, Random events
// Shop => Buy equipment
// Mission: Earn $2000 in least number of days
// Extra feature: Raid => can gain money or lose team
// Extra feature: High Score table
// Extra feature: Random events => can gain or lose money

const player = {
}

// STARTING CONDITION
const newGame = () => {
    player['wallet'] = 0;
    player['scissors'] = false;
    player['lawnmower1'] = false;
    player['lawnmower2'] = false;
    player['team'] = false;
    player['age'] = 0
    document.querySelector('#day_count').innerText = 0
    document.querySelector('#wallet').innerText = '$0'
    document.querySelector('#inventory').innerText = 'Hands'
    player['name'] = prompt(
        'Enter your name',
        "Player 1"
      )
}

// LAWN
function teeth() {
    player['wallet'] += 1
    player['age'] += 1
    let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) + 1
    document.querySelector('#wallet').innerText = '$'+ wallet
    let day = Number(document.querySelector('#day_count').innerText) +1
    document.querySelector('#day_count').innerText = day
    mission()
}
function scissors() {
    if (!player['scissors']){
        alert('no scissors yet!')
        return
    }
    player['wallet'] += 5
    player['age'] += 1
    let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) + 5
    document.querySelector('#wallet').innerText = '$'+ wallet
    let day = Number(document.querySelector('#day_count').innerText) +1
    document.querySelector('#day_count').innerText = day
    mission()
}
function lawnmower1() {
    if (!player['lawnmower1']){
        alert('no old-timey push lawnmower yet!')
        return
    }
    player['wallet'] += 50
    player['age'] += 1
    let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) + 50
    document.querySelector('#wallet').innerText = '$'+ wallet
    let day = Number(document.querySelector('#day_count').innerText) +1
    document.querySelector('#day_count').innerText = day
    mission()
}
function lawnmower2() {
    if (!player['lawnmower2']){
        alert('no battery-powered lawnmower yet!')
        return
    }
    player['wallet'] += 100
    player['age'] += 1
    let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) + 100
    document.querySelector('#wallet').innerText = '$'+ wallet
    let day = Number(document.querySelector('#day_count').innerText) +1
    document.querySelector('#day_count').innerText = day
    mission()
}
function team() {
    if (!player['team']){
        alert('no team of gardeners!')
        return
    }
    player['wallet'] += 250
    player['age'] += 1
    let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) + 250
    document.querySelector('#wallet').innerText = '$'+ wallet
    let day = Number(document.querySelector('#day_count').innerText) +1
    document.querySelector('#day_count').innerText = day
    mission()
}

// RAID
function raid() {
    if (!player['team']){
        alert('no team yet!')
        return
    }
    let day = Number(document.querySelector('#day_count').innerText) +1
    document.querySelector('#day_count').innerText = day
    rng = Math.floor(Math.random()*10)
    if (rng<2) {
        alert('The raid failed and you lost your team of Gardeners')
        player['team'] = false
        player['age'] += 1
        replaceText = document.querySelector('#inventory').innerHTML
        document.querySelector('#inventory').innerHTML = replaceText.replace(', Team of Gardeners', '')
    }
    if (rng>=2 && rng<6) {
        player['age'] += 1
        alert('The raid was unsuccessful and you got nothing')
    }
    if (rng>=6) {
        alert('The raid was successful and you earned $500')
        player['wallet'] += 500
        player['age'] += 1
        let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) + 500
        document.querySelector('#wallet').innerText = '$'+ wallet
    }
    mission()
}

// RANDOM EVENT
function randomEvent() {
    rng = Math.floor(Math.random()*30)
    if (rng<=1) {
        alert('You found $5!')
        player['wallet'] += 5
        let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) + 5
        document.querySelector('#wallet').innerText = '$'+ wallet                
    }   
    if (rng>1 && rng <=2) {
        alert('You got robbed of $5!')
        player['wallet'] -= 5
        let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) - 5
        document.querySelector('#wallet').innerText = '$'+ wallet          
    }
}

// SHOP
function buyScissors() {
    if (player['scissors']) {
        alert('Sold out!')
        return
    }
    if (checkWallet(5, player['wallet'])) {
        player['scissors'] = true
        player['wallet'] -= 5
        alert("You bought scissors for $5. You have $" + player['wallet'] + " left.")
        document.querySelector('#inventory').innerText += ', Scissors'
        let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) - 5
        document.querySelector('#wallet').innerText = '$'+ wallet
        return
    }
    alert("You don't have enough money!")
}
function buyLawnmower1() {
    if (player['lawnmower1']) {
        alert('Sold out!')
        return
    }
    if (checkWallet(25, player['wallet'])) {
        player['lawnmower1'] = true
        player['wallet'] -= 25
        alert("You bought old-timey push lawnmower for $25. You have $" + player['wallet'] + " left.")
        document.querySelector('#inventory').innerText += ', Old-timey push Lawnmower'
        let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) - 25
        document.querySelector('#wallet').innerText = '$'+ wallet
        return
    }
    alert("You don't have enough money!")
}
function buyLawnmower2() {
    if (player['lawnmower2']) {
        alert('Sold out!')
        return
    }
    if (checkWallet(250, player['wallet'])) {
        player['lawnmower2'] = true
        player['wallet'] -= 250
        alert("You bought battery-powered lawnmower for $250. You have $" + player['wallet'] + " left.")
        document.querySelector('#inventory').innerText += ', Battery-powered Lawnmower'
        let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) - 250
        document.querySelector('#wallet').innerText = '$'+ wallet
        return
    }
    alert("You don't have enough money!")
}
function buyTeam() {
    if (checkWallet(500, player['wallet'])) {
        player['team'] = true
        player['wallet'] -= 500
        alert("You hired a team for $500. You have $" + player['wallet'] + " left.")
        document.querySelector('#inventory').innerText += ', Team of Gardeners'
        let wallet = Number(document.querySelector('#wallet').innerText.substr(1)) - 500
        document.querySelector('#wallet').innerText = '$'+ wallet
        return
    }
    alert("You don't have enough money!")
}

function checkWallet(cost, wallet) {
    if (wallet>=cost) {
        return true
    }
    return false
}

function mission() {
    randomEvent()
    if (player['team'] && Number(document.querySelector('#wallet').innerText.substr(1)) >= 2000) {
        alert('You win!')
        document.querySelector('#high_score').innerText = player['name']+': ' + player['age']+' days'
    }
}



newGame()

document.querySelector('#new_game').onclick = newGame;
document.querySelector('#buy_scissors').onclick = buyScissors;
document.querySelector('#buy_lawnmower1').onclick = buyLawnmower1;
document.querySelector('#buy_lawnmower2').onclick = buyLawnmower2;
document.querySelector('#buy_team').onclick = buyTeam;

document.querySelector('#lawn_teeth').onclick = teeth;
document.querySelector('#lawn_scissors').onclick = scissors;
document.querySelector('#lawn_lawnmower1').onclick = lawnmower1;
document.querySelector('#lawn_lawnmower2').onclick = lawnmower2;
document.querySelector('#lawn_team').onclick = team;
document.querySelector('#raid').onclick = raid;