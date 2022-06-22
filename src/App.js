import './App.css';
import * as tf from '@tensorflow/tfjs'
import {useState,useEffect} from 'react'

function App() {

  const [isModelLoading,setIsModelLoading]=useState(false)
  const [model,setModel]=useState(null)
  const [gender, setGender] = useState('male');


  const loadModel=async () => {
    setIsModelLoading(true)
    try {
      const model=await tf.loadLayersModel('https://raw.githubusercontent.com/Techdevweb/HeartApp/main/models/model.json')
      setModel(model)
      setIsModelLoading(false)
    } catch (error) {
      console.log(error)
      setIsModelLoading(false)
    }
  }

  useEffect(()=>{
    loadModel()
  },[])

  const handleChange = (event) => {
    setGender(event.target.value)
  }

  function Analyze(){
      var a1, a2, a3, a4, a5

      a1 = Number(document.getElementById('1').value)
      a3 = Number(document.getElementById('3').value)
      a4 = Number(document.getElementById('4').value)
      a5 = Number(document.getElementById('5').value)

      if(gender==='male'){
        a2=Number('1')
      }
      else{
        a2=Number('0')
      }

      var input = tf.tensor2d([
        [a1, a2, a3, a4, a5]
      ])
      var output = model.predict(input)
      console.log(output);
      var opData=output.dataSync()
      var ans=null
      ans=Number(opData[0])
      console.log('====================================');
      console.log(a2)
      console.log('====================================');
      if (ans>0.5) {
        document.getElementById('ans').innerHTML = "Danger"
      } else {
        document.getElementById('ans').innerHTML = "No Danger"
      }
  }

  return (
    <div className="App" styles={{ backgroundImage:`url(https://media.istockphoto.com/photos/medical-symbol-image-on-high-tech-blue-background-picture-id1141061959?k=20&m=1141061959&s=612x612&w=0&h=ETJetGRMbOuWWYtFfMAsvGVdPoNfyg9fenbP3KOBGrQ=)` }}>
    <h1>Welcome to Cardiac Disease Prediction App</h1>
    <div class='inp'>
    <input id='1' placeholder="Age"></input>

    <div>
      <input
            type="radio"
            value="male"
            checked={gender === 'male'}
            onChange={handleChange}
      /> Male
      <input
            type="radio"
            value="female"
            checked={gender === 'female'}
            onChange={handleChange}
      /> Female
    </div>
    <input id='3' placeholder="resting blood pressure(mm)"></input>
    <input id='4' placeholder='serum cholestoral(mg)'></input>
    <input id='5' placeholder='max heart rate achieved'></input>

    </div>

    <div class='btnn'>
    <button onClick={Analyze}>Make prediction</button>
    </div>
    <center><h1 id='ans'>Predictions</h1></center>
    </div>
  );
}

export default App;
