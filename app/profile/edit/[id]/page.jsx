import EditForm from "@components/EditForm";

const EditPage = ({ params }) => {
  return <EditForm params={params} intercept={false} />;
};

export default EditPage;
