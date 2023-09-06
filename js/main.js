let elList = document.querySelector(".js-list")
let elInput = document.querySelector(".js-search")
let elForm = document.querySelector(".js-form")
let elSelect = document.querySelector(".js-select")
let elSort = document.querySelector(".js-selectSort")

// let allProducts = [];

function renderDom(array,node){
    node.innerHTML = '';

    for(i of array){
        // console.log(i);
        let Item = document.createElement('li');
        let Image = document.createElement('img');
        let Title = document.createElement('h3');
        let Text = document.createElement('p');

        Title.textContent = i.title
        Text.textContent = i.description
        Image.src = i.images[0]

        Image.style.width = '100%';
        Image.style.height = '300px';
        Item.style.width = '400px';
        Item.style.height = '500px';

        Item.append(Image)
        Item.append(Title)
        Item.append(Text)

        Item.classList.add('list-group-item')
  
        node.appendChild(Item);
    }
}

// SEARCH PRODUCT
function searchProduct(array,node){
    let searchResult = [];
    elForm.addEventListener('input',(evt) =>{
        node.innerHTML = '';

        let elInputValue = elInput.value.toLocaleLowerCase();
        // console.log(elInputValue);
         array.forEach( el => {
        // console.log(el);
        if(el.title.toLocaleLowerCase().includes(elInputValue)){
            searchResult.push(el);
          }
        });
        renderDom(searchResult,elList);
        searchResult = [];
    })
}
// ------
// sellect product

function sellect(array,node){
    let newArray = []

    elSelect.addEventListener('change',() =>{
        newArray = []
        
        if(elSelect.value != "ALL"){
            array.forEach((item) =>{
                // console.log(item);
                if(item.category.includes(elSelect.value)){
                    newArray.push(item)
                }
            });
            renderDom(newArray,node)
        }


    })

    let Array =[];
    array.forEach((pro)=>{
		Array.push(pro.category)
    });

    let setArray = new Set(Array);

    setArray.forEach((el) => {


	let eloption = document.createElement('option');
	 
	  eloption.setAttribute("value", el);
	  eloption.textContent = el
	  elSelect.appendChild(eloption)
    })

}

// ------
// SORT Product
function sort(array,node){

elSort.addEventListener('change', () => {

    if(elSort.value == "Sort"){
      window.location.reload();
    }
  
    if(elSort.value == "A-Z"){
        node.innerHTML = "";
    
      let productSort = array.sort((a,b) =>{
        // console.log(array);
        if(a.name > b.name){
          return 1;
        }
        if(a.name < b.name){
          return -1;
        }
        return 0;
      });
      renderDom(productSort,node);
    }
  
    if(elSort.value == "Z-A"){
        node.innerHTML = "";
      let productSort = array.sort((a,b) =>{
        if(a.name > b.name){
          return -1;
        }
        if(a.name < b.name){
          return 1;
        }
        return 0;
      });
      renderDom(productSort,node);
    }
    console.log(elSort.value);
  })

}
// ------
// FETCH ALL PRODUCTS
let product;

async function getProducts(){
    
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    renderDom(data.products,elList);
    product = data.products;
    searchProduct(product,elList);
    sellect(product,elList);
    sort(product,elList);
    // console.log(product);
}
// ------
getProducts()

