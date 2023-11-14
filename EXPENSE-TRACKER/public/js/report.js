function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
  }

  function updateCurrentDateTime() {
    const currentDateTimeElement = document.getElementById('currentDateTime');
    currentDateTimeElement.textContent = getCurrentDateTime();
  }

  function updateCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = `Year: ${currentYear}`;
  }

  async function fetchMonthlyExpenseData() {
    try {
      const response = await axios.get('https://localhost:3000/report/monthly-expense');
      const monthlyExpenseTable = document.getElementById('monthlyExpenseTable').getElementsByTagName('tbody')[0];
      const totalMonthlyExpenseElement = document.getElementById('totalMonthlyExpense');


      monthlyExpenseTable.innerHTML = '';

      response.data.forEach(expense => {
        const row = monthlyExpenseTable.insertRow();
        row.insertCell(0).textContent = expense.date;
        row.insertCell(1).textContent = expense.description;
        row.insertCell(2).textContent = expense.category;
        row.insertCell(3).textContent = expense.expense;
      });

      const totalExpense = response.data.reduce((total, expense) => total + expense.expense, 0);
      totalMonthlyExpenseElement.textContent = totalExpense.toFixed(2);
    } catch (error) {
      console.error('Error fetching monthly expense data:', error);
    }
  }

  async function fetchYearlyReportData() {
    try {
      const response = await axios.get('https://localhost:3000/report/yearly-expense');
      const yearlyReportTable = document.getElementById('yearlyReportTable').getElementsByTagName('tbody')[0];

      yearlyReportTable.innerHTML = '';

      response.data.forEach(yearlyExpense => {
        const row = yearlyReportTable.insertRow();
        row.insertCell(0).textContent = yearlyExpense.year;
        row.insertCell(1).textContent = yearlyExpense.totalExpense;
      });
    } catch (error) {
      console.error('Error fetching yearly report data:', error);
    }
  }

  window.onload = function() {
    updateCurrentDateTime();
    updateCurrentYear();
    fetchMonthlyExpenseData();
    fetchYearlyReportData();
  };