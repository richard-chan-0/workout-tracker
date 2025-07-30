import { useState, useEffect } from 'react';
import { openDB } from 'idb';

// Initialize IndexedDB
const initDB = async () => {
  return openDB('workoutsDB', 1, {
    upgrade(db) {
      db.createObjectStore('workouts', { keyPath: 'id', autoIncrement: true });
    },
  });
};

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('Push-ups');

  // Load workouts on startup
  useEffect(() => {
    initDB().then(async (db) => {
      setWorkouts(await db.getAll('workouts'));
    });
  }, []);

  // Save workout
  const logWorkout = async () => {
    const db = await initDB();
    await db.add('workouts', { exercise, sets: 3, reps: 12, date: new Date() });
    setWorkouts(await db.getAll('workouts'));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Workout Tracker</h1>
      <input
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        placeholder="Exercise"
      />
      <button onClick={logWorkout}>Log Workout</button>
      <ul>
        {workouts.map((w) => (
          <li key={w.id}>{w.exercise} - {w.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;