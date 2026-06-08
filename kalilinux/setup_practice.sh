#!/bin/bash
set -e

# Create directories
mkdir -p /workspace/text_processing
mkdir -p /workspace/binary_analysis
mkdir -p /workspace/file_management/permissions
mkdir -p /workspace/file_management/archive
mkdir -p /workspace/network_practice

# ==========================================================
# 1. Text Processing Practice (grep, find, cut, awk, sed, jq)
# ==========================================================

# Roster of employees for awk/cut/grep practice
cat << 'EOF' > /workspace/text_processing/employees.txt
101,Alice Smith,Engineering,95000,Active
102,Bob Jones,Marketing,62000,Active
103,Charlie Brown,Engineering,88000,Suspended
104,Diana Prince,Security,120000,Active
105,Evan Wright,Marketing,58000,Inactive
106,Fiona Gallagher,Security,115000,Active
107,George Hotz,Security,140000,Active
108,Hannah Abbott,HR,55000,Active
109,Ian Malcolm,Engineering,98000,Inactive
110,Julia Roberts,HR,60000,Active
EOF

# Server access logs for extraction practice
cat << 'EOF' > /workspace/text_processing/access.log
192.168.1.50 - - [27/May/2026:10:05:22 +0000] "GET /index.html HTTP/1.1" 200 4522
192.168.1.62 - - [27/May/2026:10:06:14 +0000] "GET /admin/login HTTP/1.1" 403 220
192.168.1.50 - - [27/May/2026:10:07:01 +0000] "GET /assets/style.css HTTP/1.1" 200 12054
192.168.1.88 - - [27/May/2026:10:08:45 +0000] "POST /api/v1/login HTTP/1.1" 200 84
192.168.1.99 - - [27/May/2026:10:09:12 +0000] "GET /robots.txt HTTP/1.1" 200 120
192.168.1.62 - - [27/May/2026:10:10:01 +0000] "GET /admin/dashboard HTTP/1.1" 403 220
192.168.1.88 - - [27/May/2026:10:11:33 +0000] "GET /api/v1/status HTTP/1.1" 200 256
192.168.1.50 - - [27/May/2026:10:12:05 +0000] "GET /index.html HTTP/1.1" 200 4522
EOF

# Nested directory tree for find and xargs practice
mkdir -p /workspace/text_processing/src/core
mkdir -p /workspace/text_processing/src/utils
mkdir -p /workspace/text_processing/config/env

echo 'TODO: implement user validation' > /workspace/text_processing/src/core/auth.py
echo 'DEBUG: connection timeout increased' > /workspace/text_processing/src/core/db.py
echo 'TODO: implement user session logging helper' > /workspace/text_processing/src/utils/helpers.py
echo 'INFO: system healthy' > /workspace/text_processing/src/utils/logger.py
echo 'DB_HOST=prod-db-server-01.internal' > /workspace/text_processing/config/env/prod.conf
echo 'PORT=8080' > /workspace/text_processing/config/env/dev.conf

# JSON structure for jq practice
cat << 'EOF' > /workspace/text_processing/api_response.json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1337,
      "username": "linus_torvalds",
      "role": "Kernel Architect",
      "permissions": ["read", "write", "execute", "merge"],
      "meta": {
        "ssh_key_added": true,
        "api_token": "usr_s4sec_9823"
      }
    }
  }
}
EOF

# ==========================================================
# 2. Binary Analysis Practice (strings, xxd, hexdump, base64, strace, ltrace)
# ==========================================================

# Base64 encoded values
echo -n "base64_decoding_is_simple" | base64 > /workspace/binary_analysis/b64_encoded.txt

# Hexdump/xxd practice (store as a hex stream to practice xxd -r)
echo -n "xxd_binary_viewing_power" | xxd -p > /workspace/binary_analysis/hex_raw.txt

# C code to compile a binary containing strings and system calls for strace/ltrace practice
cat << 'EOF' > /workspace/binary_analysis/prog.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

void secret_function() {
    // This string will be visible using "strings" command
    const char *secret = "strings_binary_inspection_ninja";
    printf("[+] Calling secret_function...\n");
}

int main(int argc, char *argv[]) {
    // The program performs a dummy system call (open/read) and library call (strcmp)
    if (argc > 1 && strcmp(argv[1], "open_secret") == 0) {
        secret_function();
        // Traceable system call
        FILE *f = fopen("/etc/hosts", "r");
        if (f) {
            char buf[128];
            fgets(buf, sizeof(buf), f);
            fclose(f);
        }
    } else {
        printf("Usage: %s <secret_key>\n", argv[0]);
    }
    return 0;
}
EOF

# Compile program
gcc -o /workspace/binary_analysis/security_scanner /workspace/binary_analysis/prog.c
rm /workspace/binary_analysis/prog.c

# ==========================================================
# 3. File Management & Permissions (chmod, chown, ACLs, tar, gzip, 7z)
# ==========================================================

# Create files for tar / compression
echo "Compress me!" > /workspace/file_management/archive/doc1.txt
echo "Archiving is cool" > /workspace/file_management/archive/doc2.txt
tar -czf /workspace/file_management/archive/backup.tar.gz -C /workspace/file_management/archive doc1.txt doc2.txt
rm /workspace/file_management/archive/doc1.txt /workspace/file_management/archive/doc2.txt

# Create files for chmod / chown
echo "Admin only file!" > /workspace/file_management/permissions/admin_secrets.txt
chmod 600 /workspace/file_management/permissions/admin_secrets.txt

echo "Execute this script!" > /workspace/file_management/permissions/run_me.sh
chmod 644 /workspace/file_management/permissions/run_me.sh  # Needs chmod +x

# Set up users for chown and ACL practice
# (Adding a non-root user 'guest_operator' if it doesn't exist)
if ! id -u guest_operator >/dev/null 2>&1; then
    useradd -m -s /bin/bash guest_operator
fi

echo "Shared engineering notes" > /workspace/file_management/permissions/shared.log
chown guest_operator:guest_operator /workspace/file_management/permissions/shared.log

# ==========================================================
# 4. Networking Practice Setup (cron, nohup, timeout, watch)
# ==========================================================

# Setup a background loop process we can check with ps/jobs/htop/kill
cat << 'EOF' > /workspace/network_practice/daemon_loop.sh
#!/bin/bash
while true; do
    echo "Daemon heartbeat: $(date)" >> /workspace/network_practice/daemon.log
    sleep 5
done
EOF
chmod +x /workspace/network_practice/daemon_loop.sh

# Complete notification
echo "========================================="
echo "  Kali Lab Practice Files Generated!"
echo "========================================="

# ==========================================================
# 5. Malware Analysis Practice (suspicious_bin)
# ==========================================================
mkdir -p /workspace/malware_analysis

cat << 'PROG_EOF' > /workspace/malware_analysis/malware.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // Hardcoded strings for the student to find
    const char *c2_server = "http://malicious-c2-server.com/drop";
    const char *registry_key = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\Malware";
    const char *flag = "CTF{st4t1c_4n4lys1s_m4st3r}";
    
    printf("Starting system scan...\n");
    return 0;
}
PROG_EOF

gcc -o /workspace/malware_analysis/suspicious_bin /workspace/malware_analysis/malware.c
rm /workspace/malware_analysis/malware.c
