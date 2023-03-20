import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdLogout, MdAdd, MdOutlineError } from 'react-icons/md';
import { logOut } from '../firebase/Authentication';
import { getMoreTasks, getTasks } from '../firebase/TaskFirestore';
import useOnScreen from '../hooks/UseOnScreen';
import Task from '../components/TaskInterface';
import AuthContext from '../firebase/AuthContext';
import EmptyTodo from './EmptyTodo';
import Loading from './Loading';
import Todo from './Todo';

const TAB_DONE = {
  title: 'Done',
  message:
    'You have no tasks done at this moment, you need to finish what you started.',
};

const TAB_IN_PROGRESS = {
  title: 'In Progress',
  message:
    'You have no ongoing tasks at this moment. Add one, and get started.',
};

const LIMIT_DATA_PER_REQUEST = 10;

function Todos() {
  const activeStyle =
    'relative before:border-b-4 before:absolute before:inset-0 before:h-full before:pt-7 before:border-purple-500 before:rounded-sm';
  const [tab, setTab] = useState<{ title: string; message: string }>(
    TAB_IN_PROGRESS
  );
  const [todos, setTodos] = useState<Task[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [endOfTask, setEndOfTask] = useState(false);
  const currentDate = new Date();

  //Getting User Connected from AuthContext
  const { user } = useContext(AuthContext);

  // Ref & Custom Hook
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible] = useOnScreen(ref);

  // Next Router
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getTasks(false, user.uid)
        .then((tasks) => {
          setTodos(tasks);
          setTodosLoading(false);
          if (tasks.length < LIMIT_DATA_PER_REQUEST) {
            setEndOfTask(true);
          }
        })
        .catch((error) => {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className='flex-1 w-0 p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 pt-0.5 items-center'>
                    <MdOutlineError color='#be123c' size={18} />
                  </div>
                  <div className='ml-3 flex-1'>
                    <p className='mt-1 text-sm text-zinc-700'>
                      {error.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ));
          setTodos([]);
          setTodosLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (isVisible === true && !endOfTask && todos.length > 0) {
      if (tab.title === TAB_IN_PROGRESS.title) {
        getMoreTasks(todos[todos.length - 1].id, false, user.uid).then(
          (tasks) => {
            if (tasks.length < LIMIT_DATA_PER_REQUEST) {
              setEndOfTask(true);
            }
            setTodos([...todos, ...tasks]);
          }
        );
      } else {
        getMoreTasks(todos[todos.length - 1].id, true, user.uid).then(
          (tasks) => {
            if (tasks.length < LIMIT_DATA_PER_REQUEST) {
              setEndOfTask(true);
            }
            setTodos([...todos, ...tasks]);
          }
        );
      }
    }
  }, [endOfTask, isVisible, tab.title, todos, user.uid]);

  function tasks(state = false) {
    setTodosLoading(true);
    getTasks(state, user.uid)
      .then((tasks) => {
        setTodos(tasks);
        setTodosLoading(false);
      })
      .catch((error) => {
        setTodos([]);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className='flex-1 w-0 p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 pt-0.5 items-center'>
                  <MdOutlineError color='#be123c' size={18} />
                </div>
                <div className='ml-3 flex-1'>
                  <p className='mt-1 text-sm text-zinc-700'>{error.message}</p>
                </div>
              </div>
            </div>
          </div>
        ));
      });
  }

  function changeTab(value: string) {
    setEndOfTask(false);
    if (value === 'Done') {
      tasks(true);
      setTab(TAB_DONE);
    } else {
      tasks(false);
      setTab(TAB_IN_PROGRESS);
    }
  }

  const Logout = () => {
    logOut().then(() => router.push('/'));
  };

  return (
    <div className='flex flex-col h-full md:w-1/2 md:m-auto p-4'>
      <button
        className='font-display self-end flex items-center justify-center border-2 border-purple-700 border-opacity-25 py-1 px-3 rounded-md mr-4"'
        onClick={Logout}
      >
        <span className='font-display'>Logout</span>
        <i className='ml-2'>
          <MdLogout size={18} />
        </i>
      </button>
      <p className='font-display font-normal text-4xl px-6 pt-2 flex justify-center items-center'>
        <span>Todoze</span>
      </p>
      <div className='font-display flex justify-between mt-3 mx-6 py-2 border-b cursor-pointer'>
        <p
          className={
            tab.title === TAB_IN_PROGRESS.title
              ? `mr-10 px-4 ${activeStyle}`
              : 'mr-10 px-4'
          }
          onClick={() => changeTab(TAB_IN_PROGRESS.title)}
        >
          {TAB_IN_PROGRESS.title}
        </p>
        <p
          className={
            tab.title === TAB_DONE.title ? `px-4 ${activeStyle}` : 'px-4'
          }
          onClick={() => changeTab(TAB_DONE.title)}
        >
          {TAB_DONE.title}
        </p>
      </div>
      <div className='flex flex-col h-full overflow-scroll' id='todos'>
        {todos.length > 0 && todosLoading === false && (
          <div ref={ref} className='px-6 pt-3'>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} currentDate={currentDate} />
            ))}
            <Link href='/todo/new-task'>
              <button className='bg-purple-700 text-white flex items-center justify-center py-2 px-6 rounded-md'>
                <span className='font-display'>Add new task</span>
                <i className='ml-2'>
                  <MdAdd size={18} />
                </i>
              </button>
            </Link>
          </div>
        )}
        {todos.length === 0 && todosLoading === false && (
          <EmptyTodo tab={tab} />
        )}
        {todosLoading === true && <Loading />}
      </div>
      <Toaster
        position='top-right'
        toastOptions={{
          // Define default options
          duration: 5000,
        }}
      />
    </div>
  );
}

export default Todos;
