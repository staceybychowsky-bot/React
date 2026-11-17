import Header from "./components/Header";
import StudentDashboard from "./components/StudentDashboard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <StudentDashboard />
      </main>
      <Footer />
    </>
  );
}

export default App;

