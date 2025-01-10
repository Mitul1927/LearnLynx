import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Chat from "./dash_chat/Dash_chat.jsx";
import Liveclass from "./dash_live_class/Dash_live.jsx";

import Mycourses from "./dash_myCourses/Dash_Courses.jsx";

import Schedule from "./dash_schedule/Dash_schedule.jsx";
import Students from "./dash_students/Dash_students.jsx";
import Dash_Notify from "./Dash_notify/Dash_Notify.jsx"
function Dashboard_full() {

  return (
    <Route>
      <Route path={`/admin/:id`} element={<Layout />}>
        <Route path={`/admin/:id/chat`} element={<Chat />} />
        <Route path={`/admin/:id/liveclass`} element={<Liveclass />} />
        <Route path={`/admin/:id/notify`} element={<Dash_Notify />} />
        <Route path={`/admin/:id/mycourses`} element={<Mycourses />} />
        <Route path={`/admin/:id/schedule`} element={<Schedule />} />
        <Route path={`/admin/:id/students`} element={<Students />} />
        <Route path={`/admin/:id/dashboard`} element={<Dashboard />} />
      </Route>
    </Route>
  );
}

export default Dashboard_full;
