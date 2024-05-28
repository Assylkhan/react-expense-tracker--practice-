import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: any;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("N/A");

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => selectedCategory === e.category)
    : expenses;

  return (
    <div className="App">
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([
              ...expenses,
              {
                ...expense,
                id: expenses.length + 1,
              },
            ])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        selectedCategory={selectedCategory}
        onClickDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
    </div>
  );
}

export default App;
