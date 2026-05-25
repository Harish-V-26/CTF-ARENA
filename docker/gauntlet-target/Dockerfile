FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Expose all service ports:
# 80  — Web Recon target (HTTP, hidden dirs/robots.txt)
# 21  — FTP banner (Metasploit auxiliary scanner)
# 8080 — IDOR vulnerable API
# 9090 — File upload endpoint (delivers flag on successful shell upload)
EXPOSE 80 21 8080 9090
CMD ["python", "app.py"]
