import { Route, Switch, Redirect } from "react-router-dom";
import Counter from "./pages/Counter.jsx";
import Addmeal from "./pages/Addmeal.jsx";
import Navbar from "./components/Header/Navbar.jsx";
import Feature from "./components/Header/Featurebar.jsx";
import Report from "./pages/Report.jsx";
import Recipe from "./pages/Recipe.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Feature />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/counter" />
        </Route>
        <Route path="/counter" exact>
          <Counter />;
        </Route>
        <Route path="/addmeal/:mealTime">
          <Addmeal />
        </Route>
        <Route path="/report">
          <Report />
        </Route>
        <Route path="/recipe">
          <Recipe />
        </Route>
      </Switch>
    </>
  );
}

export default App;
