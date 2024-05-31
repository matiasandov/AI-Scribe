import { useEffect, useState, useRef } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'
import { MessageTypes } from './utils/presets'

function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null) 
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [downloading, setDownloading] = useState(false)
  //if something is set we will we will return the display jsx
  const isAudioAvailable = file || audioStream

  function handleAudioReset(){
    setFile(null)
    setAudioStream(null)
  }

  //worker ref to get ML running in the background
  //web worker
  const worker = useRef(null)
  useEffect( () => {
    if(!worker.current){
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url),
        {type:'module'}
      )
    }
  
  //comunicacion entre message y webWorker
  const onMessageReceived = async (e) =>{

    switch(e.data.type){

      case 'DOWNLOADING':
        setDownloading(true)
        console.log('DOWNLOADING')
        break;

      case 'LOADING':
        setLoading(true)
        console.log('LOADING')
        break;
        
      case 'RESULT':
        //results of model
        setOutput(e.data.results)
        break;
      
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log('DONE')
          break;

    }
  }
  //agregas onMessageReceived al objeto Worker
  worker.current.addEventListener('message',
    onMessageReceived
  )

  return () => worker.current.removeEventListener('message', onMessageReceived)

  }, [])

  //read audio 
  async function readAudioFrom(file){

    const sampling_rate = 16000
    //procesa audio 
    const audioCTX = new AudioContext({sampleRate: sampling_rate  })
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodedAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  //enviar audio
  async function handleFormSubmission(){
    if(!file && !audioStream){
      return
    }

    let audio = await readAudioFrom(file ? file:
      audioStream
    )

    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }

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
