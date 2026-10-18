import logging
from contextlib import asynccontextmanager
from typing import List
import torch
from fastapi import FastAPI, HTTPException, status

from app.config import settings
from app.model import engine
from app.schemas import EmbedRequest, HealthResponse, InfoResponse

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
log = logging.getLogger("embedding.api")

@asynccontextmanager
async def lifespan(_: FastAPI):
    # Uygulama başlarken modeli yükle
    engine.load()
    yield
    # Uygulama kapanırken belleği temizle
    engine.unload()

app = FastAPI(
    title="Embedding.API",
    description="E-Ticaret Arama & Öneri Sistemi İçin Vektör Üretim Servisi (TEI Uyumlu)",
    version="1.0.0",
    lifespan=lifespan,
)

@app.post(
    "/embed",
    response_model=List[List[float]],
    summary="Metinleri Vektöre Dönüştür",
    description="Tek bir metin veya liste halindeki metinleri alır; 768 boyutlu birim vektör döner.",
)
def embed(request: EmbedRequest) -> List[List[float]]:
    if not engine.is_ready:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model henüz hazır değil veya yükleniyor.",
        )

    texts = [request.inputs] if isinstance(request.inputs, str) else request.inputs
    if not texts:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="'inputs' boş olamaz.",
        )

    if len(texts) > settings.max_batch:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Tek seferde en fazla {settings.max_batch} metin gönderilebilir.",
        )

    try:
        return engine.encode(texts, normalize=request.normalize)
    except Exception as exc:
        log.error("Vektör üretim hatası: %s", exc, exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))

@app.get(
    "/health",
    response_model=HealthResponse,
    summary="Sağlık Kontrolü",
    description="Model bellekte ve çalışmaya hazırsa 200 döner.",
)
def health():
    if not engine.is_ready:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model hazır değil.",
        )
    return HealthResponse(status="ok")

@app.get(
    "/info",
    response_model=InfoResponse,
    summary="Model ve Cihaz Bilgisi",
    description="Kullanılan model, vektör boyutu ve GPU/CPU bilgilerini döner.",
)
def info():
    return InfoResponse(
        model_id=settings.model_id,
        dimension=engine.dimension,
        device=settings.device,
        dtype=settings.dtype,
        max_seq_length=engine.max_seq_length,
        max_batch=settings.max_batch,
        gpu=torch.cuda.get_device_name(0) if settings.device == "cuda" else None,
    )
