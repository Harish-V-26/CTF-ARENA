FROM python:3.10-alpine
RUN apk add --no-cache openssh-server && \
    ssh-keygen -A && \
    adduser -D admin && \
    echo 'admin:monkey' | chpasswd
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config
WORKDIR /app
COPY app.py .
EXPOSE 80 22 4444
CMD ["sh", "-c", "/usr/sbin/sshd && python app.py"]
