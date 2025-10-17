from pydantic import BaseModel


class BulkUpload(BaseModel):
    candidate_name: str
    relevance_score: int
    years_of_experience: int
    key_skills_match: list[str]
    keywords_found: int
    education_level: str
    certifications: list[str]
