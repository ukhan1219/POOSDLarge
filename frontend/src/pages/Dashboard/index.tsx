import NavBar from "../../components/NavBar";
import Content from "../../components/Content";
import { useAuth } from "../../authentication";

import "./dashboard.css";

function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <div className="flexbox-container">
        <NavBar user={user}/>
        <Content user={user} />
      </div>
    </>
  );
}

export default Dashboard;
