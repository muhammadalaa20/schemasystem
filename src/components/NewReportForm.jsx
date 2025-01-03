"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const NewReportForm = ({ isVisible, setIsVisible }) => {
  const [newReport, setNewReport] = useState({
    date: "",
    shift: "",
    tasks: [{ category: "", actionTaken: "", result: "" }],
  });

  const handleAddTask = () => {
    setNewReport({
      ...newReport,
      tasks: [
        ...newReport.tasks,
        { category: "", actionTaken: "", result: "" },
      ],
    });
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = newReport.tasks.map((task, idx) =>
      idx === index ? { ...task, [field]: value } : task
    );
    setNewReport({ ...newReport, tasks: updatedTasks });
  };

  const handleSaveReport = async () => {
    const { date, shift, tasks } = newReport;

    // Check the data being sent to the backend
    console.log("Data being sent:", { reportDate: date, shift, tasks });

    const response = await fetch("http://localhost:3000/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportDate: date, shift, tasks }),
    });

    if (response.ok) {
      alert("Report saved successfully!");
      setIsVisible(false); // Hide the form after successful submission
      window.location.reload();
    } else {
      alert("There was an error saving the report.");
    }
  };

  return (
    <div
      id="newReportForm"
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Report</h2>
          <FaTimes
            className="text-red-600 cursor-pointer text-2xl"
            onClick={() => setIsVisible(false)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={newReport.date}
            onChange={(e) =>
              setNewReport({ ...newReport, date: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Shift</label>
          <select
            value={newReport.shift}
            onChange={(e) =>
              setNewReport({ ...newReport, shift: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select shift</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div className="mb-4 max-h-64 overflow-y-auto">
          <div className="space-y-4">
            {newReport.tasks.map((task, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <select
                  name="category"
                  value={task.category}
                  onChange={(e) =>
                    handleTaskChange(index, "category", e.target.value)
                  }
                  className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Category</option>
                  <option value="PC">PC</option>
                  <option value="Printer">Printer</option>
                  <option value="VM3">VM3</option>
                  <option value="PDA">PDA</option>
                  <option value="RDT">RDT</option>
                  <option value="Network">Network</option>
                  <option value="OCR">OCR</option>
                  <option value="ERP">ERP</option>
                  <option value="CATOS">CATOS</option>
                  <option value="EDI">EDI</option>
                </select>
                <input
                  type="text"
                  placeholder="Task"
                  value={task.actionTaken}
                  onChange={(e) =>
                    handleTaskChange(index, "actionTaken", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Result"
                  value={task.result}
                  onChange={(e) =>
                    handleTaskChange(index, "result", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
          <button
            onClick={handleSaveReport}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Save Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewReportForm;
