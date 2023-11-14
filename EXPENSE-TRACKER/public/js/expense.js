const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const rzpBtn = document.getElementById('rzpBtn');
const token = localStorage.getItem('token');
const pagination  = document.getElementById('pagination');

async function download(){
  
  try{
      const response = await axios.get('http://localhost:3000/user/download',  { headers: {"Authorization" : token} })
  
      if(response.status === 200){
        
          var a = document.createElement("a");
          a.href = response.data.fileUrl;
          a.download = 'myexpense.csv';
          a.click();
      } else {
          throw new Error(response.data.message)
      }

  }
  catch(err) {
      showError(err)
  }
}

expenseForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  try{
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseDescription = document.getElementById('expenseDescription').value;
    const expenseCategory = document.getElementById('expenseCategory').value;
    const expenseDate = document.getElementById('expenseDate').value;

    const obj = {
      expenseAmount,
      expenseDescription,
      expenseCategory,
      expenseDate
    }
    

    const result = await axios.post("http://localhost:3000/expense/add-data" , obj , {headers: {"Authorization" : token}})

      showItems(result.data.newData);
     
  }catch(err){
    console.log(err)
    document.body.innerHTML=document.body.innerHTML + "<h3>error occured</h3>"
  }

});

function premiumUser(){

    rzpBtn.style.display = 'none';
    const premiumUserText = document.createElement('p');
    const showLeaderboard = document.createElement('button');

    showLeaderboard.textContent = "Show Leaderboard"
    premiumUserText.textContent = 'You are a Premium User Now';

    showLeaderboard.addEventListener('click' , async () => {

      const result = await axios.get('http://localhost:3000/premium/showLeaderboard')
     
      displayLeaderboard(result.data.leaderBoardData);
    })

    premiumUserText.appendChild(showLeaderboard);
    document.body.appendChild(premiumUserText);

}

function displayLeaderboard(leaderBoardData) {
  const leaderboardContainer = document.getElementById('leaderboardContainer');
  
  if (!leaderboardContainer) {
    console.log('Leaderboard container not found');
    return;
  }

  leaderboardContainer.innerHTML = '';

  const leaderboardTitle = document.createElement('h2');
  leaderboardTitle.textContent = 'Leaderboard';
  leaderboardContainer.appendChild(leaderboardTitle);
 
  leaderBoardData.forEach((item) => {

    const entryDiv = document.createElement('div');

    const nameElement = document.createElement('p');
    nameElement.textContent = `Name: ${item.name}    Total Expense: ${item.totalExpense}`;
    entryDiv.appendChild(nameElement);

    leaderboardContainer.appendChild(entryDiv);
  });
}



function showItems(expense) {
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";
  document.getElementById("expenseCategory").value = "";
  document.getElementById("expenseDate").value = "";

  const expenseInfo = `${expense.expenseDate}-${expense.expenseAmount}-${expense.expenseDescription}-${expense.expenseCategory}`;
  const listItem = document.createElement('li');
  listItem.textContent = expenseInfo;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    
    axios.delete(`http://localhost:3000/expense/delete-data/${expense.id}` , {headers: {"Authorization" : token}} )
    .then(res=>{
      listItem.remove();
    }).catch(err=>console.log(err));
    
  });

  listItem.appendChild(deleteButton);
  
  expenseList.appendChild(listItem);
 
}

rzpBtn.addEventListener('click' , async (e) => {
  
   const token = localStorage.getItem('token');
   const response = await axios.get('http://localhost:3000/purchase/premiummembership', {headers: {"Authorization" : token}})
   console.log(response)
   var options = {
    "key": response.data.key_id,
    "order_id": response.data.order.id,
    "handler": async (response) => {
      
      const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus' , {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        }, {headers: {"Authorization" : token}})

        alert('You are a Premium User Now')
        localStorage.setItem('token' , res.data.token)
        premiumUser();

      
      
    }
   };

   const rzp1 = new Razorpay(options);
   rzp1.open();
   e.preventDefault();

   rzp1.on('payment.failed', function(response){
    alert('Something went wrong')
   }); 
})

function showError(err){
  document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

document.addEventListener("DOMContentLoaded", async ()=>{

  try{
    const decodesToken = parseJwt(token) ;
    const isPremiumUser = decodesToken.isPremiumUser;

    if(isPremiumUser){
      premiumUser();
    }

    const page = 1;

    const res = await axios.get(`http://localhost:3000/expense/get-data?page=${page}` , {headers: {"Authorization" : token}});
    listExpenses(res.data.items)
    showPagination(res.data.allData)

  }catch(err){
    console.log(err);
  }
})


function listExpenses(allData){
  allData.forEach((item) => {
    showItems(item);
  })
}

function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
  lastPage,
}){
  showPagination.innerHTML ='';
  if(hasPreviousPage){
    const btn2 = document.createElement('button')
    btn2.innerHTML = previousPage
    btn2.addEventListener('click' , ()=> getProducts(previousPage))
    showPagination.appendChild(btn2);
  }
  const btn1 = document.createElement('button')
  btn2.innerHTML =`<h3> ${currentPage}</h3>`
  btn2.addEventListener('click' , ()=> getProducts(currentPage))
  showPagination.appendChild(btn1);
  if(hasNextPage){
    const btn3 = document.createElement('button')
    btn3.innerHTML = nextPage
    btn3.addEventListener('click' , ()=> getProducts(nextPage))
    pagination.appendChild(btn3)
  };
}

async function getProducts(page){
  try{
    const res = await axios.get(`http://localhost:3000/expense/get-data?page=${page}` , {headers: {"Authorization" : token}});
    listExpenses(res.data.items)
    showPagination(res.data.allData)
  }catch(err){
    console.log(err);
  }
 
}

