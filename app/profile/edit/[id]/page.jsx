import EditForm from "@app/profile/components/EditForm";

const EditPage = async props => {
  const params = await props.params;
  return <EditForm params={params} intercept={false} />;
};

export default EditPage;
