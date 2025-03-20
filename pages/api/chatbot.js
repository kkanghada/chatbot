export default async function handler(req, res) {
    const { message } = req.query;
    
    if (!message) {
        return res.status(400).json({ reply: "메시지를 입력해 주세요." });
    }
    
    try {
        // 간단한 규칙 기반 응답 (실제 공공 API 연동 전 테스트용)
        let reply = "";
        
        // 예시: 간단한 복지 질문에 대한 응답
        if (message.includes("노인") || message.includes("어르신")) {
            reply = "노인 복지 서비스에는 기초연금, 노인 일자리 사업, 노인 장기요양보험 등이 있습니다. 더 자세한 정보는 보건복지부 홈페이지를 참고하세요.";
        } else if (message.includes("아동") || message.includes("어린이")) {
            reply = "아동 복지 서비스에는 아동수당, 드림스타트, 아동 급식 지원 등이 있습니다. 자세한 내용은 아동권리보장원에서 확인하실 수 있습니다.";
        } else if (message.includes("장애인")) {
            reply = "장애인 복지 서비스에는 장애인연금, 장애수당, 장애인 활동 지원 등이 있습니다. 국민연금공단 또는 주민센터에서 상담받으실 수 있습니다.";
        } else if (message.includes("청년")) {
            reply = "청년 지원 사업으로는 청년기본소득, 청년 주택 임대 지원, 청년 창업 지원 등이 있습니다. 자세한 내용은 내일배움카드 홈페이지에서 확인 가능합니다.";
        } else if (message.includes("실업") || message.includes("구직") || message.includes("일자리")) {
            reply = "구직자 지원 서비스에는 실업급여, 국민취업지원제도, 취업성공패키지 등이 있습니다. 고용노동부 워크넷에서 자세한 정보를 확인하세요.";
        } else {
            // 실제로는 여기서 공공 API를 호출할 수 있습니다
            // 아래 주석처리된 부분은 실제 공공 API 호출 예시입니다
            
            /*
            // 공공 API 호출 예시 (실제 구현 시 적절한 API로 교체)
            const API_KEY = process.env.PUBLIC_API_KEY; // 환경변수에서 API 키 가져오기
            const API_URL = `https://api.data.go.kr/welfare-services?query=${encodeURIComponent(message)}&apiKey=${API_KEY}`;
            
            const response = await fetch(API_URL);
            const data = await response.json();
            
            if (data && data.items && data.items.length > 0) {
                // API 응답에서 정보 추출
                reply = data.items[0].description;
            } else {
                reply = "죄송합니다. 해당 정보를 찾을 수 없습니다.";
            }
            */
            
            // API 연동 전 임시 응답
            reply = "안녕하세요! 복지 정보 챗봇입니다. 노인, 아동, 장애인, 청년, 실업 등의 키워드로 질문해 주시면 관련 복지 정보를 안내해 드립니다.";
        }
        
        // 응답 반환
        return res.status(200).json({ reply });
        
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ reply: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    }
} 