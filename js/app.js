const invalidResult=document.getElementById('no-response');
const resultNum=document.getElementById('result-no')
const getInput=()=>{
    const inputField=document.getElementById('input-field');
    const inputValue=inputField.value;
    inputField.value='';
    loadData(inputValue);
}

const loadData=(searchText)=>{
   
    const url=`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res=>res.json())
    .then(value=> showData(value));
}


const showData=(details)=>{

    const contentArea=document.getElementById('content-area');

    contentArea.textContent='';

    if(details.docs.slice(0,30)[0]=== null){
         invalidResult.innerHTML=`<p>Nothing Found</p>`;
         resultNum.innerHTML='';
    }else{
       invalidResult.innerText='';
       resultNum.innerHTML=`<p>${details.numFound} results found</p>`
       details.docs.slice(0,30).forEach(element => {
        // console.log(element);
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
          <img src='https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg' <br>
          <div id='desc'>
          <p>Book Name: ${element.title}</p>
          <p>author: ${element.author_name?.slice(0,1)}</p>
          <p>Publish Date: ${element.publish_year}</p>
          <p>Publisher: ${element.publisher?.slice(0,1)}</p>
          </div>
        `
        contentArea.appendChild(div);
      
    })}
}

