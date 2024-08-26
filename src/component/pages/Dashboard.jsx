const Dashboard = () => {
  return (
    <>
      {Array.from({ length: 500 }).map((_, index) => (
        
          <div key={index}>Dashboard</div>
        
      ))}
    </>
  );
};

export default Dashboard;

// import React, { useMemo, useState } from 'react';

// function ExpensiveCalculation({ num1, num2 }) {
//   // This function simulates an expensive calculation
//   const computeExpensiveValue = (a, b) => {
//     console.log('Computing expensive value...');
//     // Simulate a long computation
//     return a + b;
//   };

//   // Memoize the result of the expensive calculation
//   const expensiveValue = useMemo(() => computeExpensiveValue(num1, num2), [num1, num2]);

//   return (
//     <div>
//       <p>Number 1: {num1}</p>
//       <p>Number 2: {num2}</p>
//       <p>Expensive Value: {expensiveValue}</p>
//     </div>
//   );
// }

// function Dashboard() {
//   const [num1, setNum1] = useState(1);
//   const [num2, setNum2] = useState(2);

//   return (
//     <div>
//       <ExpensiveCalculation num1={num1} num2={num2} />
//       <button onClick={() => setNum1(num1 + 1)}>Increment Num1</button>
//       <button onClick={() => setNum2(num2 + 1)}>Increment Num2</button>
//     </div>
//   );
// }

// export default Dashboard;
