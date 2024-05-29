import { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'


function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null) 
  const [output, setOutput] = useState(true)
  const [loading, setLoading] = useState(false)

  //if something is set we will we will return the display jsx
  const isAudioAvailable = file || audioStream

  function handleAudioReset(){
    setFile(null)
    setAudioStream(null)
  }
  //escucha si audioStream ya se termino de grabar o no
  useEffect( () => {
    console.log(audioStream)
    //aqui debes poner el estado que estara escuchando
  }, [audioStream]

  )
  return (
    //flex works to adjust when shrinking
      <div className='flex flex-col max-w-[1000px] mx-auto w-full' >
        
        <section className='min-h-screen flex flex-col'>
        <Header/>
         {

          output ? (
            <Information/>
          ): 
            loading ?(
              <Transcribing/>
          ):
            isAudioAvailable ? (
              <FileDisplay
                handleAudioReset={handleAudioReset}
                file = {file}
                audioStream = {setAudioStream}
              
              />
            ):
              (
                <HomePage
                  setFile = {setFile}
                  setAudioStream = {setAudioStream}
                
                />
              )

          
          
          }
        </section>
        <footer></footer>
      </div>
    
  )
}

export default App
