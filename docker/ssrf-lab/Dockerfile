FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Create the local flag file for the file:// scheme lesson
RUN echo "CTF{SSRF_f1l3_sch3m3_r34d}" > /flag.txt
EXPOSE 80
CMD ["python", "app.py"]
