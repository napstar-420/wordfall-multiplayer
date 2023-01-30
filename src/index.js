import './style.css';

const fontBoogaloo = document.createElement('h1');
const fontBarlow = document.createElement('h1');
const fontLuckiestGuy = document.createElement('h1');
fontBarlow.textContent = 'WORDFALL';
fontBoogaloo.textContent = 'WORDFALL';
fontLuckiestGuy.textContent = 'WORDFALL';
fontBarlow.classList.add('font-barlow');
fontBoogaloo.classList.add('font-boogaloo');
fontLuckiestGuy.classList.add('font-luckiest-guy');
document.body.appendChild(fontBarlow)
document.body.appendChild(fontBoogaloo)
document.body.appendChild(fontLuckiestGuy);