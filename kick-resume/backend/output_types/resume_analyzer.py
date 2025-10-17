from pydantic import BaseModel


class ResumeAnalyzer(BaseModel):
    ats_score: int
    overall_assessment: str
    actual_summary: str
    summary_mistakes: list[str]
    improved_summary: str
    cover_letter: str
    keywords_suggestions_score: int
    keywords_suggestions: list[str]
    formatting_suggestions_score: int
    formatting_suggestions: list[str]
    education_suggestions_score: int
    education_suggestions: list[str]
    experience_suggestions_score: int
    experience_suggestions: list[str]
