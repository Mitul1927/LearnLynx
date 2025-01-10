import Layout from "./layout.jsx";
import Landingpage from "./components/LandingPage/Landingpage.jsx";
import Login from "./components/Login-Signup/Login.jsx";
import Courses from "./components/AllCourses/AllCourses.jsx";
import ViewCourse from "./components/view-course/ViewCourse.jsx";
import Mylearning from "./components/Mylearning/Mylearning.jsx";
import PlanPricing from "./components/Plans/PlansPricing.jsx";
import Dashboard_full from "./components/Dashboard/Dashboard_full.jsx";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  useNavigation,
} from "react-router-dom";
import Success from "./components/Login-Signup/success.jsx";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard.jsx";
import Blog from "./components/Blog/Blog.jsx";

// Themed Loader Component
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="themed-loader"></div>
    </div>
  );
};

// Layout with Loader Integration
const LayoutWithLoader = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <Loader />}
      <Layout />
    </>
  );
};

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         <Route path="/" element={<Layout />}>
//           <Route path="/" element={<Landingpage />} />
//           <Route path="/all-courses" element={<Courses />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/googlesuccess" element={<Success />} />
//           <Route path="/signup" element={<Login />} />
//           <Route path="/Course/:id" element={<ViewCourse />} />
//           <Route path="/my-learnings" element={<Mylearning />} />
//           <Route path="/plans" element={<PlanPricing />} />
//           <Route path="/start/:id" element={<StudentDashboard />} />
//         </Route>

//         {Dashboard_full()}
//       </>
//     )
//   );

//   return <RouterProvider router={router} />;
// }

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LayoutWithLoader />}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/all-courses" element={<Courses />} />
          <Route path="/about" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/googlesuccess" element={<Success />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/Course/:id" element={<ViewCourse />} />
          <Route path="/my-learnings" element={<Mylearning />} />
          <Route path="/plans" element={<PlanPricing />} />
          <Route path="/start/:id" element={<StudentDashboard />} />
        </Route>

        {Dashboard_full()}
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
