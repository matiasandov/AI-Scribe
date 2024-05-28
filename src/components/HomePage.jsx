import React, {useState, useEffect, useRef}from "react";

export default function HomePage(props) {
    const { setAudioStream, setFile} = props

    const [recordingStatus, setRecordingStatus] = useState("inactive")
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)
    //useRef hace referencia a objetos mutables que no van a re-renderizar el component cada vez que cambien
    //y se actualizan en tiempo real usando.current
    const mediaRecorder = useRef(null)
    const mimeType = 'audio/webm'

    async function startRecording(){
        let tempStream

        console.log("Starting recording")

        try{
            //1. accede al microfono 
            const streamData = await navigator.mediaDevices.getUserMedia(
                {
                    audio: true,
                    video: false
                }
                
            )
            tempStream = streamData

        } catch(err){
            console.log(err.message)
            return
        }

        setRecordingStatus('recording')

        //2. inicia grabacion
        //objeto para manejar el audio 
        const media = new MediaRecorder(tempStream, { type: mimeType})
        //useRef tomara las propiedades del objeto media
        mediaRecorder.current = media
        //se inicia grabacion 
        mediaRecorder.current.start()

        //3. Se almacenan pedazos de audio mientras siga habiendo data disponible
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) =>{
            if(typeof event.data === 'undefined'){return}
            if(event.data.size === 0){return}

            localAudioChunks.push(event.data)
        }

        //4. se actualiza el estado con cada chunk mientras no se llame stop 
        setAudioChunks(localAudioChunks)
    }

    async function stopRecording() {
        setRecordingStatus('inactive')
        console.log('stopRecording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () =>{
            //crear objeto blob de audio con lo que se grabo en startRecording
            const audioBlob = new Blob(audioChunks, {type:mimeType})
            //set props y esto afectara a App.jsx, renderando FileDisplay.jsx
            setAudioStream(audioBlob)
            //vaciar estado audioChunks
            setAudioChunks([])
            setDuration(0)
        }
    }

    //contador 

    useEffect( () => {
        if (recordingStatus === 'inactive'){return}

        //setInterval es una funcion que cuenta intervalos en este caso cada 1000 ms
        const interval = setInterval(() => {
            setDuration( prevState => prevState + 1)
            }, 1000)

        
        return () => clearInterval(interval)
        }
    )
    

    

    return(
        <main className='flex-1 p-4 flex flex-col gap-3 text-center
        sm:gap-4  justify-center'>
            <h1 className="font-semivold text-5xl sm:text-6xl
            md:text-7xl
            "> AI <span className="text-blue-400 bold"> Scribe</span></h1>

            <h3 className="font-medium md:text-lg"> Record 
                <span className="text-blue-400">&rarr;</span> Transcribe
                <span className="text-blue-400">&rarr;</span> Translate
            </h3>

            {/* boton 
            p: contiene texto condicional
            div
                si grabando -> p: segundos duracion
                i: si grabando se cambia color
            */}
            <button className="flex items-center text-base justify-between 
                                        gap-4 mx-auto w-72 max-w-full my-4
                                       specialBtn px-4 py-2 rounded-xl
                                        "
                    onClick={
                        //si ya esta grabando se va a stop , else empezara a grabar
                        recordingStatus === 'recording' ?
                        stopRecording : startRecording
                    }        
            >
                    <p  className="text-blue-400">
                        {
                            recordingStatus === 'inactive' ? 'Record'
                            : 'Stop Recording'
                        }
                    </p>

                    <div className="flex items-center gap-2">
                        {
                            duration !== 0 && (
                                <p className="text-sm">{duration}s</p>
                            )
                        }
                        <i 
                            className={
                                "fa-solid duration-200 fa-microphone " + 
                                (
                                    recordingStatus === 'recording' ? 'text-rose-300':""
                                )

                            }
                        ></i>
                    </div>
                    
            </button>

            <p className="text-base"> Or <label className="text-blue-400 cursor-pointer 
                hover:text-blue-600 duration-200">
                     upload
                        <input
                            onChange={
                                (e) => {
                                    const tempFile = e.target.files[0]
                                    setFile(tempFile)
                                }
                            }   
                            className="hidden" type="file" accept=".mp3, .wave"
                        ></input>
                </label> a mp3 file
            </p>
            
            <p className="italic text-slate-300">by Matías</p>

      </main>

    )
}