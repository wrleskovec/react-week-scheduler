import React from 'react';

function DayHeader() {
  return (
    <thead>
      <tr>
        <th />
        <th>
          <span className="long">Monday</span>
          <span className="short">Mon</span>
        </th>
        <th>
          <span className="long">Tuesday</span>
          <span className="short">Tue</span>
        </th>
        <th>
          <span className="long">Wednesday</span>
          <span className="short">Wed</span>
        </th>
        <th>
          <span className="long">Thursday</span>
          <span className="short">Thu</span>
        </th>
        <th>
          <span className="long">Friday</span>
          <span className="short">Fri</span>
        </th>
        <th>
          <span className="long">Saturday</span>
          <span className="short">Sat</span>
        </th>
        <th>
          <span className="long">Sunday</span>
          <span className="short">Sun</span>
        </th>
      </tr>
    </thead>
  );
}

export default DayHeader;
