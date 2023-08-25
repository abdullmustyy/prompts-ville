import Modal from "@components/Modal";
import EditForm from "@app/profile/components/EditForm";

const EditProfile = ({ params }) => {
  return (
    <Modal>
      <EditForm params={params} intercept={true} />
    </Modal>
  );
};

export default EditProfile;
