import React, { useState } from 'react'
import Attendees from "./Attendees";
import Attendee from './Attendee';

export default function Event({ attendees, events, setEvents, event }) {

  const [showAttendees, setShowAttendees] = useState(false);

  function toggleEventAttendees() {
    setShowAttendees(!showAttendees);
  }

  function updateEventAttendance(eventId, attendeeId) {
    const eventArray = [...events];
    const eventIndex = eventArray.findIndex((event) => eventId === event.id);
    const event = { ...eventArray[eventIndex] };
    const personIndex = event.people.findIndex(
      (person) => person.id === attendeeId
    );
    const peopleArray = [...event.people];
    peopleArray[personIndex].attendance = !peopleArray[personIndex].attendance;
    event.people = peopleArray;
    eventArray[eventIndex] = event;
    setEvents(eventArray);
  }


  return(
    <>
    <li key={event.id}>
    <img src={event.eventImage} alt={event.name} />
    <h5>
      {event.name} {event.eventType}
    </h5>
    <br />
    <span>Organized by: {event.organizer} </span>
    <br />
    <>
    <Attendees toggleEventAttendees={toggleEventAttendees} showAttendees={showAttendees} />
      {showAttendees ? (
        <div className="attendees">
          {attendees.map((attendee, index) => (
            <>
              <Attendee updateEventAttendance={updateEventAttendance} attendee={attendee} event={event}/>
            </>
          ))}
        </div>
      ) : null}
    </>
  </li>
</>
  )
}
