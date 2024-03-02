import { Header } from "src/widgets/Header";
import { Hero } from "src/widgets/Hero";
import { UsersList } from "src/entities/Users";
import { SignUpForm } from "src/features/SignUp";

const App = () => {
  return (
    <>
      <Header className="container" />
      <main className="main">
        <Hero className="container hero" />
        <UsersList className="container usersList" id="users" />
        <SignUpForm className="container form" id="form" />
      </main>
    </>
  );
};

export default App;
