// meniu eventai
const navDOM = document.querySelectorAll('header nav .link');
for (let i = 0; i < navDOM.length; i++) {
    navDOM[i].addEventListener('click', () => {
        for (let i = 0; i < navDOM.length; i++) {
            navDOM[i].classList.remove("active");
        }
        navDOM[i].classList.add("active");
        document.getElementsByClassName('row')[0].style.marginLeft = `-${i * innerWidth}px`;
    })
}

// RENDER
const renderGarden = () => {
    axios({
            method: 'post',
            url: './components/renderGarden.php',
        })
        .then(function(response) {
            document.querySelector('.gardenPlace').innerHTML = '';
            document.querySelector('.growingPlace').innerHTML = '';
            document.querySelector('.pickPlace').innerHTML = '';
            for (let i = 0; i < response.data.length; i++) {
                document.querySelector('.gardenPlace').insertAdjacentHTML('beforeend', `
                <div class='garden'>
                <div class='data'>
                <img src='./img/a${response.data[i].img}.jpg' alt='agurkai'>
                </div>
                <div class='data'>${response.data[i].id}</div> 
                <div class='data'>${response.data[i].count}</div> 
                <div class='data close'>X</div>
                </div>
                `);
                document.querySelector('.growingPlace').insertAdjacentHTML('beforeend', `
                    <div class='growing'>
                    <div class='data'>
                    <img src='./img/a${response.data[i].img}.jpg' alt='agurkai'>
                    </div>
                    <div class='data'>${response.data[i].id}</div> 
                    <div class='data'>${response.data[i].count}</div> 
                    <div class='data'>${Math.round(Math.random() * 10)}</div> 
                    </div>
                    `);
                document.querySelector('.pickPlace').insertAdjacentHTML('beforeend', `
                        <div class='pick'>
                        <div class='data'>
                        <img src='./img/a${response.data[i].img}.jpg' alt='agurkai'>
                        </div>
                        <div class='data'>${response.data[i].id}</div> 
                        <div class='data'>${response.data[i].count}</div> 
                        <div class='data'>
                    <input type='text' id='count'>
                    </div>
                    <div class='data'>
                    <button id='buttonPick'>Skinti</button>
                    </div>
                    <div class='data'>
                    <button id='buttonPickAll'>Skinti viska</button>
                    </div>
                <div class='callBack' id='addMessage'></div>

                        </div>
                        `);
                // DELETE
                const gardenDOM = document.querySelectorAll('.garden');
                document.querySelectorAll('.box .close')[i].addEventListener('click', () => {
                    if (confirm(`Tikrai istrinti agurkus nr. ${gardenDOM[i + 1].childNodes[3].innerText}?`) == true) {
                        const id = gardenDOM[i + 1].childNodes[3].innerText;
                        let data = new URLSearchParams();
                        data.append('id', id);
                        axios({
                                method: 'post',
                                data: data,
                                url: './components/deleteGarden.php',
                            })
                            .then(function(response) {
                                alert(response.data.message);
                                renderGarden();
                            });
                    }
                });
            }
            // SKINIMAS
            const DOM = document.querySelectorAll('#buttonPick');
            for (let i = 0; i < DOM.length; i++) {
                document.querySelectorAll('#buttonPick')[i].addEventListener('click', () => {
                    const id = document.querySelectorAll('.growing')[i + 1].childNodes[3].innerText;
                    const amount = document.querySelectorAll('#count')[i].value;
                    let data = new URLSearchParams();
                    data.append('id', id);
                    data.append('amount', amount);
                    axios({
                            method: 'post',
                            data: data,
                            url: './components/pickCucumber.php',
                        })
                        .then(function(response) {
                            if (response.data.error) {
                                alert(response.data.error);
                            }
                            renderGarden();
                        });
                });
                document.querySelectorAll('#buttonPickAll')[i].addEventListener('click', () => {
                    const id = document.querySelectorAll('.pick')[i + 1].childNodes[3].innerText;
                    const amount = document.querySelectorAll('.pick')[i + 1].childNodes[5].innerText;
                    let data = new URLSearchParams();
                    data.append('id', id);
                    data.append('amount', amount);
                    axios({
                            method: 'post',
                            data: data,
                            url: './components/pickCucumber.php',
                        })
                        .then(function(response) {
                            if (response.data.error) {
                                alert(response.data.error);
                            }
                            renderGarden();
                        });
                });


            }
        })
}

renderGarden();

// add new one
document.querySelectorAll('.grow')[0].addEventListener('click', () => {
    axios({
            method: 'post',
            url: './components/growCucumber.php',
        })
        .then(function() {
            renderGarden();
        });
});

// grow all
document.querySelectorAll('.grow')[1].addEventListener('click', () => {
    const data = new FormData();
    const DOM = document.querySelectorAll('.growing');
    for (let i = 1; i < DOM.length; i++) {
        data.append(document.querySelectorAll('.growing')[i].childNodes[3].innerText, document.querySelectorAll('.growing')[i].childNodes[7].innerText);
    }
    axios({
            method: 'post',
            data: data,
            url: './components/growingCucumbers.php',
        })
        .then(function() {
            renderGarden();
        });
});