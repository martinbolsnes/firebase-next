import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineChevronLeft, MdDone, MdCheckCircle } from 'react-icons/md';
import { getTask, UpdateTask } from '../firebase/TaskFirestore';
import Loading from './Loading';

function SingleTodo() {
  const router = useRouter();
  const { todoId } = router.query;
  const [todo, setTodo] = useState<any>(null);

  useEffect(() => {
    try {
      if (todoId && typeof todoId === 'string') {
        getTask(todoId).then((task) => setTodo(task));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  function MarkTaskDone() {
    try {
      if (todo) {
        UpdateTask({
          ...todo,
          updatedAt: new Date(),
          complete: true,
        }).then(() => {
          setTodo({
            ...todo,
            complete: true,
          });
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-md flex ring-1 ring-zinc-900 ring-opacity-5`}
            >
              <div className='flex-1 w-0 p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 pt-0.5 items-center'>
                    <MdCheckCircle color='#16a34a' size={18} />
                  </div>
                  <div className='ml-3 flex-1'>
                    <p className='mt-1 text-sm text-zinc-700'>
                      Task marked as done!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ));
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (todo === null) {
    return <Loading />;
  }

  return (
    <div className='h-full border py-8 px-8 md:w-1/2 md:m-auto'>
      <Link href={`/todo`}>
        <button className='flex items-center justify-center border-2 border-purple-700 border-opacity-25 py-2 px-6 rounded-md mr-4'>
          <i className='mr-2'>
            <MdOutlineChevronLeft size={18} />
          </i>
          <span className='font-display'>Go back</span>
        </button>
      </Link>
      <div className='flex flex-col mt-10'>
        <h3 className='text-2xl font-display font-semibold mb-4 max-w-full truncate'>
          {todo.title}
        </h3>
        <p className='truncate max-w-full font-sans'>{todo.description}</p>
        <p className='font-sans mt-4'>
          Due At: {new Date(todo.dueAt).toISOString()}
        </p>
        {!todo.complete && (
          <button
            className='mt-6 bg-purple-700 text-white flex items-center justify-center py-2 px-6 rounded-md'
            onClick={MarkTaskDone}
          >
            <i className='mr-2'>
              <MdDone />
            </i>
            <span className='font-display'>Mark as done</span>
          </button>
        )}
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

export default SingleTodo;
