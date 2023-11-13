const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const rzpBtn = document.getElementById('rzpBtn');

premiumUser();

expenseForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  try{
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseDescription = document.getElementById('expenseDescription').value;
    const expenseCategory = document.getElementById('expenseCategory').value;
    const obj = {
      expenseAmount,
      expenseDescription,
      expenseCategory
    }
    
    const token = localStorage.getItem('token');
    const result = await axios.post("http://localhost:3000/expense/add-data" , obj , {headers: {"Authorization" : token}})

      showItems(result.data.newData);
     
  }catch(err){
    console.log(err)
    document.body.innerHTML=document.body.innerHTML + "<h3>error occured</h3>"
  }

});

function premiumUser(){
  const isPremiumUser = localStorage.getItem('isPremiumUser');
  if(isPremiumUser){
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
}

function displayLeaderboard(leaderBoardData) {
  const leaderboardContainer = document.getElementById('leaderboardContainer');
  
  if (!leaderboardContainer) {
    console.error('Leaderboard container not found');
    return;
  }

  leaderboardContainer.innerHTML = '';

  const leaderboardTitle = document.createElement('h2');
  leaderboardTitle.textContent = 'Leaderboard';
  leaderboardContainer.appendChild(leaderboardTitle);

  leaderBoardData.forEach((item) => {

    const entryDiv = document.createElement('div');

    const nameElement = document.createElement('p');
    nameElement.textContent = `Name: ${item.name}`;
    entryDiv.appendChild(nameElement);

    const expenseElement = document.createElement('p');
    expenseElement.textContent = `Total Expense: ${item.total_cost}`;
    entryDiv.appendChild(expenseElement);

    leaderboardContainer.appendChild(entryDiv);
  });
}



function showItems(expense) {
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";
  document.getElementById("expenseCategory").value = "";

  const expenseInfo = `${expense.expenseAmount}-${expense.expenseDescription}-${expense.expenseCategory}`;
  const listItem = document.createElement('li');
  listItem.textContent = expenseInfo;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/expense/delete-data/${expense.id}` , {headers: {"Authorization" : token}} )
    .then(res=>{
      listItem.remove();
    }).catch(err=>console.log(err));
    
  });

  listItem.appendChild(deleteButton);
  
  expenseList.appendChild(listItem);
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseDescription').value = '';
  document.getElementById('expenseCategory').value = '';
}

rzpBtn.addEventListener('click' , async () => {
   const token = localStorage.getItem('token');
   const response = await axios.get('http://localhost:3000/purchase/premiummembership', {headers: {"Authorization" : token}})
    
   var options = {
    "key": response.data.key_id,
    "order_id": response.data.order.id,
    "handler": async (response) => {
      try{
        await axios.post('http://localhost:3000/purchase/updatetransactionstatus' , {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        }, {headers: {"Authorization" : token}})

        alert('You are a Premium User Now')
        localStorage.setItem('isPremiumUser' , true);
        premiumUser();

      }catch(err){
        alert('Transaction failed');
      }
      
    }
   };

   const rzp1 = new Razorpay(options);
   rzp1.open();
   e.preventDefault();

   rzp1.on('payment.failed', function(response){
    alert('Something went wrong')
   }); 
})




document.addEventListener("DOMContentLoaded", async ()=>{
  try{
    const token = localStorage.getItem('token');
    const result = await axios.get("http://localhost:3000/expense/get-data", {headers: {"Authorization" : token}});
    for(let i=0; i< result.data.allData.length ;i++){
      showItems(result.data.allData[i]);
    }
  }catch(err){
    console.log(err);
  }
})


