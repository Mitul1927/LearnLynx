import Filter from "./filter/Filter";
import Courses from "./courses/Courses";

const App = () => {
  return (
    <>
      <div className="app-container">
        {/* <Navbar /> */}
        <div className="grey-div">
          <header className="head">
            <h1>
              <span className="header-span">Courses</span>
              we offer
            </h1>
          </header>
        </div>
        <div className="flex main-content">
          <aside className="filters-container">
            <Filter />
          </aside>
          <main className="courses-container">
            <Courses />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
