import { useEffect, useRef, useState } from 'react';

const useSpeechToText = (options) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Web speech API is not supported");
            return;
        }
        // console.log("options: ",options)
        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.interimResults = options.interimResults || true;
        recognition.lang = options.lang || "en-US";
        recognition.continuous = options.continuous || false; 

        if ("webkitSpeechGrammarList" in window) {
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }

        recognition.onresult = (event) => {
            let text = "";
          
            let key="stop AI";
            for (let i = 0; i < event.results.length; i++) {
                // console.log("speech: ",event.results[i][0].transcript)
                text += event.results[i][0].transcript;
             
            }
            
            // console.log("speech: ",text)
            setTranscript(text);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
            setTranscript('');
        };

        return () => {
            recognition.stop();
        };
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };
    const clearTranscript = () => {
        setTranscript('');
    };
    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        clearTranscript
    };
};

export default useSpeechToText;
