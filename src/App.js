import React from "react";
import "./App.css";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  
  const [leaveDays, setLeaveDays] = useState("");
  const [leaveBalance, setLeaveBalance] = useState("");

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();
  const dropdown = [
    "Annual",
    "Maternity",
    "Paternity",
    "Family Responsiblity",
    "Sick",
  ];

  if (isLoading) {
    return <></>;
  }
  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }
  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      firstName: firstName,
      lastName: lastName,
      description: description,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      leaveDays: leaveDays,
      leaveBalance: leaveBalance,
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event created, check your Google Calendar!");
      });
  }

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {session ? (
          <>
            <h1>Leave Management System</h1>
            <hr />
            <div className="user">
              <FaUserCircle />
            </div>
            <h2>{session.user.email}</h2>
            <p>First Name</p>
            <input
              className="name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p>Last Name</p>
            <input
              className="name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            

            <p>Start of your event</p>
            <DateTimePicker onChange={setStart} value={start} />
            <p>End of your event</p>
            <DateTimePicker onChange={setEnd} value={end} />
            <p>Reason</p>
            <input
              className="reason"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p>Leave Days Taken</p>
            <input type="text" onChange={(e) => setLeaveDays(e.target.value)} />
            <p>Leave Balance</p>
            <input
              type="text"
              onChange={(e) => setLeaveBalance(e.target.value)}
            />

            <hr />
            <button className="btn" onClick={() => createCalendarEvent()}>
              Submit
            </button>
            <p></p>
            <button className="logout" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h1>Leave Management System</h1>
            <hr />
            <div className="icon">
              <button className="signIn" onClick={() => googleSignIn()}>
                <div className="icon">
                  <FcGoogle />
                </div>
                Sign In With Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
