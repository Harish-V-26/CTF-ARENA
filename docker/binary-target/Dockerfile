FROM python:3.9-slim
RUN apt-get update && apt-get install -y gcc gcc-multilib binutils file
WORKDIR /app
COPY app.py .
COPY vuln.c .
RUN gcc -m32 -fno-stack-protector -z execstack -o vuln vuln.c
RUN pip install flask werkzeug
RUN echo "FLAG{LOLBINS_ARE_SNEAKY}" > /app/flag.txt
EXPOSE 80
CMD ["python", "app.py"]
