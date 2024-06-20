import { Outlet } from "react-router-dom";

function container() {
  return (
    <div style={{ padding: '10px',width:'100%'}}>
    <Outlet/>
    </div>
  )
}

export default container;