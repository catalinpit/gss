import { gql, useSubscription } from "@apollo/client";
import { useState } from "react";
import Note from "./Note";
import '../App.css';

const LATEST_NOTE = gql`
  subscription {
    noteCreated {
      id
      title
      content
      username
    }
  }
`;

function LatestNotes() {
  const [ allNotes, setAllNotesState ] = useState([]);

  const { data, error, loading } = useSubscription(LATEST_NOTE, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      setAllNotesState((state) => [...state, data.noteCreated])
    }
  });

  if (loading) return <div></div>

  if (error) return <div>Error occured...</div>

  return (
    <div>
      { allNotes.map((note) => (
        <Note key={note.id} note={note} />
      )) }
    </div>
  )
}

export default LatestNotes;