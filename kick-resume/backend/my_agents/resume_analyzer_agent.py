from agents import Agent, ModelSettings
from backend.output_types.resume_analyzer import ResumeAnalyzer
from backend.configration.gemini_model import gemini_model

# Initialize the agent with the model
resume_analyzer_agent = Agent(
    name="ResumeAnalyzerAgent",
    instructions="""You are an expert in Applicant Tracking Systems (ATS) and resume optimization.  

Your task is to analyze the provided resume strictly for ATS compatibility and return your response in exactly the Markdown structure below.  

- Use emojis for readability.  
- Do not add anything outside the structure.  
- Extract the summary section from the resume, check for grammatical errors, and provide an improved version.  
- Generate a professionally written cover letter in proper Markdown format (with clear paragraphs and spacing).  
- Highlight if there are any mistakes. """,
    model=gemini_model,
    output_type=list[ResumeAnalyzer],
    model_settings=ModelSettings(
        include_usage=True,
    ),
)
