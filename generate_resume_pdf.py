"""
Generate an ATS-friendly single-page PDF resume for Devendra.

Template: single column, no tables, no graphics, Helvetica only.
All text is ASCII to avoid font-encoding artifacts in ATS text extraction.

Run: python generate_resume_pdf.py
Output: public/resume.pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

OUTPUT_PATH = "public/resume.pdf"
MARGIN = 1.2 * cm

BLACK = HexColor("#111111")
DARK = HexColor("#2b2b2b")
MID = HexColor("#555555")
LINE = HexColor("#bbbbbb")

style_name = ParagraphStyle(
    "Name", fontName="Helvetica-Bold", fontSize=16, leading=19,
    textColor=BLACK, alignment=TA_CENTER, spaceAfter=1.5 * mm,
)
style_contact = ParagraphStyle(
    "Contact", fontName="Helvetica", fontSize=8, leading=10.5,
    textColor=MID, alignment=TA_CENTER, spaceAfter=2 * mm,
)
style_section = ParagraphStyle(
    "Section", fontName="Helvetica-Bold", fontSize=9.5, leading=12,
    textColor=BLACK, spaceBefore=2.8 * mm, spaceAfter=1.2 * mm,
)
style_role = ParagraphStyle(
    "Role", fontName="Helvetica-Bold", fontSize=8.8, leading=11,
    textColor=DARK, spaceBefore=1.8 * mm, spaceAfter=0.3 * mm,
)
style_meta = ParagraphStyle(
    "Meta", fontName="Helvetica-Oblique", fontSize=7.8, leading=10,
    textColor=MID, spaceAfter=0.8 * mm,
)
style_body = ParagraphStyle(
    "Body", fontName="Helvetica", fontSize=8.2, leading=10.5,
    textColor=DARK, spaceAfter=0.5 * mm,
)
style_bullet = ParagraphStyle(
    "Bullet", fontName="Helvetica", fontSize=8, leading=10.2,
    textColor=DARK, leftIndent=5.5 * mm, bulletIndent=2 * mm,
    spaceAfter=0.6 * mm,
)


def section(text):
    return Paragraph(text.upper(), style_section)


def rule():
    return HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=1.5 * mm)


def bullet(text):
    return Paragraph(f"- {text}", style_bullet)


def build():
    doc = SimpleDocTemplate(
        OUTPUT_PATH, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=MARGIN,
        title="Devendra - Resume", author="Devendra",
    )
    s = []

    # ---------- HEADER ----------
    s.append(Paragraph("DEVENDRA", style_name))
    s.append(Paragraph(
        "Bangalore, Karnataka | +91 6361588595 | devendradevendra562@gmail.com<br/>"
        "github.com/Devendra673 | linkedin.com/in/devendra-664a02306",
        style_contact,
    ))
    s.append(rule())

    # ---------- SUMMARY ----------
    s.append(section("Summary"))
    s.append(Paragraph(
        "MCA graduate with two AI/ML internships delivering production software to clients. Built and "
        "deployed a 57-endpoint AI resume platform on AWS, and shipped a multilingual speech translation "
        "product with a three-person team. Strengths in Python, FastAPI, React/Next.js, "
        "retrieval-augmented generation, NLP and cloud deployment. Seeking Software Developer / AI-ML "
        "Engineer roles.",
        style_body,
    ))

    # ---------- SKILLS ----------
    s.append(section("Technical Skills"))
    for row in [
        "<b>Languages:</b> Python, Java, JavaScript, TypeScript, C++, SQL, HTML5, CSS3",
        "<b>Frontend:</b> React, Next.js, Tailwind CSS, Bootstrap, Chart.js, Zustand",
        "<b>Backend:</b> FastAPI, Flask, Node.js, Express.js, Django",
        "<b>Databases:</b> MySQL, PostgreSQL, MongoDB, SQLite, Oracle",
        "<b>AI/ML:</b> scikit-learn, FAISS, BM25, Sentence Transformers, Cross-Encoder Re-ranking, "
        "OpenAI Whisper, Google Gemini, NLI (DeBERTa), Random Forest, K-Means, LLM Integration "
        "(Ollama, AWS Bedrock), RAG",
        "<b>Cloud/DevOps:</b> AWS (EC2, S3, Bedrock), Docker, Git, GitHub, CI/CD, Postman, Alembic",
        "<b>Concepts:</b> REST APIs, Microservices, Agile/Scrum, OOP, DSA, JWT Auth, Server-Sent Events, "
        "Rate Limiting, Semantic Search, Vector Databases",
    ]:
        s.append(Paragraph(row, style_body))

    # ---------- EXPERIENCE ----------
    s.append(section("Professional Experience"))

    s.append(Paragraph("AI/ML Intern", style_role))
    s.append(Paragraph("DigitalTransols AI Pvt Ltd, Bengaluru | Apr 2026 - Aug 2026", style_meta))
    for b in [
        "Built and delivered ResumeIQ, an AI resume optimization platform, end to end from architecture "
        "through AWS deployment, with full source code handover",
        "Designed a FastAPI backend with 57 REST endpoints across 11 route modules covering analysis, "
        "optimization, generation, tracking, export and analytics",
        "Developed a five-layer semantic skill matcher (exact, alias, substring, embedding, ontology) "
        "using FAISS with 200+ skill alias mappings",
        "Built four scoring engines: composite fit, experience progression, BM25 keyword density and "
        "bullet presentation quality",
        "Integrated AWS Bedrock (Claude Sonnet 4.5) for STAR-format bullet rewriting, cover letters and "
        "interview preparation",
        "Reduced operating cost by keeping all scoring local via FAISS, reserving paid LLM calls for "
        "generation only, with per-token spend tracked",
        "Developed the Next.js 16 / React 19 frontend with resume builder, live ATS scoring and PDF/DOCX "
        "export across four templates",
        "Implemented JWT auth with bcrypt, per-user data isolation, rate limiting, Alembic migrations and "
        "Docker Compose deployment",
    ]:
        s.append(bullet(b))

    s.append(Paragraph("Gen AI Intern", style_role))
    s.append(Paragraph("Guruvidhya IT Services Pvt Ltd, Bengaluru | Sep 2025 - Nov 2025", style_meta))
    for b in [
        "Developed Dubify AI in a team of three: a video and audio dubbing platform supporting 22+ Indian "
        "languages, built with Python and Flask",
        "Integrated OpenAI Whisper for transcription and Google Gemini for translation and in-app chat "
        "assistance",
        "Built a gTTS and FFmpeg pipeline for dubbed audio generation with batch uploads and live "
        "microphone translation",
        "Implemented SRT subtitle export preserving source timestamps, with side-by-side review before "
        "dubbing",
        "Built user authentication, project-history dashboard (Flask-Login, SQLAlchemy) and Stripe Pro "
        "membership access control",
    ]:
        s.append(bullet(b))

    # ---------- PROJECTS ----------
    s.append(section("Projects"))

    s.append(Paragraph(
        "SecureHall-RAG (MCA Thesis) | FastAPI, Next.js, FAISS, BM25, Ollama, NLI, Docker", style_role))
    for b in [
        "Enterprise RAG system for corporate policy document Q&amp;A with hallucination mitigation and "
        "prompt injection defence",
        "Hybrid retrieval (FAISS dense + BM25 sparse) with cross-encoder re-ranking; NLI faithfulness "
        "scoring with four-tier soft redaction",
        "Prompt injection defence combining pattern library and embedding-similarity detector, raising "
        "measured block rate from 54.8% to 61.3%",
        "RAPTOR hierarchical summaries, multi-hop query decomposition, Reciprocal Rank Fusion query "
        "expansion, semantic caching and SSE streaming",
    ]:
        s.append(bullet(b))

    s.append(Paragraph(
        "IoT Air Quality Monitoring System | Python, Flask, scikit-learn, Chart.js, ESP32", style_role))
    for b in [
        "Real-time air quality monitoring streaming MQ-135 and DHT11 sensor data via ESP32",
        "Random Forest model on 15,000+ samples, 95%+ accuracy under 5-fold cross-validation, 24-hour AQI "
        "forecasting",
        "Threshold alerting via Twilio SMS/WhatsApp; synthetic data fallback keeps forecasts demonstrable "
        "without hardware",
    ]:
        s.append(bullet(b))

    # ---------- EDUCATION ----------
    s.append(section("Education"))
    s.append(Paragraph(
        "<b>Master of Computer Applications (MCA)</b> | Dr. Ambedkar Institute of Technology, Bangalore | "
        "2024 - 2026 | CGPA 8.32/10", style_body))
    s.append(Paragraph(
        "<b>Bachelor of Computer Applications (BCA)</b> | AES National Degree College, Gauribidanur | "
        "2021 - 2024 | CGPA 9.01/10", style_body))

    # ---------- ADDITIONAL ----------
    # Note: date of birth deliberately omitted. Not required by ATS or most
    # employers, and it invites age-based filtering. Add per-application only
    # if a form explicitly requires it (e.g. government or PSU roles).
    s.append(section("Additional"))
    s.append(Paragraph(
        "<b>Languages:</b> English, Hindi, Kannada", style_body))
    s.append(Paragraph(
        "<b>Interests:</b> Full Stack Development, Cloud Computing, AI/ML, Generative AI, "
        "Information Retrieval", style_body))

    doc.build(s)
    print(f"Generated: {OUTPUT_PATH}")


if __name__ == "__main__":
    build()
