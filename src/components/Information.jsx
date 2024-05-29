import React, {useState}from 'react'

export default function Information() {
    const [tab, setTab] = useState(null)
  return (
    <div>

<main 
        className='flex-1 p-4 flex flex-col gap-3 text-center
        sm:gap-4  justify-center pb-20  max-w-prose sm:w-96 w-72 max-w-full mx-auto'
    >
        {/* max-w-full mx-auto: es util para wrappear todo junto 
            flex-1: hace flex manteniendo todo en el centro
            pb-20: centra 
            flex-col: acomoda todo lo que pongas en vertical
        
        */}
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl
            
            "> Your <span className="text-blue-400 bold"> Transcription</span>
        </h1>

        <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full 
        overflow-hidden items-center
        '>

            <button 
                onClick={
                    () => 
                        setTab('transcription')
                }

                className={
                    'px-4 duration-200 py-1 font-medium '
                    + (
                        tab === 'transcription' ?
                        'bg-blue-400 text-white'
                        : 'text-blue-400 hover:text-blue-600'

                    )
                }
            
            >Transcription</button>

<button 
                onClick={
                    () => 
                        setTab('translation')
                }

                className={
                    'px-4 duration-200 py-1 font-medium '
                    + (
                        tab === 'translation' ?
                        'bg-blue-400 text-white'
                        : 'text-blue-400 hover:text-blue-600'

                    )
                }
            
            >Translation</button>

        </div>

    </main>
    </div>
  )
}
