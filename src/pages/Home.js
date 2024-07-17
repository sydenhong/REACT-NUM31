const Home = () => {
    const isHasUser = true;
    return <h1> {isHasUser ? "Have a user" :  "Don't have a user"} Home</h1>;
};
  
export default Home;