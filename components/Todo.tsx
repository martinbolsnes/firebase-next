import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineChevronRight } from 'react-icons/md';
import Task from '../components/TaskInterface';

type IProps = {
  todo: Task;
  currentDate: Date;
};

function Todo({ todo, currentDate }: IProps) {
  const todoStyle =
    'border rounded-md shadow-sm py-4 px-4 mb-4 last:mb-0 flex items-center';
  const [overdue, setOverdue] = useState('');

  useEffect(() => {
    const todoDate = todo.dueAt.getTime();

    if (currentDate.getTime() >= todoDate) {
      setOverdue(' border-rose-700');
    }
  }, [currentDate, todo.dueAt]);

  return (
    <Link
      href={`/todo/detail/${todo.id}`}
      className={
        todo.complete ? `${todoStyle} bg-purple-200` : todoStyle.concat(overdue)
      }
    >
      <span className='mx-2 truncate w-11/12'>{todo.title}</span>
      <MdOutlineChevronRight size={32} />
    </Link>
  );
}

export default Todo;
