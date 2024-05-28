import React from 'react'

export default function FileDisplay(props) {
    const {handleAudioReset, file, audioStream} = props
  return (
    <main 
        className='flex-1 p-4 flex flex-col gap-3 text-center
        sm:gap-4  justify-center pb-20 sm:w-96 w-72 max-w-full mx-auto'
    >
        {/* max-w-full mx-auto: es util para wrappear todo junto 
            flex-1: hace flex manteniendo todo en el centro
            pb-20: centra 
            flex-col: acomoda todo lo que pongas en vertical
        
        */}
        <h1 className="font-semibold text-5xl sm:text-6xl
            md:text-7xl
            "> Your <span className="text-blue-400 bold"> File</span>
        </h1>

        <div className=' flex flex-col text-left'>
            <h3 className='font-semivold t'>
                Name
            </h3>

            {/* name es una propiedad de file no ncesitas definarla */}
            <p>{file ? file?.name : 'Custom audio'}</p>
        </div>

        <div className='flex items-center justify-between gap-4'>
            <button 
                className="text-slate-400 hover:text-blue-600 duration-200"
                //pone en null el estado de file
                onClick={handleAudioReset}
             >
                Reset
            
            </button>

            <button 
                className="specialBtn px-3 p-2 rounded-lg text-blue-400
                flex items-center gap-2 font-medium
                ">
                    <p>Transcribe</p>
                    <i className='fa-solid fa-pen-nib'></i>

            </button>


        </div>
</main>
  )
}
