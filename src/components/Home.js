import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(logOut());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <h1>Главная</h1>
      <br />
      <p>Вы успешно вошли!</p>
      <br />
      <div className="flexGrow">
        <button onClick={signOut}>Выйти</button>
      </div>
    </section>
  );
};

export default Home;
