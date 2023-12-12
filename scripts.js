let exCidade = "São Paulo";

let cidade = document.querySelector(".localizacao");
let climaIcone = document.querySelector(".icone");
let climaTemp = document.querySelector(".temperatura");
let climaMaxMin = document.querySelector(".min-max")
let climaSensacao = document.querySelector('.sensacao-termica');
let climaUmidade = document.querySelector('.umidade');
let climaVento = document.querySelector('.vento');

document.querySelector(".pesquisa").addEventListener('submit', e => {
    let pesquisa = document.querySelector(".pesquisa input");
    e.preventDefault();
    exCidade = pesquisa.value;
    mostrarClima();
    pesquisa.value = ""
})

function converterCountry(country) {
    let regiao = new Intl.DisplayNames(["pt-br"], { type: "region" });
    return regiao.of(country)
}

function mostrarClima() {
    const APIKey = '7d0b398a095805cea1bc758781c8b904'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${exCidade}&units=metric&appid=${APIKey}`).then(resposta => resposta.json()).then(dados => {
        console.log(dados)
        cidade.innerHTML = `${dados.name}, ${converterCountry(dados.sys.country)}`
        climaTemp.innerHTML = `${dados.main.temp.toFixed()}°C`
        climaIcone.innerHTML = `<img src="http://openweathermap.org/img/wn/${dados.weather[0].icon}@4x.png"/>`
        climaMaxMin.innerHTML = `<p>Min: ${dados.main.temp_min.toFixed()}°C</p><p>Max: ${dados.main.temp_max.toFixed()}°C</p>`
        climaSensacao.innerHTML = `${dados.main.feels_like.toFixed()}°C`
        climaUmidade.innerHTML = `${dados.main.humidity}%`
        climaVento.innerHTML = `${parseInt(dados.wind.speed)}Km/h`
    })
}

document.body.addEventListener('load', mostrarClima())
