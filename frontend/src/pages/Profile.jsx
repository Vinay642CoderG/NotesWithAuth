import { useAppContext } from "../UserContext";

const Profile = () => {
  const { userData } = useAppContext();
  return (
    <div>
        <div className="d-flex justify-content-center flex-column gap-2 px-3 py-2 border border-dark shadow m-auto mt-4" style={{maxWidth: "20rem"}}>
        <h2 className="bg-primary text-white">User Profile</h2>
            <span className="fs-5"><b className="me-3">Name:</b> {userData.name}</span>
            <span className="fs-5"><b className="me-3">Email:</b> {userData.email}</span>
            <span className="fs-5"><b className="me-3">Phone Number:</b> {userData.phoneNumber}</span>
        </div>
    </div>
  );
};

export default Profile;
