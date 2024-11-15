const Profile = () => {
  const username = sessionStorage.getItem("username");
  //console.log(username);
  return <p>hello {username}</p>;
};
export default Profile;
