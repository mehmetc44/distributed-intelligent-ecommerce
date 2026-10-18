from typing import List, Union, Optional
from pydantic import BaseModel, Field

class EmbedRequest(BaseModel):
    """Vektör üretim istek modeli (HuggingFace TEI ile birebir uyumlu)."""
    inputs: Union[str, List[str]] = Field(
        ..., 
        description="Vektöre dönüştürülecek tek metin veya metin listesi",
        examples=[["kablosuz kulaklık", "akıllı saat"]]
    )
    normalize: bool = Field(
        default=True, 
        description="Vektörün L2 normalizasyonu yapılıp birim vektöre dönüştürülmesi"
    )
    truncate: bool = Field(
        default=True, 
        description="Maksimum token sınırını (384) aşan metinlerin otomatik kırpılması"
    )

class HealthResponse(BaseModel):
    status: str = Field(default="ok")

class InfoResponse(BaseModel):
    model_id: str
    dimension: Optional[int]
    device: str
    dtype: str
    max_seq_length: Optional[int]
    max_batch: int
    gpu: Optional[str]
