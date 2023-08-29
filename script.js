const loadPhone = async (sarchdata, seeall) => {
    const reset = await fetch(`https://openapi.programming-hero.com/api/phones?search=${sarchdata}`);
    const PhoneDataObject = await reset.json();
    const PhoneData = PhoneDataObject.data;
    // console.log(PhoneData);
    loadSingleData(PhoneData, seeall)
}

function  loadSingleData(data, seeall){
//   console.log(data);

  if (data.length > 10) {
   let visiable = document.getElementById('show-all-button');
   visiable.classList.remove('hidden')
  } else {
   let hide =  document.getElementById('show-all-button');
   hide.classList.add('hidden')
  }
  
    let allPhoneContainer = document.getElementById('Phone-display-container');
    let  allDatas = data;
    let allData_2 = null;
    
    if (seeall === true) {
      allData_2 = allDatas;
    }else{
      allData_2 = allDatas.slice(0,10);
    }
    
    allData_2.forEach(data => {
        // console.log(data);
        let productDiv = document.createElement('div');
        productDiv.classList.add('card', 'bg-base-100', 'shadow-xl')
        productDiv.innerHTML = `
        <figure class="px-10 pt-10">
                  <img src="${data.image}" />
        </figure>
                <div class="card-body items-center text-center">
                  <p class="text-2xl font-semibold">${data.brand}</p>
                  <h2 class="card-title">${data.phone_name}</h2>
                  <label for="my_modal_7"  onclick="detailsFuntion('${data.slug}')" class="btn">see details</label>
        `;
//  let modalDetails = document.getElementById('modal-details-container');
//          modalDetails.innerHTML = `
//         <img src="${details.data.image}" alt="">
//         <h2 class="text-2xl font-semibold">Iphone 13 Pro Max</h2>
//         <p class="text-lg my-2 text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Storage :</span> 128GB/256GB/1TB Storage, No card slot</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Display Size :</span> 6.7 Inches, 109.8 cm</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Chipset :</span>  Apple A15 Bionic</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Memory : </span>128GB 6 GB RAM, 256GB RAM, 512GB RAM1 1TB 6GB RAM</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Memory : </span>128GB 6 GB RAM, 256GB RAM, 512GB RAM1 1TB 6GB RAM</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Slug : </span> Applice_Iphone_13_Pro_Max</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Release data : </span>  Released 2021, September 24</p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Brand :</span>  Apple </p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Brand :</span>  Apple </p>
//         <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">GPS :</span> AYes, with A-GPS, GLONASS, GALILEO, BDS, QZSS </p>
//         `;

        
        allPhoneContainer.appendChild(productDiv)
        // console.log(data);
    });
}


loadPhone("samsung");
function sarch(seeall){
    let allPhoneContainer = document.getElementById('Phone-display-container');
    allPhoneContainer.innerText = '';
    let sarchInput = document.getElementById('sarch-input').value;
    let bb = sarchInput ?  sarchInput : 'samsung';
    loadPhone(bb, seeall)
}
function seeAll(){
  sarch(true)
}

function detailsFuntion(id) {
    // console.log(id);
    loadDetails(id)
    function loadDetails(model) {      
          fetch(` https://openapi.programming-hero.com/api/phone/${model}`)
          .then(res => res.json())
          .then(detailsData => setData(detailsData))
    }
    function setData(details) {
        let modalDetails = document.getElementById('modal-details-container');
         modalDetails.innerHTML = `
        <img class="blok mx-auto mb-3" src="${details.data?.image}" alt="">
        <h2 class="text-2xl font-semibold">${details.data?.name || 'detail not found'}</h2>
        <p class="text-lg my-2 text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Storage :</span> ${details.data?.mainFeatures?.storage || 'detail not found'}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Display Size :</span> ${details.data?.mainFeatures?.displaySize || 'detail not found'}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Chipset :</span> ${details.data?.mainFeatures?.chipSet || 'detail not found'}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Memory : </span>${details.data?.mainFeatures?.memory || 'detail not found'}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Slug : </span> ${details.data?.slug  || 'detail not found'}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Release data : </span> ${details.data?.releaseDate || 'detail not found'}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">Brand :</span> ${details.data?.brand || 'detail not found'} </p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold">GPS :</span>${details.data?.others?.GPS || 'detail not found'} </p>
        `;
 console.log(details.data);
    }
}
