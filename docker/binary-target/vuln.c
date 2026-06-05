#include <stdio.h>
#include <string.h>

void hidden_function() {
    char *secret = "FLAG{BIN_DISCLOSURE_MASTERY}";
}

int main(int argc, char *argv[]) {
    char buffer[32];
    if (argc > 1) {
        strcpy(buffer, argv[1]);
        printf("Echo: %s\n", buffer);
    } else {
        printf("Usage: %s <payload>\n", argv[0]);
    }
    return 0;
}
