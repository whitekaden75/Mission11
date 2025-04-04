import { useEffect, useState } from "react";

function Bookfilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://mission13-white-backend-frb5d8aha7c5eabp.eastus-01.azurewebsites.net/api/books/getbooktypes"
        );
        const data = await response.json();
        setCategories(data);
      } catch {
        console.error("Error Fetching Categories");
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <div
      className="container d-flex flex-column bg-light p-3"
      style={{ width: "250px", height: "100vh" }}>
      <h5 className="mb-3">Book Types</h5>
      <div className="d-flex flex-column justify-content-between flex-grow-1 text-start">
        {categories.map((c) => (
          <div key={c} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={c}
              value={c}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={c}>
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookfilter;
