from pydantic import BaseModel
from typing import Literal, List


class Suggestion(BaseModel):
    heading: str
    content: str

class ResumeJobAnalysis(BaseModel):
    compatibility_score: int
    skills_match_percentage: int
    education_match: Literal["Matched", "Not Matched"]
    experience_match: Literal["Matched", "Not Matched"]
    missing_keywords_skills: list[str]
    suggestions: List[Suggestion]  
