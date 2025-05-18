import React from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses';

function CourseList() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
