#include "greeting.h"

int main() {
  greeting();
}

// compile (but not link) : cc -c hello.c
// link : cc -o hello hello.o -L. -lgreeting