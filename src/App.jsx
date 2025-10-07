import { useEffect, useMemo, useState } from "react";
import { readPoll, writePoll } from "./pollStorage";
import axios from "axios";
import "./App.css";

export default function App() {
  const [state, setState] = useState(() => readPoll());

  useEffect(() => {
    writePoll(state);
  }, [state]);

  const total = state.votes.sheela + state.votes.teshuva;
  const pct = useMemo(
    () => ({
      sheela: total ? Math.round((state.votes.sheela / total) * 100) : 0,
      teshuva: total ? Math.round((state.votes.teshuva / total) * 100) : 0,
    }),
    [total, state.votes]
  );

  function handleVote(choice) {
    if (state.myVote) return; // כבר הצבעת בדפדפן זה
    setState((prev) => ({
      myVote: choice,
      votes: {
        sheela: prev.votes.sheela + (choice === "sheela" ? 1 : 0),
        teshuva: prev.votes.teshuva + (choice === "teshuva" ? 1 : 0),
      },
    }));
  }

  function resetMyVote() {
    setState((prev) => ({ ...prev, myVote: null }));
  }

  return (
    <div className="app">
      <header className="card header">
        <h1>סקר חוזרים בתשובה / שאלה הגדול</h1>
        <p>איך היית מגדיר/ה את עצמך כרגע?</p>
      </header>

      <main className="card">
        <h2>בחר/י תשובה אחת</h2>
        <div className="options">
          <button
            className={`btn ${state.myVote === "sheela" ? "selected" : ""}`}
            onClick={() => handleVote("sheela")}
            aria-pressed={state.myVote === "sheela"}
          >
            חוזר/ת בשאלה
          </button>
          <button
            className={`btn ${state.myVote === "teshuva" ? "selected" : ""}`}
            onClick={() => handleVote("teshuva")}
            aria-pressed={state.myVote === "teshuva"}
          >
            חוזר/ת בתשובה
          </button>
        </div>

        {state.myVote && (
          <div className="info">
            <span>תודה! ההצבעה נשמרה בדפדפן זה.</span>
            <button className="link" onClick={resetMyVote}>
              עריכת בחירה
            </button>
          </div>
        )}
        <section className="results">
          <h3>תוצאות מקומיות (במכשיר זה)</h3>
          <div className="bars">
            <div className="bar">
              <div className="bar-label">חוזר בשאלה</div>
              <div
                className="bar-track"
                aria-label={`חוזר בשאלה ${pct.sheela}%`}
              >
                <div className="bar-fill" style={{ width: pct.sheela + "%" }} />
              </div>
              <div className="bar-pct">{pct.sheela}%</div>
            </div>

            <div className="bar">
              <div className="bar-label">חוזר בתשובה</div>
              <div
                className="bar-track"
                aria-label={`חוזר בתשובה ${pct.teshuva}%`}
              >
                <div
                  className="bar-fill"
                  style={{ width: pct.teshuva + "%" }}
                />
              </div>
              <div className="bar-pct">{pct.teshuva}%</div>
            </div>
          </div>
          <div className="totals">סך הכל הצבעות: {total}</div>
        </section>
      </main>

      <footer className="footer">
        <small>&copy; כל הזכויות שמורות לינון בר &copy;</small>
      </footer>
    </div>
  );
}
