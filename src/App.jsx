import { useState } from 'react';
import './App.css';
import Lottie from 'lottie-react';

// Import BMI category animations
import healthyAnim from './animations/healthyAnim.json';
import underweightAnim from './animations/underweightAnim.json';
import overweightAnim from './animations/overweightAnim.json';
import obeseAnim from './animations/obeseAnim.json';

// Import loading animation
import loadingAnim from './animations/loadingAnim.json';

function App() {
  // State variables for input and output
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for animation

  // BMI calculation logic
  const calcBmi = e => {
    e.preventDefault();
    if (weight === '' || height === '' || weight <= 0 || height <= 0) {
      alert('Please Enter Valid Weight and Height');
      return;
    }

    setLoading(true); // Start loading animation

    setTimeout(() => {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const roundedBmi = bmiValue.toFixed(1);
      setBmi(roundedBmi);

      // Set message and color based on BMI category
      if (bmiValue < 18.5) {
        setMessage('You Are Underweight 🩻');
        setColor('#00BFFF');
      } else if (bmiValue < 25) {
        setMessage('You Are Healthy 💪');
        setColor('#22c55e');
      } else if (bmiValue < 30) {
        setMessage('You Are Overweight 🍔');
        setColor('#facc15');
      } else {
        setMessage('You Are Obese 🐘');
        setColor('#ef4444');
      }

      setLoading(false); // Stop loading animation
    }, 3000); // Simulate delay
  };

  // Reset all fields
  const reload = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  return (
    <>
      <div className='App'>
        {/* -------------------------------------------------- */}
        {/* 🎉 Animation outside the form */}
        {!loading && bmi && (
          <div className='result-animation'>
            <Lottie
              animationData={
                bmi < 18.5
                  ? underweightAnim
                  : bmi < 25
                  ? healthyAnim
                  : bmi < 30
                  ? overweightAnim
                  : obeseAnim
              }
              loop={true}
              style={{ width: 280, height: 400 }}
            />
          </div>
        )}
        {/* ---------------------------------------------------- */}
        <div className='container'>
          <h2>BMI Calculator</h2>

          {/* Form for input */}
          <form onSubmit={calcBmi}>
            <div>
              <label>Weight (kg)</label>
              <input
                type='number'
                min='1'
                placeholder='Enter weight in kg'
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label>Height (cm)</label>
              <input
                type='number'
                min='25'
                placeholder='Enter height in cm'
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div>
              <button className='btn' type='submit' disabled={loading}>
                Submit
              </button>
              <button
                className='btn btn-outline'
                onClick={reload}
                type='button'>
                Reload
              </button>
            </div>

            {/* Result display or loading animation */}
            <div className='center'>
              {loading ? (
                <div style={{ width: 100, height: 100 }}>
                  <Lottie
                    id='loading'
                    animationData={loadingAnim}
                    loop={true}
                    speed={2}
                  />
                </div>
              ) : (
                bmi && (
                  <>
                    <h3 style={{ color: color }}>BMI : {bmi}</h3>
                    <p style={{ color: color }}>{message}</p>
                  </>
                )
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
