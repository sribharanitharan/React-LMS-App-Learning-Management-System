import React from 'react';
import { useParams, Link } from 'react-router-dom';
import courses from '../data/courses';

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) return <p>Course not found</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{course.title}</h2>
      <p>{course.description}</p>
      <Link to={`/assessment/${course.id}`}>Take Assessment</Link>
    </div>
  );
}

export default CourseDetail;
