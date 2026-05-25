# Use official Kali Linux base image
FROM kalilinux/kali-rolling

# Update and install common tools
RUN apt-get update --fix-missing && \
    apt-get install -y \
    net-tools \
    iputils-ping \
    curl \
    wget \
    vim \
    nmap \
    metasploit-framework \
    sqlmap \
    john \
    hydra \
    hashcat \
    ffuf \
    whatweb \
    netcat-traditional \
    dirb \
    wordlists

# Set working directory
WORKDIR /workspace

# Extract rockyou wordlist since it comes zipped by default in kali
RUN gzip -d /usr/share/wordlists/rockyou.txt.gz

# Default command
CMD ["/bin/bash"]
