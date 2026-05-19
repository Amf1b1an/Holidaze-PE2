import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import VenueModal from "../components/VenueModal";

export default function CreateVenue() {
  const navigate = useNavigate();
  const isManager = localStorage.getItem("isManager") === "true";

  if (!isManager) {
    return (
      <Layout>
        <div className="text-center p-10 font-bold text-red-600">
          Access Denied. You must be an authorized Venue Manager to view this
          page.
        </div>
      </Layout>
    );
  }

  return (
    <Layout subtitle="Publish New Property Listing">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center">
        <VenueModal
          isInlinePage={true}
          onSuccess={() => {
            alert("Success! Your brand new venue listing has been added.");
            navigate("/profile");
          }}
        />
      </div>
    </Layout>
  );
}
