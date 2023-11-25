import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Events = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <h2>Events</h2>
        <PrimaryButton
          onClick={() => navigate("/admin/events/create-event")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Events;