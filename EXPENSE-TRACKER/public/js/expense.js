const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

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
    const result = await axios.post("http://localhost:3000/expense/add-data" ,obj , {headers: {"Authorization" : token}})
    
      console.log(res);
      showItems(result.data.newData);
     
  }catch(err){
    console.log(err)
    document.body.innerHTML=document.body.innerHTML + "<h3>error occured</h3>"
  }

});

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
  listItem.appendChild(editButton);
  expenseList.appendChild(listItem);
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseDescription').value = '';
  document.getElementById('expenseCategory').value = '';
}

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


