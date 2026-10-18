from pathlib import Path
import torch
from pydantic_settings import BaseSettings, SettingsConfigDict

# src/Services/Embedding.API dizinini baz al
_BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    """Embedding servisi konfigürasyon sınıfı (.env dosyasından okur)."""
    
    port: int = 8000
    model_id: str = "Trendyol/TY-ecomm-embed-multilingual-base-v1.2.0"
    model_dir: str = str(_BASE_DIR.parent.parent.parent / "models")
    device: str = "cuda" if torch.cuda.is_available() else "cpu"
    dtype: str = "float16" if torch.cuda.is_available() else "float32"
    max_batch: int = 64

    model_config = SettingsConfigDict(
        env_file=str(_BASE_DIR / ".env"),
        env_prefix="EMBEDDING_",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
