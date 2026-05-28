# Use official Kali Linux base image
FROM kalilinux/kali-rolling

# Overwrite sources.list to use stable main archive, bypassing broken regional mirrors
RUN echo "deb http://archive.kali.org/kali kali-rolling main contrib non-free non-free-firmware" > /etc/apt/sources.list

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
    wordlists \
    nano \
    python3 \
    python3-pip \
    python3-requests \
    python-is-python3

# Set working directory
WORKDIR /workspace

# Extract rockyou wordlist since it comes zipped by default in kali
RUN gzip -d /usr/share/wordlists/rockyou.txt.gz

# Default command
CMD ["/bin/bash"]
