const loadPhone = async (sarchdata) => {
    const reset = await fetch(`https://openapi.programming-hero.com/api/phones?search=${sarchdata}`);
    const PhoneDataObject = await reset.json();
    const PhoneData = PhoneDataObject.data;
    // console.log(PhoneData);
    loadSingleData(PhoneData)
}

function  loadSingleData(data){
    let allPhoneContainer = document.getElementById('Phone-display-container');
    let  allDatas2 = data
    allDatas2.forEach(data => {
        let productDiv = document.createElement('div');
        productDiv.classList.add('card', 'bg-base-100', 'shadow-xl')
        productDiv.innerHTML = `
        <figure class="px-10 pt-10">
                  <img src="${data.image}" />
        </figure>
                <div class="card-body items-center text-center">
                  <p class="text-2xl font-semibold">${data.brand}</p>
                  <h2 class="card-title">${data.phone_name}</h2>
                  <label for="my_modal_6" class="btn">open modal</label>
                  </div>
                </div>
        `;
        allPhoneContainer.appendChild(productDiv)
        // console.log(data);
    });
}


loadPhone("samsung");
function sarch(){
    let allPhoneContainer = document.getElementById('Phone-display-container');
    allPhoneContainer.innerText = '';
    let sarchInput = document.getElementById('sarch-input').value;
    loadPhone(sarchInput)
}
