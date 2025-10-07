import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [userID, setUserID] = useState("");
  const [isReligion, setIsReligion] = useState();
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      const resp = await axios.get(
        "http://localhost/ask-me-backend/index.php?r=results"
      );
      setResults(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleVote(e) {
    if (userID.length > 9 || userID.length < 8) {
      alert("אנא הכנס תעודת זהות תקינה");
    }
    console.log(results);
  }

  return (
    <div className="app">
      <header className="card header">
        <h1>סקר חוזרים בתשובה / שאלה הגדול</h1>
        <p>
          אהלן חברים, אשמח אם תוכלו לענות על הסקר כדי לתת לנו תמונת מצב על
          חוזרים בתשובה / שאלה. הסקר אנונימי לחלוטין ופרטיכם לא יישמרו בשום
          מקום. מטרתו של סקר זה היא לתת תמונת מצב בקרב החוזרים בתשובה / שאלה
          בצורה אמיתית לאנשים שלא יכולים לענות בצינורות המקובלים
        </p>
      </header>
      <main className="card">
        <h2>איך היית מגדיר/ה את עצמך כרגע?</h2>
        <p>הכנס תעודת זהות</p>
        <input className="userId" type="number" />
        <h4>*אנחנו לא שומרים את תעודת הזהות שלך</h4>
        <h2>בחר/י תשובה אחת</h2>
        <div className="options">
          <button
            className={isReligion ? "btn selected" : "btn"}
            onClick={() => setIsReligion(false)}
          >
            חוזר/ת בשאלה
          </button>
          <button
            className={isReligion ? "btn " : "btn selected"}
            onClick={() => setIsReligion(true)}
          >
            חוזר/ת בתשובה
          </button>
        </div>
        <button className="btn-send" onClick={(e) => handleVote(e.target)}>
          שלח
        </button>
        <section className="results">
          <h3>תוצאות בזמן אמת</h3>
          <div className="bars">
            <div className="bar">
              <div className="bar-label">חוזר בשאלה</div>
              <div className="bar-track">
                <div className="bar-fill" />
              </div>
              <div className="bar-pct">{results[0]?.isReligion}</div>
            </div>
            <div className="bar">
              <div className="bar-label">חוזר בתשובה</div>
              <div className="bar-track">
                <div className="bar-fill" />
              </div>
              <div className="bar-pct">{results[0]?.notReligion}</div>
            </div>
          </div>
          <div className="totals">סך הכל הצבעות: {results[0]?.total}</div>
        </section>
        <footer className="footer">
          <p>הסקר מרכז נתונים מהלמ"ס וארגוני חזרה בתשובה / שאלה</p>
          <small>&copy; כל הזכויות שמורות לינון בר &copy;</small>
        </footer>
      </main>
    </div>
  );
}
