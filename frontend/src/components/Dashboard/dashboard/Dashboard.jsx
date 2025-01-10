import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalClasses: 0,
    classData: [],
    courseData: [],
  });

  // Fetch data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const teacherId = localStorage.getItem("id"); // Fetch teacher ID from localStorage
        const response = await axios.post("/api/admin/dashboardreq", {
          teacherId,
        });
        setDashboardData(response.data);

        // Fetch course data with the new API request
        const courseResponse = await axios.get(
          `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
            "id"
          )}`
        );
        const courseData = courseResponse.data;
        // console.log(courseData);
        // Map course data to include student count
        const updatedCourseData = courseData.map((course) => ({
          ...course,
          studentCount: course.students ? course.students.length : 0,
        }));

        setDashboardData((prevData) => ({
          ...prevData,
          courseData: updatedCourseData,
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Timeline chart data for student count
  const timelineData = {
    labels: dashboardData.classData.map((cls) =>
      new Date(cls.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Students",
        data: dashboardData.classData.map(() => dashboardData.totalStudents),
        borderColor: "#f9c365",
        backgroundColor: "rgba(249, 195, 101, 0.2)",
        pointBackgroundColor: "#f9c365",
        tension: 0.4,
      },
    ],
  };

  // Bar chart data for courses by students count
  const courseStudentData = {
    labels: dashboardData.courseData.map((course) => course.title),
    datasets: [
      {
        label: "Students per Course",
        data: dashboardData.courseData.map((course) => course.studentCount),
        backgroundColor: "#f9c365",
        hoverBackgroundColor: "#f6a13c",
        borderRadius: 8,
      },
    ],
  };

  // Doughnut chart data for stats
  const stats = [
    {
      label: "Total Students",
      value: dashboardData.totalStudents,
      target: 100,
    },
    { label: "Total Courses", value: dashboardData.totalCourses, target: 20 },
    {
      label: "Total Scheduled Classes",
      value: dashboardData.totalClasses,
      target: 10,
    },
  ];

  const colors = ["#fdecc6", "#f9c365", "#ff9b6b"];

  return (
    <div className="dashboard-container">
      <div className="bento-grid">
        {/* Timeline Chart: Student Count */}
        {/* <div className="chart-box animated-pop">
          <h4>Timeline Chart: Student Count</h4>
          <Line
            data={timelineData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  onClick: null, // Disable legend click
                },
              },
              scales: {
                x: { title: { display: true, text: "Month" } },
                y: { title: { display: true, text: "Number of Students" } },
              },
            }}
          />
        </div> */}

        {/* Bar Chart: Students per Course */}
        <div className="chart-box animated-pop">
          <h4>Students per Course</h4>
          <Bar
            data={courseStudentData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  onClick: null, // Disable legend click
                },
              },
              scales: {
                x: { title: { display: true, text: "Courses" } },
                y: { title: { display: true, text: "Number of Students" } },
              },
            }}
          />
        </div>

        {/* Doughnut Charts for Stats */}
        {stats.map((stat, index) => {
          const percentage = ((stat.value / stat.target) * 100).toFixed(1);

          const doughnutData = {
            labels: ["Achieved", "Remaining"],
            datasets: [
              {
                data: [stat.value, stat.target - stat.value],
                backgroundColor: [colors[index % colors.length], "#e0e0e0"],
                hoverBackgroundColor: [
                  colors[index % colors.length],
                  "#d6d6d6",
                ],
              },
            ],
          };

          return (
            <div key={index} className="doughnut-chart-box animated-pop">
              <h4>{stat.label}</h4>
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      onClick: null, // Disable legend click
                    },
                  },
                }}
              />
              <p className="doughnut-value">
                {stat.value.toLocaleString()} / {stat.target.toLocaleString()} (
                {percentage}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./dashboard.css";
// import { Line, Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register necessary Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalStudents: 0,
//     totalCourses: 0,
//     totalClasses: 0,
//     classData: [],
//     courseData: [],
//   });

//   // Fetch data when component mounts
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const teacherId = localStorage.getItem("id"); // Fetch teacher ID from localStorage
//         const response = await axios.post("/api/admin/dashboardreq", {
//           teacherId,
//         });
//         setDashboardData(response.data);

//         // Fetch course data with the new API request
//         const courseResponse = await axios.get(
//           `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
//             "id"
//           )}`
//         );
//         const courseData = courseResponse.data;
//         setDashboardData((prevData) => ({
//           ...prevData,
//           courseData,
//         }));
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Timeline chart data for student count
//   const timelineData = {
//     labels: dashboardData.classData.map((cls) =>
//       new Date(cls.date).toLocaleDateString()
//     ),
//     datasets: [
//       {
//         label: "Students",
//         data: dashboardData.classData.map(() => dashboardData.totalStudents),
//         borderColor: "#f9c365",
//         backgroundColor: "rgba(249, 195, 101, 0.2)",
//         pointBackgroundColor: "#f9c365",
//         tension: 0.4,
//       },
//     ],
//   };

//   // Bar chart data for courses by students count
//   const courseStudentData = {
//     labels: dashboardData.courseData.map((course) => course.name),
//     datasets: [
//       {
//         label: "Students per Course",
//         data: dashboardData.courseData.map((course) => course.studentCount),
//         backgroundColor: "#f9c365",
//         hoverBackgroundColor: "#f6a13c",
//         borderRadius: 8,
//       },
//     ],
//   };

//   // Doughnut chart data for stats
//   const stats = [
//     {
//       label: "Total Students",
//       value: dashboardData.totalStudents,
//       target: 10000,
//     },
//     { label: "Total Courses", value: dashboardData.totalCourses, target: 50 },
//     {
//       label: "Total Scheduled Classes",
//       value: dashboardData.totalClasses,
//       target: 500,
//     },
//   ];

//   const colors = ["#fdecc6", "#f9c365", "#ff9b6b"];

//   return (
//     <div className="dashboard-container">
//       <div className="bento-grid">
//         {/* Timeline Chart: Student Count */}
//         <div className="chart-box animated-pop">
//           <h4>Timeline Chart: Student Count</h4>
//           <Line
//             data={timelineData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: {
//                   onClick: null, // Disable legend click
//                 },
//               },
//               scales: {
//                 x: { title: { display: true, text: "Month" } },
//                 y: { title: { display: true, text: "Number of Students" } },
//               },
//             }}
//           />
//         </div>

//         {/* Bar Chart: Students per Course */}
//         <div className="chart-box animated-pop">
//           <h4>Bar Chart: Students per Course</h4>
//           <Bar
//             data={courseStudentData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: {
//                   onClick: null, // Disable legend click
//                 },
//               },
//               scales: {
//                 x: { title: { display: true, text: "Courses" } },
//                 y: { title: { display: true, text: "Number of Students" } },
//               },
//             }}
//           />
//         </div>

//         {/* Doughnut Charts for Stats */}
//         {stats.map((stat, index) => {
//           const percentage = ((stat.value / stat.target) * 100).toFixed(1);

//           const doughnutData = {
//             labels: ["Achieved", "Remaining"],
//             datasets: [
//               {
//                 data: [stat.value, stat.target - stat.value],
//                 backgroundColor: [colors[index % colors.length], "#e0e0e0"],
//                 hoverBackgroundColor: [
//                   colors[index % colors.length],
//                   "#d6d6d6",
//                 ],
//               },
//             ],
//           };

//           return (
//             <div key={index} className="doughnut-chart-box animated-pop">
//               <h4>{stat.label}</h4>
//               <Doughnut
//                 data={doughnutData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: {
//                       onClick: null, // Disable legend click
//                     },
//                   },
//                 }}
//               />
//               <p className="doughnut-value">
//                 {stat.value.toLocaleString()} / {stat.target.toLocaleString()} (
//                 {percentage}%)
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
