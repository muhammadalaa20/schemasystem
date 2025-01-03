"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegSquarePlus } from "react-icons/fa6";
import NewReportForm from "../../components/NewReportForm";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [groupedReports, setGroupedReports] = useState({}); // Grouped by month and year
  const [selectedDay, setSelectedDay] = useState(null); // Selected day
  const [selectedShift, setSelectedShift] = useState(null); // Selected shift
  const [tasks, setTasks] = useState([]); // Tasks for the selected shift
  const [showModal, setShowModal] = useState(false); // To toggle the modal visibility
  const [newReport, setNewReport] = useState({
    day: "",
    shift: "",
    category: "",
    task: "",
  });

  // Fetch and group reports by month and year
  useEffect(() => {
    fetch("http://localhost:3000/api/reports")
      .then((res) => res.json())
      .then((data) => {
        const fixedDates = data.map((report) => ({
          ...report,
          report_date: new Date(Date.parse(report.report_date)), // Normalize the date parsing
        }));

        const groupedByMonth = fixedDates.reduce((acc, report) => {
          const monthYear = `${report.report_date.toLocaleString("default", {
            month: "long",
          })} - ${report.report_date.getFullYear()}`;
          acc[monthYear] = acc[monthYear] || [];
          acc[monthYear].push(report);
          return acc;
        }, {});

        // Sort months in descending order
        const sortedGroupedReports = Object.fromEntries(
          Object.entries(groupedByMonth).sort(
            ([a], [b]) => new Date(b) - new Date(a)
          )
        );

        setGroupedReports(sortedGroupedReports);
      })
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  // Fetch tasks for a specific shift on a specific day
  const fetchTasks = async (day, shift) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reports/${day}/${shift}`
      );
      const taskData = await response.json();
      setTasks(taskData);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Handle day bar click
  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day); // Toggle the selected day
    setSelectedShift(null); // Reset selected shift
    setTasks([]); // Clear tasks
  };

  // Handle shift click
  const handleShiftClick = (shift, day) => {
    setSelectedShift(selectedShift === shift ? null : shift); // Toggle the selected shift
    if (selectedShift !== shift) {
      fetchTasks(day, shift);
    } else {
      setTasks([]); // Clear tasks when toggled off
    }
  };

  const getShiftColor = (shift) => {
    const colors = {
      Morning: "bg-red-400",
      Evening: "bg-blue-300",
      Night: "bg-yellow-400",
    };
    return colors[shift] || "bg-gray-200";
  };

  // Handle new report modal form submission
  const handleReportSubmit = () => {
    console.log("New Report:", newReport);
    setShowModal(false);
    // You can handle the API call here to add the report to the database
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-blue-500 text-white p-4  flex justify-between items-center">
        <h1 className="text-xl font-bold">Daily Reports</h1>
        {/* Add new Report form pop-up button */}
        <FaRegSquarePlus
          className="w-10 h-10 cursor-pointer text-white hover:scale-105"
          onClick={() => setIsVisible(true)}
        />
      </nav>

      <NewReportForm isVisible={isVisible} setIsVisible={setIsVisible} />

      {/* Modal to Add New Report */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Report</h2>
            <div>
              <label className="block mb-2">Day</label>
              <input
                type="date"
                value={newReport.day}
                onChange={(e) =>
                  setNewReport({ ...newReport, day: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Shift</label>
              <select
                value={newReport.shift}
                onChange={(e) =>
                  setNewReport({ ...newReport, shift: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
              <label className="block mb-2">Category</label>
              <input
                type="text"
                value={newReport.category}
                onChange={(e) =>
                  setNewReport({ ...newReport, category: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Task</label>
              <textarea
                value={newReport.task}
                onChange={(e) =>
                  setNewReport({ ...newReport, task: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleReportSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grouped Reports by Month */}
      {Object.entries(groupedReports).map(([monthYear, reports]) => (
        <div key={monthYear} className="mt-4">
          {/* Month Title */}
          <h2 className="text-2xl font-bold mb-4">{monthYear}</h2>

          {/* Day Bars */}
          {Object.entries(
            reports.reduce((acc, report) => {
              const date = report.report_date.toISOString().split("T")[0];
              acc[date] = acc[date] || [];
              acc[date].push(report);
              return acc;
            }, {})
          ).map(([day, dayReports]) => (
            <div key={day} className="bg-white shadow rounded mb-2">
              {/* Day Bar */}
              <motion.div
                className={`p-4 cursor-pointer ${
                  selectedDay === day ? "bg-blue-200" : "bg-blue-500 text-white"
                }`}
                whileHover={{ backgroundColor: "blue" }}
                onClick={() => handleDayClick(day)}
              >
                <h3 className="text-lg font-bold">{day}</h3>
              </motion.div>

              {/* Shifts */}
              {selectedDay === day && (
                <div className="flex space-x-4 p-4">
                  {["Morning", "Evening", "Night"].map((shift) => (
                    <motion.div
                      key={shift}
                      className={`p-4 rounded cursor-pointer ${getShiftColor(
                        shift
                      )} ${
                        selectedShift === shift ? "border-2 border-black" : ""
                      }`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleShiftClick(shift, day)}
                    >
                      <h4 className="font-bold">{shift} Shift</h4>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tasks */}
              {selectedShift && selectedDay === day && (
                <div className="mt-4 bg-gray-50 p-4 rounded shadow">
                  {tasks.length > 0 ? (
                    Object.entries(
                      tasks.reduce((acc, task) => {
                        acc[task.category] = acc[task.category] || [];
                        acc[task.category].push(task);
                        return acc;
                      }, {})
                    ).map(([category, categoryTasks]) => (
                      <div key={category} className="mb-4">
                        <h5 className="font-bold mb-2">{category}</h5>
                        <table className="table-auto w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border px-4 py-2 w-1/2">
                                Action Taken
                              </th>
                              <th className="border px-4 py-2 w-1/2">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryTasks.map((task) => (
                              <tr key={task.id}>
                                <td className="border px-4 py-2 w-1/2 text-center">
                                  {task.action_taken}
                                </td>
                                <td className="border px-4 py-2 w-1/2 text-center">
                                  {task.result}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))
                  ) : (
                    <p>No tasks available for this shift.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
