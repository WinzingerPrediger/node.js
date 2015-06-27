#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <iostream.h>
#include "greeting.h"

using namespace v8;

// static Handle sayHello(const Arguments& args) {
//   greeting();
// }

Handle<Value> Method_dumpInfo(const Arguments& args) {
  std::cout << "dumping info:" << "\n";
  HandleScope scope;

  Local<Function> callee = args.Callee();
  v8::String::Utf8Value str(callee->GetName());
  cout << "name: " << *str << "\n";
  cout << "line-number: " << callee->GetScriptLineNumber() << "\n";

  return scope.Close(Undefined());
}

Handle<Value> Method_sayHello(const Arguments& args) {
  HandleScope scope;
  print_greeting();
  return scope.Close(Undefined());
}

Handle<Value> Method_returnHello(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New(return_greeting()));
}

Handle<Value> Method_returnNamedHello(const Arguments& args) {
	// http://www.samcday.com.au/blog/2011/03/03/creating-a-proper-buffer-in-a-node-c-addon/
  HandleScope scope;

  node::Buffer *buffer = node::Buffer::New(100);
  String::AsciiValue name(args[0]->ToString());
  return_named_greeting(node::Buffer::Data(buffer), *name);

  return scope.Close(String::New(node::Buffer::Data(buffer)));
}

Handle<Value> Method_multiply(const Arguments& args) {
  HandleScope scope;

  int64_t d1 = args[0]->NumberValue();
  int64_t d2 = args[1]->NumberValue();
  int64_t result = multiply(d1, d2);
  Local<Number> result_number = Number::New(result);

  return scope.Close(result_number);
}

Handle<Value> Method_callbackHello(const Arguments& args) {
  HandleScope scope;

  Local<Function> callback = Local<Function>::Cast(args[0]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = {
  	Local<Value>::New(String::New(return_greeting()))
  };
  callback->Call(Context::GetCurrent()->Global(), argc, argv);

  return scope.Close(Undefined());
}

Handle<Value> Method_delayedHello(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New(return_delayed_greeting()));
}

// async

typedef struct AsyncData {
  char buffer[100];
  Persistent<Function> callback;
} AsyncData;

void AsyncWork(uv_work_t *req) {
  AsyncData *asyncData = (AsyncData *)req->data;
  strcpy(asyncData->buffer, return_delayed_greeting());
}

void AsyncAfter(uv_work_t *req) {
  HandleScope scope;

  AsyncData *asyncData = (AsyncData *)req->data;

  const unsigned argc = 1;
  Local<Value> argv[argc] = {
  	Local<Value>::New(String::New(asyncData->buffer))
  };
  asyncData->callback->Call(Context::GetCurrent()->Global(), argc, argv);
  asyncData->callback.Dispose();

  delete asyncData;
  delete req;
}

Handle<Value> Method_asyncHello(const Arguments& args) {
  HandleScope scope;

  uv_work_t *req = new uv_work_t;
  AsyncData *asyncData = new AsyncData;
  req->data = asyncData;

  // asyncData->name = args[0]->ToString();
  asyncData->callback = Persistent<Function>::New(Local<Function>::Cast(args[0]));

  // pass the work token to libuv to be run when a
  // worker-thread is available to
  uv_queue_work(
    uv_default_loop(),
    req,                          // work token
    AsyncWork,                    // work function
    (uv_after_work_cb)AsyncAfter  // function to run when complete
  );

  return scope.Close(Undefined());
}

// exports

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("dumpInfo"),
      FunctionTemplate::New(Method_dumpInfo)->GetFunction());
  exports->Set(String::NewSymbol("sayHello"),
      FunctionTemplate::New(Method_sayHello)->GetFunction());
  exports->Set(String::NewSymbol("returnHello"),
      FunctionTemplate::New(Method_returnHello)->GetFunction());
  exports->Set(String::NewSymbol("returnNamedHello"),
      FunctionTemplate::New(Method_returnNamedHello)->GetFunction());
  exports->Set(String::NewSymbol("mul"),
      FunctionTemplate::New(Method_multiply)->GetFunction());
  exports->Set(String::NewSymbol("callbackHello"),
      FunctionTemplate::New(Method_callbackHello)->GetFunction());
  exports->Set(String::NewSymbol("delayedHello"),
      FunctionTemplate::New(Method_delayedHello)->GetFunction());
  exports->Set(String::NewSymbol("asyncHello"),
      FunctionTemplate::New(Method_asyncHello)->GetFunction());
}

NODE_MODULE(greeting, init)