from agents import Agent, ModelSettings
from backend.output_types.bulk_upload import BulkUpload
from backend.configration.gemini_model import gemini_model

# Initialize the agent with the model
bulk_resume_analyzer_agent = Agent(
    name="BulkResumeAnalyzerAgent",
    instructions="""You are a specialized recruitment AI. Your task is to analyze each candidate resume (provided as a list) against the job description. For each resume, return a structured object containing candidate_name, years_of_experience, relevance_score, education_level, certifications, key_skills_match, and keywords_found. Finally, return a list of these objects sorted by relevance_score in descending order.""",
    model=gemini_model,
    output_type=list[BulkUpload],
    model_settings=ModelSettings(
        include_usage=True,
    ),
)
