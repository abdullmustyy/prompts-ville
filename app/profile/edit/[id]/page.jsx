import EditForm from "@app/profile/components/EditForm";

const EditPage = ({ params }) => {
  return <EditForm params={params} intercept={false} />;
};

export default EditPage;
