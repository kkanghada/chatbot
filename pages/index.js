import { useState, useEffect } from "react";

const Chatbot = () => {
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);

    useEffect(() => {
        // Check if Speech Recognition is supported
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            setSpeechSupported(true);
        }
    }, []);

    // 🎙️ 음성 입력 (Speech-to-Text)
    const startRecognition = () => {
        setIsListening(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "ko-KR";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserInput(transcript);
            fetchResponse(transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    // 🤖 백엔드 API 호출
    const fetchResponse = async (query) => {
        try {
            const res = await fetch(`/api/chatbot?message=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResponse(data.reply);
            speakResponse(data.reply);
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("죄송합니다, 오류가 발생했습니다.");
        }
    };

    // 🔊 음성 출력 (Text-to-Speech)
    const speakResponse = (text) => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ko-KR";
            
            // Find Korean voice if available
            const voices = synth.getVoices();
            const koreanVoice = voices.find(voice => voice.lang.includes('ko'));
            if (koreanVoice) {
                utterance.voice = koreanVoice;
            }
            
            synth.speak(utterance);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            fetchResponse(userInput);
        }
    };

    return (
        <div style={{ 
            maxWidth: "800px", 
            margin: "0 auto", 
            padding: "20px",
            fontFamily: "Arial, sans-serif"
        }}>
            <h1 style={{ textAlign: "center", color: "#4285F4" }}>🎙️ 복지 정보 챗봇</h1>
            
            <div style={{ 
                background: "#f5f5f5", 
                borderRadius: "10px", 
                padding: "20px",
                minHeight: "200px",
                marginBottom: "20px",
                border: "1px solid #ddd"
            }}>
                {response ? (
                    <div style={{ 
                        background: "#4285F4", 
                        color: "white", 
                        padding: "10px 15px", 
                        borderRadius: "10px",
                        maxWidth: "80%",
                        marginBottom: "10px"
                    }}>
                        <strong>🤖:</strong> {response}
                    </div>
                ) : (
                    <p style={{ color: "#666", textAlign: "center" }}>
                        질문을 입력하거나 음성으로 물어보세요!
                    </p>
                )}
                
                {userInput && (
                    <div style={{ 
                        background: "#e2e2e2", 
                        padding: "10px 15px", 
                        borderRadius: "10px",
                        maxWidth: "80%",
                        marginLeft: "auto",
                        textAlign: "right"
                    }}>
                        <strong>나:</strong> {userInput}
                    </div>
                )}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
                <input 
                    type="text" 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)} 
                    placeholder="질문을 입력하세요"
                    style={{ 
                        flex: 1, 
                        padding: "10px", 
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                    }}
                />
                <button 
                    type="submit"
                    style={{ 
                        padding: "10px 15px", 
                        background: "#4285F4", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    전송
                </button>
                
                {speechSupported && (
                    <button 
                        type="button"
                        onClick={startRecognition}
                        disabled={isListening}
                        style={{ 
                            padding: "10px 15px", 
                            background: isListening ? "#ff5252" : "#34A853", 
                            color: "white", 
                            border: "none", 
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        {isListening ? '듣는 중...' : '🎤 음성 입력'}
                    </button>
                )}
            </form>
        </div>
    );
};

export default Chatbot; 