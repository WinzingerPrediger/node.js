// if code is being compiled by a c-compiler
extern "C" void print_greeting(void);
extern "C" char* return_greeting(void);
extern "C" void return_named_greeting(char *, char *);
extern "C" int multiply(int, int);
extern "C" char* return_delayed_greeting(void);

// if code is being compiled by a c++-c-compiler, omit "C"