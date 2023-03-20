import { NextPage } from 'next';
import AuthCheck from '../../../firebase/AuthCheck';
import SingleTodo from '../../../components/SingleTodo';

const DetailTodo: NextPage = () => {
  return (
    <AuthCheck>
      <SingleTodo />
    </AuthCheck>
  );
};

export default DetailTodo;
