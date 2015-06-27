#include <stdio.h>
#include <unistd.h>

void print_greeting(void) {
    puts("Hello, World! (printing value within native code)");
}

char* return_greeting(void) {
    return "Hello, World! (returning value from native code)";
}

void return_named_greeting(char *buffer, char *name) {
    sprintf(buffer, "Hello, %s!", name);
}

int multiply(int a, int b) {
    return a*b;
}

char* return_delayed_greeting(void) {
	puts("before sleep");
	sleep(20);
	puts("after sleep");
	return "Hello, World! (delayed)";
}

// compile (but not link)   : cc -c greeting.c
// create library (archive) : ar -r libgreeting.a greeting.o
