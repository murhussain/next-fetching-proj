function UserProfilePage(props) {
  const user = props.username;

  return (
    <h1>{user}</h1>
  );
} export default UserProfilePage;



export async function getServerSideProps(context) {
  return {
    props: {
      username: 'Max'
    }
  };
}