# Use official Kali Linux base image
FROM kalilinux/kali-rolling

# Overwrite sources.list to use stable main archive, bypassing broken regional mirrors
RUN echo "deb http://archive.kali.org/kali kali-rolling main contrib non-free non-free-firmware" > /etc/apt/sources.list

# Update and install common tools and utilities
RUN apt-get update --fix-missing && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --fix-missing \
    net-tools \
    nano \
    iputils-ping \
    curl \
    wget \
    vim \
    git \
    python3 \
    perl \
    tmux \
    screen \
    jq \
    rsync \
    socat \
    tcpdump \
    lsof \
    dnsutils \
    traceroute \
    mtr \
    cron \
    procps \
    htop \
    strace \
    ltrace \
    binutils \
    xxd \
    acl \
    p7zip-full \
    fdisk \
    parted \
    iproute2 \
    docker.io \
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
    python3-pip \
    python3-requests \
    python-is-python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy workspace setup script and execute it
COPY setup_practice.sh /tmp/setup_practice.sh
RUN chmod +x /tmp/setup_practice.sh && \
    /tmp/setup_practice.sh && \
    rm /tmp/setup_practice.sh

# Extract rockyou wordlist since it comes zipped by default in kali
RUN gzip -d /usr/share/wordlists/rockyou.txt.gz || true

# Default command
CMD ["/bin/bash"]
