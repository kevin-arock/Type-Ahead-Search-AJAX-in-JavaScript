const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = []

fetch(endpoint)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    cities.push(...data);
    console.log(data)
})

function matchCity(word,cities){
    return cities.filter((obj)=>{
        let reg = new RegExp(word,'gi');
        return obj.city.match(reg) || obj.state.match(reg);
    })
}

function display(){
    const mat = matchCity(this.value,cities);
    const html = mat.map((obj)=>{
        let reg = new RegExp(this.value,'gi');
        const city = obj.city.replace(reg,`<span class="inner">${this.value}</span>`);
        const state = obj.state.replace(reg,`<span class="inner">${this.value}</span>`);
        return `
        <li>
            <span class="name">${city}, ${state}</span>
            <span class="population">${obj.population}</span>
        </li>
        <hr>
        `;
    }).join('');
    suggestions.innerHTML = html
}




const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', display);
searchInput.addEventListener('keyup', display);