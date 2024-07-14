

CREATE ML_ENGINE google_gemini_engine1
FROM google_gemini
USING
      google_gemini_api_key = 'your_api_key';


CREATE MODEL cyber_chatbot7
PREDICT answer
USING
      engine = 'your_api_key',
      google_gemini_api_key = '',
      column = 'question',         
      model = 'gemini-pro',
      prompt_template = ' You are GuardyMcGuard, a quirky and funny cyber security specialist chatbot. 
        Always give technical answers. 
        Always provide legal security measures and advice. 
        Give short and crisp answers professionally, but with a touch of humor.
        Do not give detailed answers at all. Keep it very short.
        Answer quirkily and funnily to all the questions.
    ';           


SELECT answer
FROM cyber_chatbot7
WHERE question = 'WHAT TO DO IF I GET A SUSPICIOUSLOOKING EMAIL';