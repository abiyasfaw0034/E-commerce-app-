import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Applayout() {
  return (
    <>
      <div className="grid h-screen overflow-hidden  grid-rows-[auto,1fr]">
        <div>
          <NavBar />
        </div>

        <div className="overflow-scroll">
          <main className="mx-auto h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Applayout;
{
  /* <div className="">
      <NavBar />
      <Outlet />
    </div> */
}
