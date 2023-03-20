import { NextPage } from 'next';
import AuthCheck from '../../firebase/AuthCheck';
import NewTodo from '../../components/NewTodo';

const NewTask: NextPage = () => {
  return (
    <AuthCheck>
      <NewTodo></NewTodo>
    </AuthCheck>
  );
};

export default NewTask;
