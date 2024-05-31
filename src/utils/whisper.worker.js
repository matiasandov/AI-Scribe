import { pipeline } from "@xenova/transformers";

//asi nos comunicaremos con la app
class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition'
    static model = 'openai/whisper-tiny.en'
    static instance = null
    static async getInstance(progress_callback = null){
        if(this.instance === null){
            this.instance = await pipeline(this.task, null){
                progress_callback
            }
        }
    }
    
}