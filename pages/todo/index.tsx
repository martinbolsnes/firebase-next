import { NextPage } from 'next';
import AuthCheck from '../../firebase/AuthCheck';
import Todos from '../../components/Todos';

const IndexTodo: NextPage = () => {
  return (
    <AuthCheck>
      <Todos />
    </AuthCheck>
  );
};

export default IndexTodo;
