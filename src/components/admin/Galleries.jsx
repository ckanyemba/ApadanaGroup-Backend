import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Galleries = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <h2>Gallery</h2>
        <PrimaryButton
          onClick={() => navigate("/admin/galleries/create-gallery")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Galleries;